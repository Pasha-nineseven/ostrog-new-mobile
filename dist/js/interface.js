var IS_LOCAL_HTML = /.*\.html$/.test(window.location.href);

$(document).ready(function() {
    var LANG = $('html').attr('lang') ? $('html').attr('lang') : 'ru';

    flexibility(document.documentElement);

    //TOP-MENU
	$('body').on('click','.menu-btn', function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $('.menu').fadeToggle();
        $('.contents').fadeToggle(0);
        $('body').toggleClass('hidden');
    });

    //TOP-SEARCH
    $("body").on("click", ".header-search__button", function(e){
        e.preventDefault();
        $('.page-header-search').toggleClass('open');
        $('.page-search').toggleClass('open');
        $('body').toggleClass('hidden-scroll');
        setTimeout(function () {
            $('#searchMe').focus();
        }, 100);
    });

    //PAGE-SEARCH
    $('.page-search__input').keyup(function(){
      var $this = $(this),
      val = $this.val();
      if(val.length >= 3){
        $('.page-header__result').fadeIn(20);
        $('body').addClass('hidden');
        $('.page-header__search').addClass('active');
      }else {
        $('.page-header__result').fadeOut(20);
        $('.page-header__search').removeClass('active');
      }
    });

    $("body").on("click", ".open .header-search__button", function(){
        $('.page-header__result').fadeOut(20);
        $('body').removeClass('hidden');
        $('.page-search__input').val("");
        $('.page-header__search').removeClass('active');
    })

    //VIDEO
    $("body").on("click", ".video__play", function(e){
        $(this).hide();

        $(this).prev('.video__poster').hide();

        //$('#video')[0].src += "&autoplay=1";

        var videoURL = $('#video').prop('src');
        videoURL += "&autoplay=1";
        $('#video').prop('src',videoURL);

        e.preventDefault();
    });

	//LANGUAGE
	$("body").on("click", ".page-header-lang", function(e){
        if (!$(e.target).hasClass('page-header-lang__item')) {
          e.preventDefault();
        }
        $('.page-header-lang__list').fadeToggle(100);
	});
    $(document).click(function (e){
        var div = $(".page-header-lang");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
          $(".page-header-lang__list").fadeOut(100);
        }
    });

    //FOOTER-LANGUAGE
    $("body").on("click", ".page-footer-lang__view", function(e){
        if (!$(e.target).hasClass('page-header-lang__item')) {
          e.preventDefault();
        }
        $('.page-footer-lang__list').fadeToggle(100);
    });
    $(document).click(function (e){
        var div = $(".page-footer-lang");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
          $(".page-footer-lang__list").fadeOut(100);
        }
    });

    //CONTENTS
    $("body").on("click", ".contents-inner__link", function(e){
        e.preventDefault();
        $('.contents-fonts').fadeToggle();
        $(this).toggleClass('active');
        $('.contents').toggleClass('active');
        $('.contents-inner').toggleClass('active');
        $('body').toggleClass('fixed');
        if ($.scrollTo && $('.scroll-active').length>0) {
            $('.contents__unit').scrollTo($('.contents__unit .scroll-active'));
        }
    });

    $("body").on("click",".js-anchors__link", function (event) {
        event.preventDefault();

        $('.contents-inner__link').removeClass('active');
        $('.contents-inner').removeClass('active');
        $('.contents').removeClass('active');
        $('body').removeClass('fixed');


        var id  = $(this).attr('href'),
            top = $(id).offset().top - 37;
        $('body,html').animate({scrollTop: top}, 100);
    });

    var STATE_TOGGLE = false; // свернуто
    $("body").on("click",".js-gamepage-info__toggle", function (event) {
        event.preventDefault();
        var $span = $(this).find('span');
        $('.gamepage-info__hidden').slideToggle();
        STATE_TOGGLE = !STATE_TOGGLE;
        if (IS_LOCAL_HTML) {
            $span.text(function(i, text){
                return text === "Развернуть" ? "Свернуть" : "Развернуть";
            })
        } else {
            $span.html(STATE_TOGGLE ? $span.data('label-hide') : $span.data('label-show'));
        }
    });

    //MAIN SLIDER
    if ($('.slider').length>0) {
        $('.slider').each(function() {
            var $slider = $(this);

            var currentSlide;
            var slidesCount;
            var sliderCounter = $slider.closest('.slider-wrapper').find('.pagingInfo');

            var updateSliderCounter = function(slick, currentIndex) {
                currentSlide = slick.slickCurrentSlide() + 1;
                slidesCount = slick.slideCount;
                $(sliderCounter).text([currentSlide, slidesCount].join(LANG === 'ru' ? ' из ' : ' of '));
            };

            $slider.on('init', function(event, slick) {
                updateSliderCounter(slick);
            });

            $slider.on('afterChange', function(event, slick, currentSlide) {
                updateSliderCounter(slick, currentSlide);
            });

            $slider.slick({
                slidesToShow: 1,
                fade: true,
                lazyLoad: 'progressive',
                dots:false,
                arrows: true,
                useTransform:true,
                equalizeHeight: false,
                "accessibility": false,
                adaptiveHeight: true,
                speed:10,
            });
        });
    }

});

