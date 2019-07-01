/** Глобальные переменные и функции */
var LANG = $("html").attr("lang") ? $("html").attr("lang") : "ru";

function debounce(func, wait) {
    var debounce_timer,
        that = this;
    if (!wait) {
        wait = 300;
    }
    return function (e) {
        e.preventDefault();
        var args = arguments;
        if (debounce_timer) {
            window.clearTimeout(debounce_timer);
        }
        debounce_timer = window.setTimeout(function () {
            func.apply(that, args);
        }, wait);
    };
};

function hasClass(className, el) {
    return el.classList.contains(className);
};
function removeClass(className, el) {
    el.classList.remove(className);
}
