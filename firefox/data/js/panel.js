var init_data;
var errorFadeOut;
var report;

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
self.port.on('postReportSuccess', function (ignored) {
    $('form').hide();
    $('#successMessage').show();
    if (report.code) {
        $('#redirectMessage').show();
    }
});

function showError(error) {
    var $error = $(".error-message");
    $error.text(error);
    $error.fadeIn('fast');
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

        report = {
            uri: init_data.url,
            comment: $('textarea').val(),
            screenCaptureBase64png: init_data.screenshot,
            code: $("#passcodeText").val()
        };

        self.port.emit('postReport', report);
    }
    else {
        $(".form-control").removeAttr("disabled");
    }

    e.preventDefault();
}

function onViewReport(e) {
    var report;
    //find the report in the reports array
    for (var i = 0, len = init_data.reports.length; i < len; i++) {
        if (init_data.reports[i].reportID === e.target.text) {
            report = init_data.reports[i];
            break;
        }
    }

    //send it to background page.
    self.port.emit('viewReport', report);
    e.preventDefault();
}

function renderOldReports() {
    if (init_data.reports && init_data.reports.length > 0) {
        var template = "{{#reports}}<tr><td><a href='#' class='viewReport'>{{reportID}}</a></td><td>{{reportCode}}{{^reportCode}}{{strings.no_report_code}}{{/reportCode}}</td></tr>{{/reports}}";
        Mustache.parse(template);   // optional, speeds up future uses
        var rendered = Mustache.render(template, init_data);
        $('#placeholder').html(rendered);

        //register the report links
        $('.viewReport').click(onViewReport);
    }
    else {
        $('#noReports').show();
        $('table').hide();
    }
}

function onSwitchToViewReports() {
    renderOldReports();
    $('#viewReportsButton').hide();
    $('#reportButton').show();
    $('.report-tab').hide();
    $('.old-reports-tab').show();
}
function onSwitchToReport() {
    $('#viewReportsButton').show();
    $('#reportButton').hide();
    $('.report-tab').show();
    $('.old-reports-tab').hide();
}
$(function () {
    // on document ready
    $("#passcodeText").keydown(onCodeKeyDown);

    $(".close").click(function () {
        self.port.emit('close', null);
    });

    $('#screenshot').load(sendHeight);
    $('#submitButton').click(onSubmit);
    $('#viewReportsButton').click(onSwitchToViewReports);
    $('#reportButton').click(onSwitchToReport);
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