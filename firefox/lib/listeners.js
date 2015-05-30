/**
 * Created by ShaLi on 5/30/15.
 */
'use strict';
var tabs = require("sdk/tabs");
var screenshots = require("./screenshot");
var reports = require("./reports");


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
        if (report.code) {
            setTimeout(function () {
                tabs.open({url: 'http://redbutton.org.il/casenumberintro?id=' + response + '&code=' + report.code + ''});
            }, 3000);
        }
    }, reject);
};

exports.getScreenshot = function (data, resolve) {
    resolve(screenshots.captureTab());
};

exports.getTabUrl = function (data, resolve) {
    resolve(screenshots.getCurrentURI());
};

exports.getReports = function (data, resolve) {
    resolve(reports.getReports());
};

