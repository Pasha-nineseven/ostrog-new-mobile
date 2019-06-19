(function () {
    var BASE_SELECTOR = ".page-content";
    var FONT_SIZE_MAP = {
        ".h1-article-title": [20, 23, 27, 32],
        ".material-top__title, .list-game__title": [18, 20, 24, 28],
        ".text-section-title, .text-section-title p": [13, 16, 18, 21],
        "p, li, td, th, .gamepage-info__toggle": [13, 16, 18, 21],
        h2: [18, 20, 24, 28],
        "h3, .game-title__txt": [16, 18, 21, 25],
        ".image-caption, .slider__txt, .game-top-date, .game-top-platform, .gamepage-block__title, .gamepage-block__subtitle, .gamepage-block__date, .gamepage-block__info-min, .game-date, .gamepage-block__tag": [
            11,
            13,
            16,
            18
        ]
    };
    var currSize = 1; // 0..3

    function cb(inc) {
        return debounce(function () {
            currSize += inc;
            if (currSize < 0) {
                currSize = 0;
                return;
            }
            if (currSize > 3) {
                currSize = 3;
                return;
            }
            Object.keys(FONT_SIZE_MAP).forEach(function (key) {
                var nextSize = FONT_SIZE_MAP[key][currSize];
                $(BASE_SELECTOR)
                    .find(key)
                    .css("font-size", nextSize);
            });
            $(".slider").each(function () {
                $(this).slick("reinit");
            });
        });
    }

    $(document).on("click", ".contents-fonts__up", cb(1));
    $(document).on("click", ".contents-fonts__down", cb(-1));
})();
