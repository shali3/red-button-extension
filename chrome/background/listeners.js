/**
 * Created by ShaLi on 5/29/15.
 */
'use strict';
var service = require('./service');
var reports = require('./reports');
exports.postReport = service.postReport;
exports.getReports = function (data, resolve) {
    reports.getReports(resolve);
};