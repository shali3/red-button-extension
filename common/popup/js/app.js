var app = angular.module('app', ['ui.bootstrap', 'ui.router', 'ngAudio'])
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
                templateUrl: 'views/my-reports.html',
                controller: 'MyReportsCtrl'
            })
            .state('heroes', {
                url: '/heroes',
                templateUrl: 'views/heroes.html'
            });
    })
    .run(function ($rootScope, $http) {
        $rootScope.text = {};
        $rootScope.locale = 'he';
        function fetchLocale(locale) {
            $http.get('locales/' + locale + '.json').success(function (data) {
                $rootScope.text = data;
            }).error(function (error) {
                $rootScope.text = {productName: error};
            });
        }

        fetchLocale($rootScope.locale);
        $rootScope.$watch('locale', fetchLocale);
    })
    .run(function ($rootScope, $location) {
        Parse.initialize("6xsxHmWNjN2FCi5cD8cimFmfPHZMWmEt4oWzaenH", "9IgABBu5yevvcjEsRVlg2GFVbKlr31KG9f3Q3uSS");

        $rootScope.$on('$stateChangeSuccess', function () {
            Parse.Analytics.track('view', {path: $location.path()});
        });
    });
