/**
 * Created by ShaLi on 5/27/15.
 */
'use strict';
function backgroundPageDev($q) {


    this.getScreenshot = function () {
        return $q(function (resolve) {
            resolve('http://media.al.com/live/photo/gulf-shores-website-screenshot-1c58200629ad5efb.jpg');
        });
    };

    this.getTabUrl = function () {
        return $q(function (resolve) {
            resolve('http://www.google.com');
        });
    };

    this.getReports = function () {
        return $q(function (resolve) {
            resolve([
                {
                    "reportID": "00011202",
                    "time": 1432979206051,
                    "reportCode": null,
                    imageUrl: 'http://media.al.com/live/photo/gulf-shores-website-screenshot-1c58200629ad5efb.jpg'
                },
                {
                    "reportID": "00011204",
                    "time": 1432984401413,
                    "reportCode": null,
                    imageUrl: 'http://media.al.com/live/photo/gulf-shores-website-screenshot-1c58200629ad5efb.jpg'
                },
                {
                    "reportID": "00011209",
                    "time": 1432995922648,
                    "reportCode": null,
                    imageUrl: 'http://media.al.com/live/photo/gulf-shores-website-screenshot-1c58200629ad5efb.jpg'
                }]);
        });
    };
    this.closePopup = function () {
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