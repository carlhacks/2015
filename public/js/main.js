var adjust_parallax = function() {
    $('.bg').each(function() {
        var img_top = $(this).offset().top,
            img_height = $(this).height(),
            window_top = $(window).scrollTop(),
            window_height = $(window).height();
        // Return if image is offscreen
        if (img_top > window_top + window_height) return;
        if (window_top > img_top + img_height) return;
        // Define offset as distance from top of window to top of image
        var offset = img_top - window_top;
        // Determine range of possible offsets
        var offset_max = Math.min(window_height, img_top + 40);
        var offset_min = -img_height;
        // Compute percent offset and use to adjust image position
        var percent_offset = 100 * (offset - offset_min) / (offset_max - offset_min);
        percent_offset = Math.max(0, Math.min(100, percent_offset));
        var coords = 'center ' + percent_offset + '%';
        $(this).css({ backgroundPosition: coords });
    });
}

$(document).ready(function() {
    adjust_parallax();
    $(window).scroll(adjust_parallax);
});