/**
 * Created by ShaLi on 5/29/15.
 */
'use strict';
var service = require('./service');
var reports = require('./reports');
exports.postReport = service.postReport;
exports.getReports = function (data, resolve, reject) {
    reports.getReports(function (reports) {
        service.getReportsStatus(reports, function (response) {
            if (Array.isArray(response)) {
                response.forEach(function (status) {
                    reports.forEach(function (report) {
                        if (report.reportID === status.CaseNumber) {
                            cleanReportStatus(status);
                            report.status = status;
                        }
                    });
                });
                resolve(reports);
            }
            else{
                reject(response);
            }
        }, reject);
    });
};

function cleanReportStatus(rs) {
    delete  rs.Body;
    delete  rs.BodyLength;
    delete  rs.CaseNumber;
    delete  rs.ContentType;

}