var init_data;
var errorFadeOut;

self.port.on('init', function (data) {
    init_data = data;
    $('#screenshot').attr('src', data.screenshot);
    $("#reportComment").attr('placeholder', data.strings.comment_field_placeholder);
    $("#passcodeText").attr('placeholder', data.strings.passcode_placeholder);
    $('.close').attr('title', data.strings.close_button);
    sendHeight();
});

function hideError() {
    clearTimeout(errorFadeOut);
    $(".error-message").hide();
}
self.port.on('postReportSuccess', function (data) {
    $('form').hide();
    $('#successMessage').show();
});

function showError(error) {
    $(".error-message").text(error);
    $(".error-message").fadeIn('fast');
    clearTimeout(errorFadeOut);
    errorFadeOut = setTimeout(function () {
        $(".error-message").fadeOut('fast');
    }, 5000);
}
self.port.on('postReportError', function (error) {
    $(".form-control").removeAttr("disabled");
    $('#submitButton').text(init_data.strings.send_button);
    showError(error);
});

function onSubmit(e) {
    hideError();
    if (validateForm()) {
        $(".form-control").attr("disabled", true);
        $('#submitButton').text(init_data.strings.sending);

        var payload = {
            uri: init_data.url,
            comment: $('textarea').val(),
            screenCaptureBase64png: init_data.screenshot,
            code: $("#passcodeText").val()
        };

        self.port.emit('postReport', payload);
    }
    else {
        $(".form-control").removeAttr("disabled");
    }

    e.preventDefault();
}
$(function () {
    // on document ready
    $("#passcodeText").keydown(onCodeKeyDown);

    $(".close").click(function () {
        self.port.emit('close', null);
    });

    $('#screenshot').load(sendHeight);
    $('#submitButton').click(onSubmit);
    sendHeight();
});

function sendHeight() {
    self.port.emit('heightChanged', $('.main').height());
}

function onCodeKeyDown(e) {
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
    if ($('#passcodeText').val().length == 5 || (
        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
        (e.keyCode < 96 || e.keyCode > 105))) {
        e.preventDefault();
    }
}

function validateForm() {
    var valid = true;
    var passcode = $('#passcodeText').val();
    if (passcode.length > 0 && passcode.length != 5) {
        $('#passcodeTextGroup').addClass('has-error');
        $('#passcodeLabel').hide();
        $('#passcodeValidationLabel').show();
        valid = false;
    }
    else {
        $('#passcodeTextGroup').removeClass('has-error');
        $('#passcodeLabel').show();
        $('#passcodeValidationLabel').hide();
    }

    return valid;
}