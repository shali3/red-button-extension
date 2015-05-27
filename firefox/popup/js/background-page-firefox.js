/**
 * Created by ShaLi on 5/15/15.
 */
'use strict';
function backgroundPageFirefox($window, $rootScope, $q) {
    var latestData = {},
        callbacks = {},
        sendReportDefer;

    function raiseEvent(event) {
        if (event.data && event.data.from === 'script') {
            var message = event.data.message;
            var data = event.data.data;
            latestData[message] = data;
            if (callbacks[message]) {
                if (callbacks[message]) {
                    callbacks[message](data);
                    $rootScope.$apply();
                }
            }
        }
    }


    function registerEventOnce(eventName, callback) {
        callbacks[eventName] = function (data) {
            delete callbacks[eventName];
            callback(data);
        }
    }

    function registerEvent(eventName, callback) {
        if (latestData[eventName]) {

            if (callback) {
                callback(latestData[eventName]);
            }
        }
        callbacks[eventName] = callback;
    }

    function sendMessage(messageName, data) {
        $window.postMessage({from: 'app', message: messageName, data: data}, $window.location.origin);
    }

    this.registerEventListerner = function () {
        $window.addEventListener('message', raiseEvent);
    };

    this.onScreenshot = function (callback) {
        registerEvent('screenshot', callback);
    };
    this.onTabUrl = function (callback) {
        registerEvent('tabUrl', callback);
    };
    this.onReports = function (callback) {
        registerEvent('reports', callback);
    };
    this.sendClose = function () {
        sendMessage('close');
    };
    this.sendReport = function (reportData) {
        if (sendReportDefer) return $q(function (resolve, reject) {
            reject('Another report is in progress');
        });
        sendReportDefer = $q.defer();
        sendReportDefer.promise.finally(function () {
            sendReportDefer = null;
        });
        registerEventOnce('postReportSuccess', sendReportDefer.resolve);
        registerEventOnce('postReportError', sendReportDefer.reject);

        sendMessage('postReport',reportData);
        return sendReportDefer.promise;
    }
}

app.service('backgroundPage', backgroundPageFirefox);
app.run(function (backgroundPage) {
    backgroundPage.registerEventListerner();
});