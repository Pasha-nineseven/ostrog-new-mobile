var autoprefixer = require('gulp-autoprefixer'),
    beautify = require('gulp-beautify'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    critical = require('critical'),
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
        .pipe(autoprefixer(['last 5 versions']))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

var scriptTask = function (src, dest, name) {
    return gulp.src(src)
        .pipe(concat(name))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
};
gulp.task('scripts', function () {
    var common = [
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/modernizr/modernizr.min.js',
        'app/libs/flexibility/flexibility.js',
        'app/libs/scrollock/jquery.scrollLock.js',
        'app/scripts/01_variables.js',
        'app/scripts/02_common.js'
    ];
    var widgets = [
        'app/libs/slick/slick.min.js',
        'app/libs/reframe.js/reframe.min.js',
        'app/scripts/03_widgets.js'
    ];
    var contents = [
        'app/libs/jquery.scrollto/jquery.scrollTo.min.js',
        'app/scripts/04_contents.js'
    ];
    var fontSizeSel = [
        'app/scripts/05_font.js'
    ];
    var pages = ['app/scripts/pages.js'];

    del.sync('app/js');
    var indexJs = scriptTask(['app/libs/reframe.js/reframe.min.js'].concat(common), 'app/js', 'index.js');
    var gamesJs = scriptTask(common, 'app/js', 'games.js');
    var gameJs = scriptTask(common.concat(widgets, contents, fontSizeSel), 'app/js', 'game.js');
    var guideJs = scriptTask(common.concat(widgets, contents, fontSizeSel), 'app/js', 'guide.js');
    var articleJs = scriptTask(common.concat(widgets, fontSizeSel), 'app/js', 'article.js');
    var pagesJs = scriptTask(pages, 'app/js', 'pages.js');
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
    del(['build/**', '!build']).then(function () {
        [
            'index',
            'games',
            'game',
            'guide',
            'article'
        ].forEach(function (name) {
            critical.generate({
                base: './',
                src: `./dist/${name}.html`,
                dest: `./build/css/${name}-inline.css`,
                minify: true,
                // inlineImages: true,
                ignore: ['@font-face', '@charset', /(-moz-|-webkit-|-ms-)/, /url\(/]
            });
        });
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
});

gulp.task('dist', ['clean', 'img', 'sass', 'css-libs', 'scripts'], function () {
    var buildCss = gulp.src([
        'app/css/style.css',
        'app/css/libs.min.css',
    ])
        .pipe(gulp.dest('dist/css'))
    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))
    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);
