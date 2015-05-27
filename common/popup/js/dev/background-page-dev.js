/**
 * Created by ShaLi on 5/27/15.
 */
'use strict';
function backgroundPageDev($q) {
    this.onScreenshot = function (callback) {
        callback('http://media.al.com/live/photo/gulf-shores-website-screenshot-1c58200629ad5efb.jpg');
    };
    this.onTabUrl = function (callback) {
        callback('http://www.google.com');
    };
    this.onReports = function (callback) {
        callback(null);
    };
    this.sendClose = function () {
        console.log('closeCalled');
    };
    this.sendReport = function (reportData) {
        console.log(reportData);
        return $q(function (resolve, reject) {
            if (reportData) {
                resolve('GOOD');
            }
            else {
                reject('BAD');
            }
        });
    };
}

app.service('backgroundPage', backgroundPageDev);