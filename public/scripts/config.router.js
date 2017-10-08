'use strict';

/**
 * Config for the router
 */
angular.module('myApp')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider,   $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/app/staffManage/staffList/');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'views/app.html'
                    })
                    .state('app.staffManage', {
                        abstract: true,
                        url: '/staffManage',
                        templateUrl: 'views/staffManage/staffManage.html',
                        resolve: {
                            deps: ['$ocLazyLoad',function( $ocLazyLoad ){
                                // return $ocLazyLoad.load(['js/controllers/chart.js']);
                            }]
                        }
                    })
                    .state('app.staffManage.list', {
                        url: '/staffList/{cid}',
                        templateUrl: 'views/staffManage/staffManageList.html',
                        resolve: {
                            deps: ['$ocLazyLoad',function( $ocLazyLoad ){
                                return $ocLazyLoad.load([
                                    'scripts/controllers/staffManageController.js',
                                    'scripts/controllers/staffManageListController.js',
                                    ]);
                            }]
                        }
                    })
                    .state('app.staffDistribute', {
                        url: '/staffDistribute',
                        templateUrl: 'views/staffDistribute/staffDistribute.html',
                        resolve: {
                            deps: ['$ocLazyLoad',function( $ocLazyLoad ){
                                return $ocLazyLoad.load(['scripts/controllers/staffDistribute.js']);
                            }]
                        }
                    })
                    .state('admin', {
                        abstract: true,
                        url: '/admin',
                        templateUrl: 'views/admin/admin.html'
                    })
                    .state('admin.user', {
                        url: '/user',
                        templateUrl: 'views/admin/user/userList.html',
                        resolve: {
                            deps: ['$ocLazyLoad',function( $ocLazyLoad ){
                                return $ocLazyLoad.load([
                                    'scripts/controllers/userController.js'
                                    ]);
                            }]
                        }
                    })









                    .state('app.ui.googlemap', {
                        url: '/googlemap',
                        templateUrl: 'tpl/ui_googlemap.html',
                        resolve: {
                            deps: ['uiLoad',
                              function( uiLoad ){
                                return uiLoad.load( [
                                    'js/app/map/load-google-maps.js',
                                    'js/app/map/ui-map.js',
                                    'js/app/map/map.js'] ).then(
                                    function(){
                                        return loadGoogleMaps();
                                    }
                                );
                            }]
                        }
                    })
                    .state('layout.fullwidth', {
                        url: '/fullwidth',
                        views: {
                            '': {
                                templateUrl: 'tpl/layout_fullwidth.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/layout_footer_fullwidth.html'
                            }
                        },
                        resolve: {
                            deps: ['uiLoad',
                              function( uiLoad ){
                                return uiLoad.load( ['js/controllers/vectormap.js'] );
                            }]
                        }
                    })
            }
        ]
    );