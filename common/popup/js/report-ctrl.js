function ReportCtrl($scope, $state, backgroundPage, ngAudio) {

    $scope.sendingReport = false;
    $scope.reportData = {};
    backgroundPage.getScreenshot().then(function (screenshot) {
        $scope.reportData.screenCaptureBase64png = screenshot;
        ngAudio.play('sound/camera.mp3');
    });

    backgroundPage.getTabUrl().then(function (url) {
        $scope.reportData.uri = url;
    });

    $scope.sendReport = function () {
        ga('send', 'event', 'sendReport', 'clicked');
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