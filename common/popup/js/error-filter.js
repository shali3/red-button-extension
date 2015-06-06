/**
 * Created by ShaLi on 5/30/15.
 */
'use strict';
function errorFilter($rootScope) {
    return function (error) {
        return error ? $rootScope.text[error] || error.message || error.responseText || error : "Empty Error";
    };
}
app.filter('error', errorFilter);
