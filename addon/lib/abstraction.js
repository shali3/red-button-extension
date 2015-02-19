var ss = require("sdk/simple-storage");
exports.saveReport = function (id, code) {
    var reports = ss.storage.reports;
    if (!reports)
        reports = [];

    var myReport = {
        reportID: id,
        reportCode: code
    };
    reports.push(myReport);
    if (reports.length > 10) {
        reports = reports.slice(1);
    }
    ss.storage.reports = reports;
};