'use strict';

app.factory('commonFunFactory', function () {
		var commonFun={
			//判断是否到达底部
            divIsToBottom: function (ele) {
                var childrens = $(ele).children();
                var innerAllHeight = 0;
                var innerAllTop = 0;
                childrens.each(function (index, item) {
                    innerAllHeight += $(this).height();
                    var topValue = $(this).css("top").match(/^(\d*)px$/);
                    innerAllTop += !!topValue ? topValue[1] - 0 : 0;
                })
                return ele.scrollTop >= innerAllHeight - ele.clientHeight + innerAllTop - 1;
            },
			//判断是否纵向溢出
            isOverflowV: function (ele) {
                return ele.clientHeight < ele.scrollHeight;
            },
			//判断是否横向溢出
            isOverflowH: function (ele) {
                return ele.clientWidth < ele.scrollWidth;
            },
            //防抖
            debounce:function(fun,wait,immediate){
				var timeout;
				return function(){
					var context=this,args=arguments;
					var later=function(){
						timeout=null;
						!immediate&&fun.apply(context,args);
					}
					var canNow=immediate&&!timeout;
					clearTimeout(timeout);
					timeout=setTimeout(later,wait);
					canNow&&fun.apply(context,args);
				}
			},
            //节流
            throttle:function(fun,wait,mustRun){
                var startTime=new Date(),timeout;
                return function(){
                    var curTime=new Date(),
                        context=this,
                        args=arguments;
                    clearTimeout(timeout);
                    if(curTime-startTime>mustRun){
                        fun.apply(context,args);
                        startTime=curTime;
                    }else{
                        timeout=setTimeout(fun,wait);
                    }
                }
            },
            obj2Arr:function(obj){
                var arr=[];
                for(var k in obj){
                    arr.push({
                        key:k,
                        value:obj[k]
                    })
                }
                return arr;
            }
		}
		return commonFun;
	})