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

localStorage.setItem("fontSizes", null);

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

var fontSizes = utils.store("fontSizes");

function getSize() {
    var keys = Object.keys(FONT_SIZE_MAP);
    var sizes = {};
    keys.forEach(function (key) {
        sizes[key] = parseInt(
            $(BASE_SELECTOR)
                .find(key)
                .css("font-size")
        );
    });
    return sizes;
}
function getNextSize(key, currSize) {
    var range = FONT_SIZE_MAP[key];
    var next = currSize;
    var index = range.indexOf(currSize);
    if (index + 1 < range.length) {
        next = range[index + 1];
    }
    return next;
}
function getPrevSize(key, currSize) {
    var range = FONT_SIZE_MAP[key];
    var prev = currSize;
    var index = range.indexOf(currSize);
    if (index - 1 >= 0) {
        prev = range[index - 1];
    }
    return prev;
}
function setRememberedSize() {
    var keys = Object.keys(FONT_SIZE_MAP);
    keys.forEach(function (key) {
        var currSize = fontSizes[key];
        $(BASE_SELECTOR)
            .find(key)
            .css("font-size", currSize);
    });
}

// FONT UP
$("body").on("click", ".contents-fonts__up", function (e) {
    e.preventDefault();
    var keys = Object.keys(FONT_SIZE_MAP);
    keys.forEach(function (key) {
        var currSize = fontSizes[key];
        var nextSize = getNextSize(key, currSize);
        $(BASE_SELECTOR)
            .find(key)
            .css("font-size", nextSize);
        fontSizes[key] = nextSize;
    });
    $(".slider").each(function () {
        var $slider = $(this);
        $slider.slick("reinit");
    });
    utils.store("fontSizes", fontSizes);
});

// FONT DOWN
$("body").on("click", ".contents-fonts__down", function (e) {
    e.preventDefault();
    var keys = Object.keys(FONT_SIZE_MAP);
    keys.forEach(function (key) {
        var currSize = fontSizes[key];
        var prevSize = getPrevSize(key, currSize);
        $(BASE_SELECTOR)
            .find(key)
            .css("font-size", prevSize);
        fontSizes[key] = prevSize;
    });
    $(".slider").each(function () {
        var $slider = $(this);
        $slider.slick("reinit");
    });
    utils.store("fontSizes", fontSizes);
});
