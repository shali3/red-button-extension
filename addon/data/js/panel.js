var screen_img;
function sendHeight() {
    self.port.emit('heightChanged', $('.main').height());
}


self.port.on('init', function (data) {
    screen_img = data.screenshot;
    $('#screenshot').attr('src', screen_img);
    $("#reportComment").attr('placeholder', data.commentPlaceholder);
    $("#passcodeText").attr('placeholder', data.passcodePlaceholder);
    $('.close').attr('title', data.closeText);
    sendHeight();
});

$(function () {
    // on document ready
    $("#passcodeText").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ($("#passcodeText").val().length == 5 || (
            (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
            (e.keyCode < 96 || e.keyCode > 105))) {
            e.preventDefault();
        }
    });

    $(".close").click(function (e) {
        self.port.emit('close', null);
    });

    $('#screenshot').load(sendHeight);

    sendHeight();

});