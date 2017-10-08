// config

var app =
angular.module('myApp')
    .config(
        [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {

            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            app.constant   = $provide.constant;
            app.value      = $provide.value;
        }
    ])
    .config(['$httpProvider',function ($httpProvider) {
        //设置IE缓存问题
        if(!$httpProvider.defaults.headers.get){
            $httpProvider.defaults.headers.get={};
        }
        $httpProvider.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";
        $httpProvider.defaults.headers.get["Cache-Control"]="no-cache";
        $httpProvider.defaults.headers.get["Pragma"]="no-cache";
    }])
