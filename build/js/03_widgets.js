(function () {
    // Свернуть / Развернуть блок описания игры
    var STATE_TOGGLE = false; // свернуто
    $("body").on("click", ".js-gamepage-info__toggle", function (event) {
        event.preventDefault();
        var $span = $(this).find("span");
        $(".gamepage-info__hidden").slideToggle();
        STATE_TOGGLE = !STATE_TOGGLE;
        if (IS_LOCAL_HTML) {
            $span.text(function (i, text) {
                return text === "Развернуть" ? "Свернуть" : "Развернуть";
            });
        } else {
            $span.html(
                STATE_TOGGLE ? $span.data("label-hide") : $span.data("label-show")
            );
        }
    });

    // Слайдер
    if ($(".slider").length > 0) {
        $(".slider").each(function () {
            var $slider = $(this);

            var currentSlide;
            var slidesCount;
            var sliderCounter = $slider
                .closest(".slider-wrapper")
                .find(".pagingInfo");

            var updateSliderCounter = function (slick, currentIndex) {
                currentSlide = slick.slickCurrentSlide() + 1;
                slidesCount = slick.slideCount;
                $(sliderCounter).text(
                    [currentSlide, slidesCount].join(LANG === "ru" ? " из " : " of ")
                );
            };

            $slider.slick({
                slidesToShow: 1,
                lazyLoad: "progressive",
                dots: false,
                arrows: true,
                useTransform: true,
                equalizeHeight: false,
                accessibility: false,
                adaptiveHeight: true
            });
        });
    }
})();
