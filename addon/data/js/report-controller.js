(function () {
    angular.module('app').
        controller("reportController", function ($scope) {
            $scope.data = {};

            window.addEventListener('message', function (event) {
                $scope.$apply(function () {
                    $scope.data = event.data;
                });
            }, false);
        });
})();
