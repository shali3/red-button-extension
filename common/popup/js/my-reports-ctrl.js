/**
 * Created by ShaLi on 6/6/15.
 */
'use strict';
function MyReportsCtrl($scope, backgroundPage) {
    $scope.openedItem = 0;
    $scope.loading = true;
    backgroundPage.getReports().then(function (reports) {
        $scope.reports = reports;

    }, function (error) {
        $scope.error = error;
    }).finally(function () {
        $scope.loading = false;

    });
}
app.controller('MyReportsCtrl', MyReportsCtrl);