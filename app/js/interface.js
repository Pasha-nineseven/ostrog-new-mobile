$(document).ready(function() {
	flexibility(document.documentElement);
	// $("body").on("click", ".test", function(e){
	// 	e.preventDefault();
	// })


    //PAGE-SEARCH
    // $('.page-header__input').keyup(function(){
    //   var $this = $(this),
    //   val = $this.val();
    //   if(val.length >= 3){
    //     $('.page-header__result').fadeIn(20);
    //     $('body').addClass('hidden');
    //     $('.page-header__search').addClass('active');
    //   }else {
    //     $('.page-header__result').fadeOut(20);
    //     $('.page-header__search').removeClass('active');
    //   }
    // });


    // $("body").on("click", ".page-header__bg", function(){
    //     $('.page-header__result').fadeOut(20);
    //     $('body').removeClass('hidden');
    //     $('.page-header__search__input').val("");
    //     $('.page-header__search').removeClass('active');
    // });


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




    
});




$(window).resize(function () {

});


//HEADER-SCROLL
//     var didScroll;
//     var lastScrollTop = 0;
//     var delta = 5;
//     var navbarHeight = 87;

// $(window).scroll(function(event){
//     didScroll = true;
// });

// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 250);

// functions
// function hasScrolled() {
//     var st = $(this).scrollTop();

//     if(Math.abs(lastScrollTop - st) <= delta)
//         return;

//     if (st > lastScrollTop && st > navbarHeight){
//         $('header:not(.open)').removeClass('nav-down').addClass('nav-up');
//     } else {
//         if(st + $(window).height() < $(document).height()) {
//             $('header').removeClass('nav-up').addClass('nav-down');
//         }
//     }
//     lastScrollTop = st;
// }



// $(window).load(function(){

// });

// functions


// links pages
// $('body').append(
// 	'<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
// 		<a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px; z-index: 4;position: relative;" onclick="$(this).parent().hide()">Close X</a> \
// 	<style> \
// 		#pages { padding: 10px 20px 0 20px; font-size: 18px; margin-bottom:0; } \
// 		#pages a { text-decoration: none; } \
// 		#pages li { margin: 0; } \
// 	</style> \
// 	<ol id="pages"> \
//         <li><a href="index.html">Index</a></li> \
// 		<li><a href="articles.html">Статьи</a></li> \
//         <li><a href="article.html">Статья</a></li> \
//         <li><a href="about.html">About</a></li> \
//         <li><a href="games.html">Игры</a></li> \
// 	</ol> \
// </div>');
