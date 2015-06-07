var reports = require("./reports");
var Request = require("sdk/request").Request;

exports.postReport = postReport;
exports.getReportStatus = getReportStatus;

function postReport(data, resolve, reject) {
    if (reports.canReport()) {
        postImage(data.screenCaptureBase64png, function (imageUrl) {
            data.screenCaptureBase64png = imageUrl;
            if (!data.code) {
                data.code = Math.floor(Math.random() * 90000) + 10000;
            }
            Request({
                url: "http://redbuttonproject.org/ReportHandler.ashx",
                content: data,
                onComplete: function (response) {
                    if (response.status == 200) {
                        var reportId = cleanReportId(response.text);
                        var myReport = reports.saveReport(reportId, data.code, imageUrl);
                        resolve(myReport);
                    }
                    else {
                        var text = response.text ? response.status + ':' + response.text : response.status;
                        reject(text);
                    }
                }
            }).post();
        }, reject);

    } else {
        reject('reportLimitError');
    }
}

function getReportStatus(report, resolve, reject) {
    // StatusHandler.ashx (caseID=00XX code=passcode) [date, case number, staus body, url, reason for closing]
    if (report.reportCode) {
        var data = {
            caseID: report.reportID,
            code: report.reportCode
        };
        Request({
            url: 'http://redbuttonproject.org/StatusHandler.ashx',
            content: data,
            onComplete: function (response) {
                if (response.status == 200) {
                    var status = JSON.parse(response.text.slice(1, response.text.length - 2))
                    resolve(status);
                }
                else {
                    var text = response.text ? response.status + ':' + response.text : response.status;
                    reject(text);
                }
            }
        }).get();
    }
    else {
        resolve(report);
    }
}

function postImage(imageData, resolve, reject) {
    resolve(imageData);
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