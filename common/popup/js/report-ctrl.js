function ReportCtrl($scope, backgroundPage) {

    $scope.sendingReport = false;
    $scope.reportData = {};
    backgroundPage.onScreenshot(function (screenshot) {
        $scope.reportData.screenCaptureBase64png = screenshot;
    });

    backgroundPage.onTabUrl(function (url) {
        $scope.reportData.uri = url;
    });

    $scope.sendReport = function () {
        $scope.sendingReport = true;
        backgroundPage.sendReport($scope.reportData).then(function (response) {
                $scope.response = response;
            },
            function (error) {
                $scope.error = error;
            }).finally(function () {
                $scope.sendingReport = false;
            });
    };
}
app.controller('ReportCtrl', ReportCtrl);