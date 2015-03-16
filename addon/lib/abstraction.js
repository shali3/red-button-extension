var ss = require("sdk/simple-storage");
exports.saveReport = function (id, code) {
    var reports = ss.storage.reports;
    if (!reports)
        reports = [];

    var myReport = {
        reportID: id,
        reportCode: code,
        time: new Date().getTime()
    };
    reports.push(myReport);
    if (reports.length > 10) {
        reports = reports.slice(1);
    }
    ss.storage.reports = reports;
};

exports.canReport = function () {
    var reports = ss.storage.reports;
    if (!reports)
        return true;
    var lastTime = reports[reports.length - 1].time;
    if (lastTime % 1 === 0)
        return (new Date().getTime()) - lastTime > 120000;
    else
        return true;
};