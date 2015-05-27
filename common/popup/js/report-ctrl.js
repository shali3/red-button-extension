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
        backgroundPage.sendReport($scope.reportData).then(function (res) {
            alert('report Success');
        },
        function(error){
            alert('report Error');
        }).finally(function () {
            $scope.sendingReport = false;
        });
    };
}
app.controller("ReportCtrl", ReportCtrl);