//HEADER-SCROLL
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 87;

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

//functions
function hasScrolled() {
    var st = $(this).scrollTop();

    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > navbarHeight){
        $('header:not(.open)').removeClass('nav-down').addClass('nav-up');
    } else {
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}

$(function () {
    var BASE_SELECTOR = '.page-content';

    var FONT_SIZE_MAP = {
        '.h1-article-title': [20, 23, 27, 32],
        '.material-top__title, .list-game__title': [ 18, 20, 24, 28 ],
        '.text-section-title, .text-section-title p': [ 13, 15, 18, 21 ],
        'p, li, td, th': [ 13, 15, 18, 21 ],
        'h2':[ 18, 20, 24, 28 ],
        'h3, .game-title__txt': [ 16, 18, 21, 25 ],
        '.image-caption, .slider__txt, .game-top-date, .game-top-platform, .gamepage-block__title, .gamepage-block__subtitle, .gamepage-block__date, .gamepage-block__info-min, .game-date, .gamepage-block__tag': [ 11, 13, 15, 18 ],
    };

    localStorage.setItem('fontSizes', null);

    var utils = {
        store: function (namespace, data) {
            if (arguments.length > 1) {
                return localStorage.setItem(namespace, JSON.stringify(data));
            } else {
                var store = localStorage.getItem(namespace);
                return (store && JSON.parse(store)) || getSize();
            }
        }
    };

    var fontSizes = utils.store('fontSizes');

    function getSize() {
        var keys = Object.keys(FONT_SIZE_MAP);
        var sizes = {};
        keys.forEach(function(key) {
            sizes[key] = parseInt($(BASE_SELECTOR).find(key).css( "font-size" ));
        });
        return sizes;
    }
    function getNextSize(key, currSize) {
        var range = FONT_SIZE_MAP[key];
        var next = currSize;
        var index = range.indexOf(currSize);
        if ( index + 1 < range.length ) {
            next = range[index + 1];
        }
        return next;
    }
    function getPrevSize(key, currSize) {
        var range = FONT_SIZE_MAP[key];
        var prev = currSize;
        var index = range.indexOf(currSize);
        if ( index - 1 >= 0 ) {
            prev = range[index - 1];
        }
        return prev;
    }
    function setRememberedSize() {
        var keys = Object.keys(FONT_SIZE_MAP);
        keys.forEach(function(key) {
            var currSize = fontSizes[key];
            $(BASE_SELECTOR).find(key).css("font-size", currSize);
        });
    }

    //FONT UP
    $('body').on('click','.contents-fonts__up', function(e){
        e.preventDefault();
        var keys = Object.keys(FONT_SIZE_MAP);
        keys.forEach(function(key) {
            var currSize = fontSizes[key];
            var nextSize = getNextSize(key, currSize);
            $(BASE_SELECTOR).find(key).css("font-size", nextSize);
            fontSizes[key] = nextSize;
        });
        $('.slider').each(function() {
            var $slider = $(this);
            $slider.slick('reinit');
        });
        utils.store('fontSizes', fontSizes);
    });

    //FONT DOWN
    $('body').on('click','.contents-fonts__down', function(e){
        e.preventDefault();
        var keys = Object.keys(FONT_SIZE_MAP);
        keys.forEach(function(key) {
            var currSize = fontSizes[key];
            var prevSize = getPrevSize(key, currSize);
            $(BASE_SELECTOR).find(key).css("font-size", prevSize);
            fontSizes[key] = prevSize;
        });
        $('.slider').each(function() {
            var $slider = $(this);
            $slider.slick('reinit');
        });
        utils.store('fontSizes', fontSizes);
    });
});

// links pages
if (IS_LOCAL_HTML) {
    $('body').append(
        '<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
            <a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px; z-index: 4;position: relative;" onclick="$(this).parent().hide()">Close X</a> \
        <style> \
            #pages { padding: 10px 20px 0 20px; font-size: 18px; margin-bottom:0; } \
            #pages a { text-decoration: none; } \
            #pages li { margin: 0; } \
        </style> \
        <ol id="pages"> \
            <li><a href="index.html">Index</a></li> \
            <li><a href="about.html">About</a></li> \
            <li><a href="articles.html">Articles</a></li> \
            <li><a href="article.html">Article</a></li> \
            <li><a href="games.html">Games</a></li> \
            <li><a href="game.html">Game</a></li> \
        </ol> \
    </div>');
}
