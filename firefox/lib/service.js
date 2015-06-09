var reports = require("./reports");
var Request = require("sdk/request").Request;

exports.postReport = postReport;
exports.getReportsStatus = getReportsStatus;

function postReport(data, resolve, reject) {
    if (reports.canReport()) {
        postImage(data.screenCaptureBase64png, function (imageUrl) {
            data.screenCaptureBase64png = imageUrl;
            if (!data.code) {
                data.code = Math.floor(Math.random() * 90000) + 10000;
            }
            Request({
                url: 'http://redbuttonproject.org/ReportHandler.ashx',
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

function getReportsStatus(reports, resolve, reject) {
    // StatusHandler.ashx (caseID=00XX code=passcode) [date, case number, staus body, url, reason for closing]
    var reportsParams = reports
        .filter(function (report) {
            return report.reportID && report.reportCode;
        })
        .map(function (report) {
            return {reportID: report.reportID, reportCode: report.reportCode.toString()};
        });

    if (reportsParams.length > 0) {
        Request({
            url: 'http://redbuttonproject.org/ReportStatusHandler.ashx',
            content: JSON.stringify(reportsParams),
            contentType: 'application/json',
            onComplete: function (response) {
                if (response.status == 200 && response.json) {
                    resolve(response.json);
                }
                else if (response.status === 200) {
                    var json = JSON.parse(response.text.slice(1, response.text.length - 2));
                    resolve(json);
                }
                else {
                    var text = response.text ? response.status + ':' + response.text : response.status;
                    reject(text);
                }
            }
        }).post();
    }
    else {
        resolve([]);
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