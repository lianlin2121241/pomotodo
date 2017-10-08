'use strict';
/**
 * @name dbqsysHtmlApp.filters
 * @description
 */
app.filter('generalFilter', function () {
        return function (input, valFnc) {
            return valFnc(input);
        };
    })
    .filter('objFilter', function() {
        return function(input) {
            var arr = [];
            angular.forEach(input, function(item) {
                if(item.isshow == 0 || item.isshow == 1) {
                    arr.push(item);
                }
            })
            return arr;
        }
    })

