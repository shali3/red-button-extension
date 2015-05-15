function ReportCtrl($scope) {
    $scope.data = {};

    window.addEventListener('message', function (event) {
        $scope.$apply(function () {
            $scope.data = event.data;
        });
    }, false);
}
app.controller("ReportCtrl", ReportCtrl);