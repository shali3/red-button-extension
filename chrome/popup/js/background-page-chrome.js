/**
 * Created by ShaLi on 5/27/15.
 */
'use strict';
function backgroundPageChrome($rootScope, $window, $q) {
    this.getScreenshot = function () {
        return $q(function (resolve) {
            chrome.tabs.captureVisibleTab(null, {"format": "png"}, function (screenshot) {
                resolve(screenshot);
                $rootScope.$apply();

            });
        });
    };
    this.getTabUrl = function () {
        return $q(function (resolve) {
            chrome.tabs.getSelected(null, function (tab) {
                resolve(tab.url);
                $rootScope.$apply();
            });
        });
    };

    this.closePopup = function () {
        $window.close();
    };

    this.getReports = function () {
        return sendMessage('getReports');
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
                    console.error('Error in message ' + message, response.error);
                    reject(response.error);
                }
            });
        });

    }

}

app.service('backgroundPage', backgroundPageChrome);