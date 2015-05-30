/**
 * Created by ShaLi on 5/15/15.
 */
'use strict';
function backgroundPageFirefox($window, $rootScope, $q) {
    var defers = {},
        loaded = false,
        pendingRequests = [];

    $window.addEventListener('message', onResponse);


    this.getScreenshot = function () {
        return sendMessage('getScreenshot');
    };

    this.getTabUrl = function () {
        return sendMessage('getTabUrl');
    };

    this.getReports = function () {
        return sendMessage('getReports');
    };

    this.closePopup = function () {
        sendMessage('close');
    };
    this.sendReport = function (reportData) {
        return sendMessage('postReport', reportData);
    };


    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function sendMessage(messageName, data) {
        var deferred = $q.defer();
        var id = guid();
        defers[id] = deferred;
        var message = {from: 'app', id: id, message: messageName, data: data};
        if (loaded) {
            $window.postMessage(message, $window.location.origin);
        }
        else {
            pendingRequests.push(message);
        }

        return deferred.promise;
    }

    function onResponse(event) {
        var data = event.data;
        if (data && data.from === 'script') {
            if (loaded) {
                var response = data.response;
                var deferred = defers[response.id];
                if (response.error) {
                    deferred.reject(response.error)
                }
                else {
                    deferred.resolve(response.data);
                }
                $rootScope.$apply();
                delete defers[id];
            }
            else {
                loaded = true;
                flushPendingRequest();
            }
        }
    }

    function flushPendingRequest() {
        angular.forEach(pendingRequests, function (message) {
            $window.postMessage(message, $window.location.origin);
        });
        pendingRequests = null;
    }
}

app.service('backgroundPage', backgroundPageFirefox);