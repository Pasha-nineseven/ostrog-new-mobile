(function () {
    typeof reframe === "function" && reframe(document.querySelectorAll(".content iframe"));

    (function () {
        var embeddable = document.querySelectorAll(".embeddable");
        var youtube = [].slice.call(embeddable)
            .filter(function (you) {
                return hasClass('embeddable-youtube', you)
            });
        function registerYtScript() {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        function createPlayer(you) {
            removeClass('embeddable', you);
            new YT.Player(you, {
                height: '315',
                width: '560',
                videoId: you.dataset.embed,
                events: {
                    'onReady': function (event) {
                        reframe(event.target.a);
                    },
                }
            });
        }
        for (var i = 0; i < embeddable.length; i++) {
            if (!(hasClass('embeddable-youtube', embeddable[i]) || hasClass('embeddable-gfycat', embeddable[i]))) {
                continue;
            }
            var srcThumb = !hasClass('embeddable-gfycat', embeddable[i])
                ? "https://img.youtube.com/vi/" + embeddable[i].dataset.embed + "/sddefault.jpg"
                : 'https://thumbs.gfycat.com/' + embeddable[i].dataset.embed + '-mobile.jpg'
                ;

            var image = new Image();
            image.src = srcThumb;
            image.addEventListener("load", function () {
                embeddable[i].appendChild(image);
            }(i));
            embeddable[i].addEventListener("click", function () {
                if (!hasClass('embeddable-gfycat', this)) {
                    return false;
                }
                var iframe = document.createElement("iframe");
                var srcVideo = ('https://gfycat.com/ifr/' + this.dataset.embed);
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute("allowfullscreen", "");
                iframe.setAttribute("src", srcVideo);
                this.innerHTML = "";
                this.appendChild(iframe);
            });
        }
        if (youtube.length) {
            registerYtScript();
            window.onYouTubeIframeAPIReady = function () {
                youtube.forEach(createPlayer);
            };
        }
    })();

    // Свернуть / Развернуть блок описания игры
    var STATE_TOGGLE = false; // свернуто
    $("body").on("click", ".js-gamepage-info__toggle", function (event) {
        event.preventDefault();
        var $span = $(this).find("span");
        $(".gamepage-info__hidden").slideToggle();
        STATE_TOGGLE = !STATE_TOGGLE;
        $span.html(
            STATE_TOGGLE ? $span.data("label-hide") : $span.data("label-show")
        );
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
