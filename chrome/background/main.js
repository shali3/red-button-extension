/**
 * Created by ShaLi on 5/27/15.
 */
'use strict';
var listeners = require('./listeners');
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message && listeners[request.message]) {
        var listener = listeners[request.message];


        listener(request.data, function (data) {
                sendResponse({data: data});
            },
            function (error) {
                sendResponse({error: error});
            });
    }
    else {
        sendResponse({error: request.message ? 'Message Not Found' : 'Message should be specified'});
    }

    return true;
});