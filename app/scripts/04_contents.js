(function () {
    // Оглавление
    $("body").on("click", ".contents-inner__link", function (e) {
        e.preventDefault();
        $(".contents-fonts").fadeToggle();
        $(this).toggleClass("active");
        $(".contents").toggleClass("active");
        $(".contents-inner").toggleClass("active");
        $("body").toggleClass("hidden_s");
        $(".page-header").toggleClass("fixed");

        

        if ($(".contents-inner").hasClass("active")) {
            window.didScroll = false;
            $(window).scroll(function(event) {
                window.didScroll = false;
            });
            $.scrollLock(true);
            setTimeout(function () {
                //$('#searchMe').focus();
                $.scrollLock(true);
            }, 40);
        } else {
            $.scrollLock(false);
            window.didScroll = true;
            $(window).scroll(function(event) {
                window.didScroll = true;
            });
        }

        if ($.scrollTo && $(".scroll-active").length > 0) {
            $(".contents__list").scrollTo($(".contents__list .scroll-active"));
        }
        $(".page-header").removeClass("nav-up");
        $(".page-header").removeClass("nav-down");
        setTimeout(function () {
            $(".page-header").removeClass("nav-up");
            $(".page-header").removeClass("nav-down");
        }, 400);
    });

    $("body").on("click", ".js-anchors__link", function (event) {
        event.preventDefault();
        // $.scrollLock(false);
        $(".contents-inner__link").removeClass("active");
        $(".contents-inner").removeClass("active");
        $(".contents").removeClass("active");
        $("body").removeClass("fixed");
        $("html").removeClass("fixed");

        var id = $(this).attr("href"),
            top = $(id).offset().top - 37;
        $("body,html").animate({ scrollTop: top }, 100);
    });
})();
