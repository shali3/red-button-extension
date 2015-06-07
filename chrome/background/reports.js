exports.saveReport = function (id, code, imageUrl) {
    var myReport = {
        reportID: id,
        reportCode: code,
        screenshot: imageUrl,
        time: new Date().getTime()
    };
    chrome.storage.local.get('reports', function (items) {
        var reports = items.reports;
        if (!reports)
            reports = [];

        reports.push(myReport);
        if (reports.length > 10) {
            reports = reports.slice(1);
        }

        chrome.storage.local.set({'reports': reports});
    });

    return myReport;
};

exports.canReport = function (callback) {
    chrome.storage.local.get('reports', function (items) {
        var canReport = (function () {
            var reports = items.reports;
            if (!reports)
                return true;
            var lastTime = reports[reports.length - 1].time;
            if (lastTime % 1 === 0)
                return (new Date().getTime()) - lastTime > 120000;
            else
                return true;
        })();
        callback(canReport);
    });
};

exports.getReports = function (callback) {
    chrome.storage.local.get('reports', function (items) {
        var reports = items.reports;
        if (!reports)
            reports = [];

        // Clean the code field if it's not a number
        reports.forEach(function (report) {
            if (isNaN(report.reportCode)) {
                report.reportCode = null;
            }
        });
        callback(reports.reverse());
    });
};