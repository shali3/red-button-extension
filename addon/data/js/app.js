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
    .run(function ($rootScope) {
        $rootScope.text = {
            productName: 'The Red Button',
            close: 'Close',
            reportTab: 'Report',
            myReports: 'My Reports',
            heroes: 'Heroes',
            screeshotSuccess: 'The screenshot has been captured successfully',
            commentPlaceholder: 'You can add a comment to the report',
            send: 'Send'

        };
    });