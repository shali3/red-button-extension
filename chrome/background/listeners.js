/**
 * Created by ShaLi on 5/29/15.
 */
'use strict';
exports.postReport = function (data, resolve, reject) {
    $.ajax({
        type: "POST",
        url: "http://redbuttonproject.org/ReportHandler.ashx",
        data: $.param(data),
        processData: false,
        success: resolve,
        error: reject
    });
};