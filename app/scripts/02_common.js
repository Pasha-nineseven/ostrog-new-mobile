(function () {
    flexibility(document.documentElement);

    typeof reframe === "function" && reframe(document.querySelectorAll("iframe"));

    $('p:empty').remove();

    // Боковое меню
    $("body").on("click", ".menu-btn", function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $('.page-header').toggleClass("active");
        $(".menu").fadeToggle(100);
        $(".contents").fadeToggle(0);
        $("body").toggleClass("hidden");

        window.didScroll = false;


        if ($(this).hasClass("active")) {
            $.scrollLock(true);
            setTimeout(function () {
                $.scrollLock(true);
                $(".page-header").removeClass("nav-up");
                $(".page-header").removeClass("nav-down");
            }, 400);
        } else {
            $.scrollLock(false);
        }
    });

    $("body").on("click", ".contents-fonts__toggle", function (e) {
        e.preventDefault();

        $(".contents-fonts__list").slideToggle(100);
    });


    // Переключатель языка в хэдере
    $("body").on("click", ".page-header-lang__view", function (e) {
        //if (!$(e.target).hasClass("page-header-lang__item")) {
            e.preventDefault();
            $(this).toggleClass('active');
        //}
        $(".page-header-lang__list").slideToggle(100);
    });
    // $(document).click(function (e) {
    //     var div = $(".page-header-lang");
    //     if (!div.is(e.target) && div.has(e.target).length === 0) {
    //         $(".page-header-lang__list").fadeOut(100);
    //     }
    // });

    // Переключатель языка в футере
    $("body").on("click", ".page-footer-lang__view", function (e) {
        if (!$(e.target).hasClass("page-header-lang__item")) {
            e.preventDefault();
        }
        $('.page-footer-lang').toggleClass('active');
        $(".page-footer-lang__list").fadeToggle(100);
    });
    $(document).click(function (e) {
        var div = $(".page-footer-lang");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $(".page-footer-lang__list").fadeOut(100);
            $('.page-footer-lang').removeClass('active');
        }
    });

    // Показать поле поиска
    $(document).on("click", ".page-header:not(.open) #searchMe", function () {
        $(".header-search__button").click();
        $("#searchMe").val("");
    });

    // Фокус в поле поиска
    $("body").on("click", ".header-search__button", function (e) {
        e.preventDefault();
        $(".page-header-search").toggleClass("open");
        $(".page-header").toggleClass("open");
        $(".page-search").toggleClass("open");
        $("body").toggleClass("hidden-scroll");
        $("#searchMe").focus();
    });

    // Результаты поиска
    $(".page-search__input").keyup(function () {
        var $this = $(this),
            val = $this.val();
        if (val.length >= 3) {
            $(".page-header__result").fadeIn(20);
            $("body").addClass("hidden");
            $(".page-header__search").addClass("active");
        } else {
            $(".page-header__result").fadeOut(20);
            $(".page-header__search").removeClass("active");
        }
    });

    // Спрятать поле поиска
    $("body").on("click", ".open .header-search__button", function () {
        $(".page-header__result").fadeOut(20);
        $("body").removeClass("hidden");
        $(".page-search__input").val("");
        $(".page-search__input").blur();
        $(".page-header__search").removeClass("active");
    });

    // Закрываем сообщение, что на сайте используются куки
    $("body").on("click",".cookies .cookies__close, .cookies .btn", function (event) {
        event.preventDefault();
        var $self = $(this);
        if ($self.hasClass('btn')) {
            $.post($self.attr('href'));
            localStorage.setItem('cookie_accepted', true);
        }
        $('.page-header').removeClass('page-header--cookie');
        $('.cookies').remove();
    });

    // Скролл
    window.didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = 87;

    $(window).scroll(function(event) {
        window.didScroll = true;
    });

    setInterval(function() {
        if (window.didScroll) {
            hasScrolled();
            window.didScroll = false;
        }
    }, 250);

    function hasScrolled() {

        var st = $(this).scrollTop();

        if (Math.abs(lastScrollTop - st) <= delta) return;

        if (st > lastScrollTop && st > navbarHeight) {
            $("header:not(.open)")
            .removeClass("nav-down")
            .addClass("nav-up");
        } else {
            if (st + $(window).height() < $(document).height()) {
            $("header")
                .removeClass("nav-up")
                .addClass("nav-down");
            }
        }
        lastScrollTop = st;
    }
})();
