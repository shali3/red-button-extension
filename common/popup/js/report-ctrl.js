function ReportCtrl($scope, $rootScope, backgroundPage, ngAudio) {

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
        Parse.Analytics.track('sendReport', {withMessage: $scope.reportData.comment ? true : false});
        $scope.sendingReport = true;
        backgroundPage.sendReport($scope.reportData).then(function (response) {
                $scope.response = response;
                $rootScope.successModal = true;
            },
            function (error) {
                $rootScope.generalError = error;
            }).finally(function () {
                $scope.sendingReport = false;
            });
    };
}
app.controller('ReportCtrl', ReportCtrl);