/**
 * Created by ShaLi on 5/29/15.
 */
'use strict';
var service = require('./service');
var reports = require('./reports');
exports.postReport = service.postReport;
exports.getReports = function (data, resolve, reject) {
    reports.getReports(function (reports) {
        var count = 0;
        reports.forEach(function (report) {
            service.getReportStatus(report, function (res) {
                if (report !== res) {
                    cleanReportStatus(res);
                    report.status = res;
                    console.log(res);
                }
                count++;
                if (count === reports.length) {
                    resolve(reports);
                }
            }, reject);
        });
    });
};

function cleanReportStatus(rs) {
    delete  rs.Body;
    delete  rs.BodyLength;
    delete  rs.CaseNumber;
    delete  rs.ContentType;
    delete  rs.Url;

}