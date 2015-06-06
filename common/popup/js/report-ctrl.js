function ReportCtrl($scope,$state, backgroundPage) {

    $scope.sendingReport = false;
    $scope.reportData = {};
    backgroundPage.getScreenshot().then(function (screenshot) {
        $scope.reportData.screenCaptureBase64png = screenshot;
    });

    backgroundPage.getTabUrl().then(function (url) {
        $scope.reportData.uri = url;
    });

    $scope.sendReport = function () {
        $scope.sendingReport = true;
        backgroundPage.sendReport($scope.reportData).then(function (response) {
                //$scope.response = response;
                $state.go('myReports');
            },
            function (error) {
                $scope.error = error;
            }).finally(function () {
                $scope.sendingReport = false;
            });
    };
}
app.controller('ReportCtrl', ReportCtrl);