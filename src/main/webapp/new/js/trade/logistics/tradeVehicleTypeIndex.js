//初始化
$(document).ready(function(){
     queryVehicleTypeList();
})
//批量删除
$("#deleteVehicleType").live("click",function(){
    
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
function deleteVehicleType(veTypeId){
	// 定义字符串存id
	var allIds="";
	allIds = veTypeId+",";
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
           url:"shang/deleteVehicleType.do?allIds=" + allIds,
           type:"post",
           success : function(data){
       		if("success" == data.msg){
       			$.alertPlus("操作成功", 1, "提示");
       			queryVehicleTypeList();
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
	$("#veTypeCode").val("");
	$("#veTypeName").val("");
});
/**
 *  车型列表查询按钮 
 */
$("#select").live('click', function(event) {
	queryVehicleTypeList();
});
//设置enter键快捷查询
$("#veTypeForm").find("input").keyup(function(event){
	if(event.keyCode == '13'){
		queryVehicleTypeList();
	}
});
/**
 *  车型管理页面上页下页刷新页面
 */
function queryVehicleTypeList(pageNum, pageSize) {
    
    if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    if (!pageSize || pageSize < 1) {
        pageSize = 10;
    }
    $("#pageNum").val(pageNum);
    $("#pageSize").val(pageSize);
    var options = {
		url:"shang/queryVehicleTypes.do",
    	type:"post",
    	success:function(data){
    		$("#vehicleTypeListData").html(data);
    		parent.dyniframesize();
    	},
    	error:function(XMLHttpRequest, textStatus, errorThrown){
    		$.alertPlus("服务忙，请稍后再试", 8, "提示");
    	}	
    }
    $("#veTypeForm").ajaxSubmit(options);	
}
/**
 *  车型管理新增按钮 
 */
$("#addVehicleType").live('click', function() {
    window.self.location = "shang/toAddVehicleType.do";
});

/**
 *  车型管理页面修改 
 */
function updateVehicleType(veTypeId){
    window.self.location="shang/toUpdateVehicleType.do?veType.id=" + veTypeId;
};