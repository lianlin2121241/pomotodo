'use strict';

app.controller('userManage', ['$scope','$modal','apiFactory','commonFunFactory', function(scope,modal,apiFactory,commonFunFactory) {
    scope.getUserList=function(){
        apiFactory.userManage.getUserList.queryCallback({
        }, (data) =>{
            scope.userList=data.data;
        });
    }
    scope.getUserList();

    scope.addUser=function(size){
        var modalInstance=modal.open({
            templateUrl:'addUser.html',
            controller:'modifyUser',
            backdrop:"static",
            size:size
        })
        modalInstance.result.then(function(){
            scope.getUserList();
        },function(){

        })
    }
}]);

app.controller('modifyUser', ['$scope','$modalInstance','apiFactory','commonFunFactory', function(scope,modalInstance,apiFactory,commonFunFactory) {
    scope.userInfo={
        name:"",
        realName:"",
        password:""
    }
    scope.save=function(){
        apiFactory.userManage.save.queryCallback(scope.userInfo, (data) =>{
            if(data.success){
                modalInstance.close();
            }
        });
    }
    scope.cancel=function(){
        modalInstance.dismiss();
    }

}]);
