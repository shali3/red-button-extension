var reports = require("./reports");
var Request = require("sdk/request").Request;
var _ = require("sdk/l10n").get;

exports.postReport = function (data, success, failure) {
    if (reports.canReport()) {
        Request({
            url: "http://redbuttonproject.org/ReportHandler.ashx",
            content: data,
            onComplete: function (response) {
                console.log('Got Response ' + response.status + ' text: ' + response.text);
                if (response.status == 200) {
                    var reportId = response.text;
                    //trim redundant "
                    if (reportId[0] == '"' && reportId[reportId.length - 1] == '"') {
                        reportId = reportId.slice(1, reportId.length - 1);
                    }
                    reports.saveReport(reportId, data.code);
                    success(reportId, data.code);
                }
                else {
                    var text = response.text ? response.status + ':' + response.text : response.status;
                    failure(text);
                }
            }
        }).post();
    } else {
        failure('reportLimitError');
    }
};