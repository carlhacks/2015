var adjust_parallax = function(event) {
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
        var bonus = parseFloat($(this).attr("data-speed"));
        var extra_percent = 100 * bonus * img_height / window_height;
        var percent_offset = (100 + extra_percent) * (offset - offset_min) / (offset_max - offset_min) - extra_percent;
        percent_offset = Math.max(-extra_percent, Math.min(100, percent_offset));
        var coords = 'center ' + percent_offset + '%';
        $(this).css({ backgroundPosition: coords });
    });
}

$(document).ready(function() {
    $.get('/count',{},function(data){
        $('#hacker-count').text(data.count);
    });
    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        adjust_parallax();
        $(window).scroll(function() {
            adjust_parallax();
        });
    }
});
