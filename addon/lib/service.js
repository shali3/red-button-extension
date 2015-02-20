var abstraction = require("./abstraction");
var Request = require("request").Request;

exports.postReport = function (data, success, failure) {
    Request({
        url: "http://redbuttonproject.org/ReportHandler.ashx",
        //url: data.comment.length > 0 ? "http://localhost:8000/test1" : "http://localhost:8000/test2",
        content: data,
        onComplete: function (response) {
            if (response.status == 200) {
                abstraction.saveReport(response.text, data.code);
                success(response.text, data.code);
            }
            else {
                failure(response.status);
            }
        }
    }).post();
};