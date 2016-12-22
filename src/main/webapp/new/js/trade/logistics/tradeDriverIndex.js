//初始化
$(document).ready(function(){
     queryDriverList();
})
//批量删除
$("#deleteDriver").live("click",function(){
    
	// 定义个数组存id
	var arry = new Array();
	 var objName = document.getElementsByName("checkbox");
	for (i = 0; i < objName.length; i++) {
		if (objName[i].name == "checkbox" && objName[i].checked) {
			arry.push(objName[i].value);
		}
	}
	//处理删除数据
	handeDel(arry);
});	
//单个删除
function deleteDriver(driverId){
	// 定义个数组存id
	var arry = new Array();
	arry.push(driverId);
	//处理删除数据
	handeDel(arry);
}
//处理删除数据
function handeDel(arry){     
	if (arry.length <= 0) {
		$.alertPlus("至少选择一条数据", 2, "提示", function(index){
               $.closePlus(index);
        });
		return true;
	}
	$.confirmPlus("是否确定删除?", function(index){
       $.ajax({
           url:"shang/deleteTradeDriver.do?array=" + arry,
           type:"post",
           success : function(data){
       		if("success" == data.msg){
       			$.alertPlus("操作成功", 1, "提示");
       			queryDriverList();
       		}else {
       			$.alertPlus(data.msg, 2, "提示");
				}
           },
           error : function(XMLHttpRequest, textStatus, errorThrown){
               $.alertPlus("网络繁忙，请稍后重试", 2, "提示");
           }
       });
       $.closePlus(index);
    }, "确认删除", function(index){
        $.closePlus(index);
    });
}	


//手动清除查询条件
$("#clear").live("click",function(){
	$("#driverCode").val("");
	$("#driverName").val("");
	$("#mobilePhone").val("");
});
/**
 *  司机管理查询按钮 
 */
$("#select").live('click', function(event) {
	queryDriverList();
});
//设置enter键快捷查询
$("#tradeDriverForm").find("input").keyup(function(event){
	if(event.keyCode == '13'){
		queryDriverList();
	}
});
/**
 *  司机管理页面上页下页刷新页面
 */
function queryDriverList(pageNum, pageSize) {
    
    if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    if (!pageSize || pageSize < 1) {
        pageSize = 10;
    }
    $("#pageNum").val(pageNum);
    $("#pageSize").val(pageSize);
    var options = {
		url:"shang/queryTradeDrivers.do",
    	type:"post",
    	success:function(data){
    		$("#driverListData").html(data);
    		parent.dyniframesize();
    	},
    	error:function(XMLHttpRequest, textStatus, errorThrown){
    		$.alertPlus("服务忙，请稍后再试", 8, "提示");
    	}	
    }
    $("#tradeDriverForm").ajaxSubmit(options);	
}
/**
 *  司机管理新增按钮 
 */
$("#addDriver").live('click', function() {
    window.self.location = "shang/toAddTradeDriver.do";
});

/**
 *  司机管理页面修改 
 */
function updateDriver(driverId){
    window.self.location="shang/toUpdateTradeDriver.do?driver.driverId=" + driverId;
};
//查看司机详情
function queryDriverDetail(driverId){
	window.self.location = "shang/queryDriverDetail.do?driver.driverId=" + driverId;
};
/**
 * 获取选中的check的值
 * @return
 */
function getCheckID(){
	var strIds="";
	$("input[name='checkbox']:checkbox").each(function(){ 
        if($(this).attr("checked")){
        	strIds += $(this).val()+","
        }
    })
    return strIds;
}
/**
 * 下载选中
 */
function downloadSelect(){
	var strIds = getCheckID();
	if(strIds == ""){
		$.alertPlus("请选择一条数据！",2,"提示");
		return;
	}else {
		location.href = "shang/exportDrivers.do?strIds="+strIds;
	}
}
/**
 * 下载全部
 */
function downloadAll(){
	$("#tradeDriverForm").attr("action","shang/exportDrivers.do");
	$("#tradeDriverForm").submit();
}