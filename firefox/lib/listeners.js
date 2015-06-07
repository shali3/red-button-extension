/**
 * Created by ShaLi on 5/30/15.
 */
'use strict';
var tabs = require("sdk/tabs");
var screenshots = require("./screenshot");
var reports = require("./reports");
var service = require("./service");


exports.openReport = function (data) {
    tabs.open({
        url: "http://redbutton.org.il/redbuttonstatus/",
        onReady: function (tab) {
            tab.attach({
                contentScriptFile: [
                    self.data.url("js/ext/jquery.min.js"),
                    self.data.url("js/content-script.js")
                ],
                contentScriptOptions: data
            });
        }
    });

};

exports.postReport = function (data, resolve, reject) {
    service.postReport(data, function (report) {
        resolve(report);
        //if (report.code) {
        //    setTimeout(function () {
        //        tabs.open({url: 'http://redbutton.org.il/casenumberintro?id=' + response + '&code=' + report.code + ''});
        //    }, 3000);
        //}
    }, reject);
};

exports.getScreenshot = function (data, resolve) {
    resolve(screenshots.captureTab());
};

exports.getTabUrl = function (data, resolve) {
    resolve(screenshots.getCurrentURI());
};

exports.getReports = function (data, resolve, reject) {
    var allReports = reports.getReports();

    var count = 0;
    allReports.forEach(function (report) {
        service.getReportStatus(report, function (res) {
            if (report !== res) {
                cleanReportStatus(res);
                report.status = res;
                console.log(res);
            }
            count++;
            if (count === allReports.length) {
                resolve(allReports);
            }
        }, reject);
    });
};

function cleanReportStatus(rs) {
    delete  rs.Body;
    delete  rs.BodyLength;
    delete  rs.CaseNumber;
    delete  rs.ContentType;
    delete  rs.Url;

}