/**
 * Created by ShaLi on 5/27/15.
 */
'use strict';
var listeners = {};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var listener = listeners.notFound;
    if (request.message && listeners[request.message]) {
        listener = listeners[request.message];
    }

    listener(request.data, function (data) {
            sendResponse({data: data});
        },
        function (error) {
            sendResponse({error: error});
        })
});

listeners.notFound = function (data, resolve, reject) {
    reject('Message Not Found');
};

listeners.postReport = function (data, resolve, reject) {
    $.ajax({
        type: "POST",
        url: "http://redbuttonproject.org/ReportHandler.ashx",
        data: $.param(data),
        processData: false,
        success: resolve,
        error: reject
    });
};