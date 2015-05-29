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
                var reportId = response.text;
                //trim redundant "
                if (reportId[0] == '"' && reportId[reportId.length - 1] == '"') {
                    reportId = reportId.slice(1, reportId.length - 1);
                }

                console.log('Got Response ' + response.status + ' text: ' + reportId);
                if (response.status == 200) {
                    abstraction.saveReport(reportId, data.code);
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