/**
 * Created by ShaLi on 5/30/15.
 */
'use strict';
var reports = require("./reports");
console.log('initializing parse...');
Parse.initialize("6xsxHmWNjN2FCi5cD8cimFmfPHZMWmEt4oWzaenH", "9IgABBu5yevvcjEsRVlg2GFVbKlr31KG9f3Q3uSS");
exports.postReport = postReport;
exports.getReportStatus = getReportStatus;
function postReport(data, resolve, reject) {
    reports.canReport(function (canReport) {
        if (canReport) {
            postImage(data.screenCaptureBase64png, function (imageUrl) {
                data.screenCaptureBase64png = imageUrl;
                if (!data.code) {
                    data.code = Math.floor(Math.random() * 90000) + 10000;
                }
                $.ajax({
                    type: 'POST',
                    url: 'http://redbuttonproject.org/ReportHandler.ashx',
                    data: $.param(data),
                    processData: false,
                    success: function (response) {
                        var reportId = cleanReportId(response);
                        reports.saveReport(reportId, data.code, imageUrl, resolve);
                    },
                    error: reject
                });
            }, reject);

        }
        else {
            reject('reportLimitError');
        }
    });
}
function getReportStatus(report, resolve, reject) {
    // StatusHandler.ashx (caseID=00XX code=passcode) [date, case number, staus body, url, reason for closing]
    if (report.reportCode) {
        var data = {
            caseID: report.reportID,
            code: report.reportCode
        };
        $.ajax({
            type: 'GET',
            url: 'http://redbuttonproject.org/StatusHandler.ashx',
            data: data,
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                //TODO: fix this on the server side.
                if (error.status === 200) {
                    var response = JSON.parse(error.responseText.slice(1, error.responseText.length - 2))
                    resolve(response);
                }
                else {
                    reject(error)
                }
            }
        });
    }
    else {
        resolve(report);
    }
}


function postImage(imageData, resolve, reject) {
    //This might be relevant later on, in the meanwhile we'll keep using the base 64.
    resolve(imageData);
    //var imageBase64 = imageData.replace(/^data:image\/(png|jpeg);base64,/, "");
    //var file = new Parse.File("photo.png", {base64: imageBase64});
    //file.save().then(function () {
    //    console.log('upload completed', file);
    //    resolve(file.url());
    //}, function (error) {
    //    console.error('upload failed', error);
    //    reject(error);
    //})
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
