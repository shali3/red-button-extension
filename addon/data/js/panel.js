var screen_img;

self.port.on('init', function (data) {
    screen_img = data.screenshot;
    $('#screenshot').attr('src', screen_img);
    $("#reportComment").attr('placeholder', data.commentPlaceholder);
});

$(function () {
    // on document ready

});