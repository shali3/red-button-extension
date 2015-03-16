var abstraction = require("./abstraction");
var Request = require("sdk/request").Request;
var _ = require("sdk/l10n").get;

exports.postReport = function (data, success, failure) {
    if (abstraction.canReport()) {
        Request({
            url: "http://redbuttonproject.org/ReportHandler.ashx",
            //url: data.comment.length > 0 ? "http://localhost:8000/test1" : "http://localhost:8000/test2",
            content: data,
            onComplete: function (response) {
                console.log('Got Response ' + response.status + ' text: ' + response.text);
                if (response.status == 200) {
                    abstraction.saveReport(response.text, data.code);
                    success(response.text, data.code);
                }
                else {
                    failure(response.status);
                }
            }
        }).post();
    } else {
        failure(_("report_limit_error"));
    }
};