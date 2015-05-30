var reports = require("./reports");
var Request = require("sdk/request").Request;

exports.postReport = postReport;
function postReport(data, resolve, reject) {
    if (reports.canReport()) {
        Request({
            url: "http://redbuttonproject.org/ReportHandler.ashx",
            content: data,
            onComplete: function (response) {
                console.log('Got Response ' + response.status + ' text: ' + response.text);
                if (response.status == 200) {
                    var reportId = cleanReportId(response.text);
                    var myReport = reports.saveReport(reportId, data.code);
                    resolve(myReport);
                }
                else {
                    var text = response.text ? response.status + ':' + response.text : response.status;
                    reject(text);
                }
            }
        }).post();
    } else {
        reject('reportLimitError');
    }
}


/**
 * Cleans the rundundant " signs in the response
 * @param {string} reportId
 * @return {string}
 */
function cleanReportId(reportId) {
    if (reportId[0] == '"' && reportId[reportId.length - 1] == '"') {
        reportId = reportId.slice(1, reportId.length - 1);
    }
    return reportId;
}