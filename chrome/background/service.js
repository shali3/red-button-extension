/**
 * Created by ShaLi on 5/30/15.
 */
'use strict';
var reports = require("./reports");
exports.postReport = postReport;

function postReport(data, resolve, reject) {
    reports.canReport(function (canReport) {
        if (canReport) {
            $.ajax({
                type: "POST",
                url: "http://redbuttonproject.org/ReportHandler.ashx",
                data: $.param(data),
                processData: false,
                success: function (response) {
                    var reportId = cleanReportId(response);
                    var myReport = reports.saveReport(reportId, data.code);
                    resolve(myReport);
                },
                error: reject
            });
        }
        else {
            reject('reportLimitError');
        }
    });
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
