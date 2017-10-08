'use strict';
app.factory('apiFactory',function ($http, $q, $location, globalFactory,$rootScope,$timeout,$window) {

        var baseUrl = globalFactory.baseUrl;    //基础URL
        //查询封装闭包
        function getQuery(httpFn) {
            return {
                query: function (params) {
                    var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
                    var httpParams=httpFn(params);  //数据请求参数
                    if(httpParams.loadParam.shade){
                        $rootScope.showShade=true;
                    }
                    $http(httpParams.httpData)
                        .success(function (data, status, headers, config) {
                            if (data.success) {
                                deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了
                            } else {
                                deferred.reject(data);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            deferred.reject(data); // 声明执行失败，即服务器返回错误
                        })
                        .finally(function(){
                            if(httpParams.loadParam.shade){
                            	$timeout(function(){$rootScope.showShade=false;},200)
                            	/*$rootScope.showShade=false;*/

                            }
                        })
                    return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API
                },
                queryCallback: function (params, callbackSuccess,callbackFailed) {
                    var deferred = $q.defer();

                    this.query(params)
                        .then(function (data) {
                            // 调用承诺API获取数据 .resolve
                            deferred.resolve(callbackSuccess(data));
                        }, function (data) { // 处理错误 .reject
                            var msg=data.message||"数据接口返回错误";
                            //!!callbackFailed&&callbackFailed(data);
                            !!callbackFailed && deferred.reject(callbackFailed(data));
                            if(data.alt) {
                                $.alert({
                                    title: '提示',
                                    content: msg
                                });
                            }
                        });
                    return deferred.promise;
                }
            }
        };

        // Public API here
        return {
            staffManage : {
                //查询案件
                queryDocumentsByPage : getQuery(function(params) {
                    return {
                        loadParam : {
                            shade : null
                        },
                        httpData : {
                            method : "POST",
                            url : baseUrl + '/documentController/queryDocumentsByPage',
                            data:params
                        }
                    }
                })
            },
            userManage:{
                getUserList:getQuery(function() {
                    return {
                        loadParam : {
                            shade : null
                        },
                        httpData : {
                            method : "get",
                            url : baseUrl + '/user/list'
                        }
                    }
                }),
                save:getQuery(function(params) {
                    return {
                        loadParam : {
                            shade : null
                        },
                        httpData : {
                            method : "post",
                            url : baseUrl + '/user/save',
                            data:params
                        }
                    }
                })
            }
        }
    });
