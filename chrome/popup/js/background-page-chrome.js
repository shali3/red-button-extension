/**
 * Created by ShaLi on 5/27/15.
 */
'use strict';
function backgroundPageChrome($rootScope,$window) {
    this.onScreenshot = function (callback) {
        chrome.tabs.captureVisibleTab(null, {"format": "png"}, function (screenshot) {
            callback(screenshot);
            $rootScope.$apply();

        });
        callback(null);
    };
    this.onTabUrl = function (callback) {
        callback(null);
    };
    this.onReports = function (callback) {
        callback(null);
    };
    this.sendClose = function () {

        $window.close();
    }
}

app.service('backgroundPage', backgroundPageChrome);