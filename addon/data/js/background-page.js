/**
 * Created by ShaLi on 5/15/15.
 */
'use strict';
function backgroundPage($window, $rootScope) {
    var latestData = {};
    var callbacks = {};

    function raiseEvent(event) {
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

    function registerEvent(eventName, callback) {
        if (latestData[eventName]) {

            if (callback) {
                callback(latestData[eventName]);
            }
        }
        callbacks[eventName] = callback;
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
}

app.service('backgroundPage', backgroundPage);
app.run(function (backgroundPage) {
    backgroundPage.registerEventListerner();
});