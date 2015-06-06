/**
 * Created by ShaLi on 6/6/15.
 */
'use strict';
function MyReportsCtrl($scope, backgroundPage) {
    backgroundPage.getReports().then(function (reports) {
        $scope.reports = reports;
    });
}
app.controller('MyReportsCtrl', MyReportsCtrl);