var autoprefixer = require('gulp-autoprefixer'),
    beautify = require('gulp-beautify'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    pngquant = require('imagemin-pngquant'),
    pug = require('gulp-pug'),
    purgecss = require('gulp-purgecss'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglifyjs');

gulp.task('pug', function () {
    return gulp.src('app/templates/**/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('app'));
});

gulp.task('beautify-html', ['pug'], function () {
    return gulp.src('app/*.html')
        .pipe(beautify.html({ indent_size: 4 }))
        .pipe(gulp.dest('app'));
});

gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/modernizr/modernizr.min.js',
        'app/libs/flexibility/flexibility.js',
        'app/libs/slick/slick.min.js',
        'app/libs/scrollock/jquery.scrollLock.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app',
        },
        notify: false
    })
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progrssive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'))
});

gulp.task('watch', ['browser-sync', 'sass', 'css-libs', 'scripts', 'pug', 'beautify-html'], function () {
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/templates/**/*.{pug,html}', ['pug']);
    gulp.watch('app/*.html', ['beautify-html', browserSync.reload]);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function () {
    del.sync('build');
    var buildCss = gulp
        .src('dist/css/*.css')
        .pipe(
            purgecss({
                content: ['dist/*.html']
            })
        )
        .pipe(cssnano())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/css'));
    var buildCssDefer = gulp
        .src('dist/css/*.css')
        .pipe(cssnano())
        .pipe(concat('style-defer.min.css'))
        .pipe(gulp.dest('build/css'));
    var buildJs = gulp.src('dist/js/**/*')
        .pipe(gulp.dest('build/js'))
    var copyImg = gulp
        .src('dist/img/**/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('dist', ['clean', 'img', 'sass', 'css-libs', 'scripts'], function () {
    var buildCss = gulp.src([
        'app/css/style.css',
        'app/css/libs.min.css',
        'app/css/override.css'
    ])
        .pipe(gulp.dest('dist/css'))
    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))
    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);
