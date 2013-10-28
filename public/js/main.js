$(document).ready(function() {
    $(window).scroll(function() {
        var percent = ($(window).scrollTop() + 40) / 6;
        percent = 100-Math.max(0, Math.min(100, percent));
        console.log(percent);
        var coords = 'center ' + percent + '%';
        $('.blurry').css({ backgroundPosition: coords });
    })
});