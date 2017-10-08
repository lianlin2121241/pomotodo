app.directive('checkBox',[function(){
	return{
		restrict:"E",
		template:function(elem,attr){
			if(attr["ischeckall"]){
				var allDom = '<span class="level-span active" id="{{v.id}}" ng-click="checkAll('+attr["source"]+')" >全部&nbsp;<i class="glyphicon glyphicon-ok" ng-show="all" ng-init="all='+attr["default"]+'" style="color:white;"></i></span>';
			}else{
				var allDom = '';
			}
			if(attr["type"]=="redioSelect"){
				var allDom = '';
			}
			var nDom = '<span class="level-span active" ng-repeat="v in '+attr["source"]+'" id="{{v.id}}" ng-click="itemClick(v,'+attr["source"]+')" >{{v.txt}}&nbsp;<i class="glyphicon glyphicon-ok" ng-show="v.status" ng-init="v.status='+attr["default"]+'" style="color:white;"></i></span>';
			return allDom+nDom
		},
		scope:true,//true,初始指令继承控制器的数据，指令的更新不影响控制器的数据，（当更改指令的值时，angular会为指令单独配置一个scope（作用域）；当scope设置为true时，会从父作用域继承并创建一个新的作用域对象。）；{}初始的时候指令就不继承控制器的数据；false指令继承控制器的数据，指令的更新也影响控制器的数据
		link:function(scope,ele,attrs){//link 对指令的dom元素进行处理；  scope 指令的作用域 ； ele标签元素（也就是定义的指令）
			scope.itemClick=function(obj,source){
				if(attrs.type=="multiCheck"){
					scope.multiCheck(obj,source);
				}else if(attrs.type=="singleSelect"){
					scope.singleSelect(obj,source);
				}
			}
			
		    //重点人级别复选框
		    scope.checkAll = function(source){
		    	scope.all = !scope.all;
		    	angular.forEach(source,function(item,index){
	    			item.status = scope.all;
	    		})
		    }
			scope.multiCheck = function(obj,source) {
				var checkSum = 0;
				obj.status = !obj.status;
				angular.forEach(source, function(item,index){
					if(item.status){
						checkSum++;
					}
				})
				if(checkSum>=source.length){
					scope.all = true;
				}else{
					scope.all = false;
				}
				
			}
			scope.singleSelect = function(obj,source){
				angular.forEach(source,function(item,index){
					item.status = false;
				})
				obj.status = true;
				
			}
		}
	}
}])

//app.directive('checkBox',[function(){
//	return{
//		restrict:"E",
//		template:function(elem,attr){
//			if(attr["ischeckall"]){
//				var start = 0;
//			}else{
//				var start = 1;
//			}
//			if(attr["type"]=="redioSelect"){
//				var start = 1;
//			}
//			return '<span class="level-span active" ng-if="$index>='+start+'" ng-repeat="v in '+attr["source"]+'" id="{{v.id}}" ng-click="itemClick(v,'+attr["source"]+')" >{{v.txt}}&nbsp;<i class="glyphicon glyphicon-ok" ng-show="v.status" ng-init="v.status='+attr["default"]+'" style="color:white;"></i></span>'
//			
//		},
//		scope: true,//true,初始指令继承控制器的数据，指令的更新不影响控制器的数据，（当更改指令的值时，angular会为指令单独配置一个scope（作用域）；当scope设置为true时，会从父作用域继承并创建一个新的作用域对象。）；{}初始的时候指令就不继承控制器的数据；false指令继承控制器的数据，指令的更新也影响控制器的数据
//		link:function(scope,ele,attrs){//link 对指令的dom元素进行处理；  scope 指令的作用域 ； ele标签元素（也就是定义的指令）
//			scope.itemClick=function(obj,source){
//				if(attrs.type=="multiCheck"){
//					scope.multiCheck(obj,source);
//				}else if(attrs.type=="singleSelect"){
//					scope.singleSelect(obj,source);
//				}
//			}
//		    //重点人级别复选框
//			scope.multiCheck = function(obj,source) {
//				var checkSum = 0;
//				obj.status = !obj.status;
//				if(obj.txt == "全部") {
//					angular.forEach(source, function(item, index) {
//						item.status = source[0].status;
//					})
//					return;
//				}
//				angular.forEach(source, function(item,index){
//					if(index>=1&&item.status){
//						checkSum++;
//					}
//				})
//				if(checkSum>=source.length-1){
//					source[0].status = true;
//				}else{
//					source[0].status = false;
//				}
//			}
//			scope.singleSelect = function(obj,source){
//				angular.forEach(source,function(item,index){
//					item.status = false;
//				})
//				obj.status = true;
//			}
//		}
//	}
//}])
