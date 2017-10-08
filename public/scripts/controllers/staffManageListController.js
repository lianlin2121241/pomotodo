'use strict';

app.controller('staffManageList', ['$scope','$stateParams','apiFactory','commonFunFactory', function(scope,stateParams,apiFactory,commonFunFactory) {
    scope.stateParams=stateParams;
    scope.loadTargetList=function(){
        apiFactory.staffManage.queryDocumentsByPage.queryCallback({
            Status:"0",
            cid:"11111",
            keyword:"",
            levleCode:"0",
            order:"S_LEVEL ASC,FOCUS_MEMBER_NAME DESC"
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
    
    scope.data=[
		{id:1,txt:"一级",status:true},
    	{id:2,txt:"二级",status:true},
    	{id:3,txt:"三级",status:true},
    	{id:4,txt:"四级",status:true},
    	{id:5,txt:"五级",status:true}
    ]
    scope.data1=[
    	{id:1,txt:"一级",status:true},
    	{id:2,txt:"二级",status:true},
    	{id:3,txt:"三级",status:true},
    	{id:4,txt:"四级",status:true},
    	{id:5,txt:"五级",status:true}
    ]
    scope.data2=[
    	{id:1,txt:"一级",status:false},
    	{id:2,txt:"二级",status:false},
    	{id:3,txt:"三级",status:false},
    	{id:4,txt:"四级",status:false},
    	{id:5,txt:"五级",status:false}
    ]

}]);
