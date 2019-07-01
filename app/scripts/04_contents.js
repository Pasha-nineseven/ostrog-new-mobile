(function () {
    // Оглавление
    $("body").on("click", ".contents-inner__link", function (e) {
        e.preventDefault();
        $(".contents-fonts").fadeToggle();
        $(this).toggleClass("active");
        $(".contents").toggleClass("active");
        $(".contents-inner").toggleClass("active");

        if ($(".contents-inner").hasClass("active")) {
            setTimeout(function () {
                //$('#searchMe').focus();
                $.scrollLock(true);
            }, 400);
        } else {
            $.scrollLock(false);
        }

        if ($.scrollTo && $(".scroll-active").length > 0) {
            $(".contents__unit").scrollTo($(".contents__unit .scroll-active"));
        }
        $(".page-header").removeClass("nav-up");
        $(".page-header").removeClass("nav-down");
    });

    $("body").on("click", ".js-anchors__link", function (event) {
        event.preventDefault();
        $.scrollLock(false);
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
