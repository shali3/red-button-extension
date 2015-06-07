/**
 * Created by ShaLi on 5/15/15.
 */
'use strict';
function MenuCtrl($scope, $rootScope, backgroundPage) {
    function setMenuItems() {
        $scope.menuItems = [
            {
                name: 'report',
                text: $rootScope.text.reportTab
            },
            {
                name: 'myReports',
                text: $rootScope.text.myReports
            },
            {
                name: 'heroes',
                text: $rootScope.text.heroes
            }
        ];
    }

    setMenuItems();
    $rootScope.$watch('text', setMenuItems);

    $scope.close = backgroundPage.closePopup;
    $scope.setLocale = function (locale) {
        $rootScope.locale = locale;
    }
}
app.controller('MenuCtrl', MenuCtrl);