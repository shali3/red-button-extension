var abstraction = require("./abstraction");

exports.postReport = function (request, success, failure) {

    var code = request.code;

    $.ajax({
        type: "POST",
        url: "http://redbuttonproject.org/ReportHandler.ashx",
        //url: "http://localhost:2711/ReportHandler.ashx",
        processData: false,
        data: "uri=" + encodeURIComponent(request.url) + "&comment=" + encodeURIComponent(request.comment) + "&screenCaptureBase64png=" + encodeURIComponent(request.base64PNG) +
        "&code=" + encodeURIComponent(request.code),
        success: function (data) {
            abstraction.saveReport(data, code);
            success(data, code);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            failure(errorThrown);
        }
    });
};