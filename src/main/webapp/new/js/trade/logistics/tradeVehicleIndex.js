//初始化
$(document).ready(function(){
     queryVehicleList();
})
//批量删除
$("#deleteVehicle").live("click",function(){
    
	// 定义字符串存id
	var allIds="";
	 var objName = document.getElementsByName("checkbox");
	for (i = 0; i < objName.length; i++) {
		if (objName[i].name == "checkbox" && objName[i].checked) {
			allIds+=objName[i].value+",";
		}
	}
	//处理删除数据
	handeDel(allIds);
});	
//单个删除
function deleteVehicle(vehicleId){
	// 定义字符串存id
	var allIds="";
	allIds = vehicleId+",";
	//处理删除数据
	handeDel(allIds);
}
//处理删除数据
function handeDel(allIds){     
	if (allIds == "") {
		$.alertPlus("至少选择一条数据", 2, "提示", function(index){
               $.closePlus(index);
        });
		return true;
	}
	$.confirmPlus("是否确定删除?", function(index){
       $.ajax({
           url:"shang/deleteVehicle.do?allIds=" + allIds,
           type:"post",
           success : function(data){
       		if("success" == data.msg){
       			$.alertPlus("操作成功", 1, "提示");
       			queryVehicleList();
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
	$(".vehicleCondition").val("");
	$(".spCondition").find(".spLiFirst").trigger("click");
});
/**
 *  车辆列表查询按钮 
 */
$("#select").live('click', function(event) {
	queryVehicleList();
});
//设置enter键快捷查询
$("#vehicleForm").find("input").keyup(function(event){
	if(event.keyCode == '13'){
		queryVehicleList();
	}
});
/**
 *  车辆管理页面上页下页刷新页面
 */
function queryVehicleList(pageNum, pageSize) {
    
    if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    if (!pageSize || pageSize < 1) {
        pageSize = 10;
    }
    $("#pageNum").val(pageNum);
    $("#pageSize").val(pageSize);
    var options = {
		url:"shang/queryVehicles.do",
    	type:"post",
    	success:function(data){
    		$("#vehicleListData").html(data);
    		parent.dyniframesize();
    	},
    	error:function(XMLHttpRequest, textStatus, errorThrown){
    		$.alertPlus("服务忙，请稍后再试", 8, "提示");
    	}	
    }
    $("#vehicleForm").ajaxSubmit(options);	
}
/**
 *  车辆管理新增按钮 
 */
$("#addVehicle").live('click', function() {
    window.self.location = "shang/toAddVehicle.do";
});

/**
 *  车辆管理页面修改 
 */
function updateVehicle(vehicleId){
    window.self.location="shang/toUpdateVehicle.do?vehicle.id=" + vehicleId;
};
/**
 * 查看司机详情
 */
function queryVehicleDetail(vehicleId){
	window.self.location = "shang/queryVehicleDetail.do?vehicle.id=" + vehicleId;
};
/**
 * 获取选中的check的值
 * @return
 */
function getCheckID(){
	var allIds="";
	$("input[name='checkbox']:checkbox").each(function(){ 
        if($(this).attr("checked")){
        	allIds += $(this).val()+","
        }
    })
    return allIds;
}
/**
 * 下载选中
 */
function downloadSelect(){
	var allIds = getCheckID();
	if(allIds == ""){
		$.alertPlus("请选择一条数据！",2,"提示");
		return;
	}else {
		location.href = "shang/exportVehicles.do?allIds="+allIds;
	}
}
/**
 * 下载全部
 */
function downloadAll(){
	$("#vehicleForm").attr("action","shang/exportVehicles.do");
	$("#vehicleForm").submit();
}