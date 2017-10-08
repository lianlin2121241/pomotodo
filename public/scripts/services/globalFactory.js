'use strict';
app.factory('globalFactory', function ($location) {
        return {
            //baseUrl:'http://'+$location.host()+':'+$location.port()+ '/synbasic-web-data',
            baseUrl: 'http://' + $location.host() + ':' + $location.port()+"/server",
            casUrl:'http://cas.login/cas/login?service=',

            reset: function () {
            }
        };
    });
