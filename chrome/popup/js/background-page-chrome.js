/**
 * Created by ShaLi on 5/27/15.
 */
'use strict';
function backgroundPageChrome($rootScope, $window, $q) {
    this.onScreenshot = function (callback) {
        chrome.tabs.captureVisibleTab(null, {"format": "png"}, function (screenshot) {
            callback(screenshot);
            $rootScope.$apply();

        });
    };
    this.onTabUrl = function (callback) {
        chrome.tabs.getSelected(null, function (tab) {
            callback(tab.url);
        });
    };
    this.onReports = function (callback) {
        callback(null);
    };
    this.sendClose = function () {

        $window.close();
    };
    this.sendReport = function (reportData) {
        return sendMessage('postReport', reportData);
    };

    function sendMessage(message, data) {
        return $q(function (resolve, reject) {
            chrome.runtime.sendMessage({message: message, data: data}, function (response) {
                if (response.data) {
                    resolve(response.data);
                }
                else {
                    reject(response.error);
                }
            });
        });

    }

}

app.service('backgroundPage', backgroundPageChrome);