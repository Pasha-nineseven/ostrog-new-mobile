$(document).ready(function() {
	flexibility(document.documentElement);
    //TOP-MENU
	$('body').on('click','.menu-btn', function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $('.menu').fadeToggle();
        $('body').toggleClass('hidden');
    });

    //TOP-SEARCH
    $("body").on("click", ".header-search__button", function(e){
        e.preventDefault();
        $('.page-header-search').toggleClass('open');
        $('.page-search').toggleClass('open');
        $('body').toggleClass('hidden-scroll');
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

    
});




$(window).resize(function () {

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



// $(window).load(function(){

// });

// functions


// links pages
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
	</ol> \
</div>');
