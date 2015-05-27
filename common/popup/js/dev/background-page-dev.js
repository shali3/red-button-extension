/**
 * Created by ShaLi on 5/27/15.
 */
'use strict';
function backgroundPageDev() {
    this.onScreenshot = function (callback) {
        callback('http://media.al.com/live/photo/gulf-shores-website-screenshot-1c58200629ad5efb.jpg');
    };
    this.onTabUrl = function (callback) {
        callback(null);
    };
    this.onReports = function (callback) {
        callback(null);
    };
    this.sendClose = function () {
        console.log('closeCalled');
    }
}

app.service('backgroundPage', backgroundPageDev);