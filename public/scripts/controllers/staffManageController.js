'use strict';

app.controller('staffManage', ['$scope','apiFactory','$state','commonFunFactory', function(scope,apiFactory,state,commonFunFactory) {
    document.cookie="JSESSIONID=AAFCC41537FB36E30A6C4BC6638F2542";
    let pageSize=20;
    scope.cases=[];
    //加载案件
    scope.loadCases=function(pageNo){
        apiFactory.staffManage.queryDocumentsByPage.queryCallback({
            pageNo:pageNo,
            pageSize:pageSize
        }, (data) =>{
            var cases=commonFunFactory.obj2Arr(data.data.documents);
            cases.forEach(function(item){
                scope.cases.push(item);
            })
            if(pageNo==1){
                state.go('app.staffManage.list', {cid: scope.cases[0]["key"]} );
            }
        });
    }
    scope.loadCases(1);

}]);
