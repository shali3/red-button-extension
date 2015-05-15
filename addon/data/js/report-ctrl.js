function ReportCtrl($scope, backgroundPage) {

    backgroundPage.onScreenshot(function (screenshot) {
        $scope.screenshot = screenshot;
    });
}
app.controller("ReportCtrl", ReportCtrl);