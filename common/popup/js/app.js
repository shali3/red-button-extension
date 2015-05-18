var app = angular.module('app', ['ui.bootstrap', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/report');

        $stateProvider
            .state('report', {
                url: '/report',
                templateUrl: 'views/report.html',
                controller: 'ReportCtrl'
            })
            .state('myReports', {
                url: '/my-reports',
                templateUrl: 'views/my-reports.html'
            })
            .state('heroes', {
                url: '/heroes',
                templateUrl: 'views/heroes.html'
            });
    })
    .run(function ($rootScope, $http) {
        $rootScope.text = {};
        $http.get('locales/he.json').success(function (data) {
            $rootScope.text = data;
        }).error(function (error) {
            $rootScope.text = {productName: error};
        });
    });