/**
 *  司机编辑页面保存按钮 
 */
$("#saveDriver").live('click', function() {
    $("#saveDriver").addClass("btn_forbidden");
    $("#saveDriver").attr("disabled","disabled");
    if(!$("#tradeDriverForm").valid()){
    	$("#saveDriver").removeClass("btn_forbidden");	
    	$("#saveDriver").removeAttr("disabled","disabled");
    	return false;
    }
	//空格处理
    $("#tradeDriverForm").find("input").each(function() {
        $(this).val($.trim($(this).val()));
    });
    //如果ID有值就修改，没有则新增
    var driverId = $("#driverId").val();

    if (null != driverId && "" != driverId) {
        //修改
        $("#tradeDriverForm").ajaxSubmit({
            url : "shang/updateTradeDriver.do",
            type : "post",
            dataType : "json",
            success : function(data) {
                if (data.msg == "success") {
                    $.alertPlus("操作成功", 1, "提示");
                    window.self.location = 'shang/toTradeDriverIndex.do';
                } else {
                    $.alertPlus(data.msg, 2, "提示");
                    $("#saveDriver").removeClass("btn_forbidden");
                    $("#saveDriver").removeAttr("disabled","disabled");
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
            	$.alertPlus("服务忙，请稍后再试", 8, "提示");
            	 $("#saveDriver").removeClass("btn_forbidden");
                 $("#saveDriver").removeAttr("disabled","disabled");
            }
        });
    } else {
        //新增
        $("#tradeDriverForm").ajaxSubmit({
            url : "shang/addTradeDriver.do",
            type : "post",
            dataType : "json",
            success : function(data) {
                if (data.msg == "success") {
                	$.alertPlus("操作成功", 1, "提示");
                    window.self.location = 'shang/toTradeDriverIndex.do';
                }else{
                    $.alertPlus(data.msg, 2, "提示");
                    $("#saveDriver").removeClass("btn_forbidden");
                    $("#saveDriver").removeAttr("disabled","disabled");
                }
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){
            	$.alertPlus("服务忙，请稍后再试", 8, "提示");
            	$("#saveDriver").removeClass("btn_forbidden");
                $("#saveDriver").removeAttr("disabled","disabled");
            }
        });
    }
});

/**
 *  根据身份证号自动计算出生日期和驾驶证号
 */
$("#identityNo").live("change",function(){
	//身份证号
    var idCardBirth = $("#identityNo").val();
    
    if($("#identityNo").valid()){        
        var year =  idCardBirth.substring(6,10);   
        var month = idCardBirth.substring(10,12);   
        var day = idCardBirth.substring(12,14); 
        
        $("#birthday").val(year+"-"+month+"-"+day);
        
      //赋值驾驶证号
        $("#drivingLicense").val(idCardBirth);
    }else {
    	$("#birthday").val("");
    	$("#drivingLicense").val("");
	}  
    if($("#identityNo").valid()){
    	$("#drivingLicense").valid();
    }
});

//驾龄值改变的时候调用校验规则
$("#age").keyup(function(){
	if($("#age").valid()){
		$("#age").parent().find("label").remove();
	};
});

//选择司机性质后的回调函数
function checkDriverNature(){
	$("#driver_driverNature").valid();
}

/**
 * 点击查询，弹出联系人选择层
 */
var connectionListDialog;
$(".connectionSelect").live("click", function(){
	mark = $(this).attr("id");
	
	$.getDialog().html($('#connectionList').html());
	connectionListDialog = $.layerPlus({
		type : 1,
		title : ['选择联系人'],
		fix : false,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shadeClose : false,
		page : {dom : '#dialog'}
	});

//	if($.trim($.parentDom("#connectionResult").html())){
//		return false;
//	}

	queryConnectionList();
});

/**
 * 联系人弹出层查询事件
 */
$.parentDom("#queryConnectionList").live("click",function(){
	queryConnectionList();
});
/**
 * 查询所有的联系人信息，列表显示
 */
function queryConnectionList(pageNum, pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	
	var connecName = $.parentDom("#connectName").val();
	var connecPhone = $.parentDom("#connectPhone").val();
	var connectType=4;
	$.ajax({
		type:"post",
		url:"shang/showAllConnectionList.do",
		dataType:"html",
		data:{
			"pageSize": pageSize, 
			"pageNum": pageNum, 
			"condition.name":connecName,
			"condition.mobilePhone":connecPhone,
			"connectType":connectType
		},
		success:function(data){
			$.parentDom("#connectResult").html(data);
		},
		error:function(data){
			$.alertPlus("查询联系人出错！", 2, "提示");
		}
	});
}
//确定联系人
function sureConnection(currObj){
	var objJson = $(currObj).find("#objSpan").html();
	var obj = JSON.parse(objJson);
	if (typeof(JSON) == 'undefined'){ 
		obj = eval("("+objJson+")"); 
	}else{    
		obj = JSON.parse(objJson);  
	}  
	$("#connectionId").val(obj.id);
	$("#connectName").val(obj.name);
	$("#connectMobile").val(obj.mobilePhone);
	$("#connectPhone").val(obj.fixedPhone);
	$("#connectEmail").val(obj.email);
	$("#connectFax").val(obj.faxNum);
	$("#connectQQ").val(obj.qq);
	$("#connectRemark").val(obj.remark);
	$("#connectionProvinceId").val(obj.proId);
	$("#connectionProvince").val(obj.proName);
	$("#connectionCityId").val(obj.cityId);
	$("#connectionCity").val(obj.cityName);
	$("#connectionCountyId").val(obj.countyId);
	$("#connectionCounty").val(obj.countyName);
	$("#connectAddress").val(obj.allAddress);
	
	if(obj.proId && obj.proName){
		$("#connectionAddressSelect").val(obj.proName);
		if(obj.cityId && obj.cityName){
			$("#connectionAddressSelect").val(obj.proName + "-" + obj.cityName);
			if(obj.countyId && obj.countyName){
				$("#connectionAddressSelect").val(obj.proName + "-" + obj.cityName + "-" + obj.countyName);
			}
		}
	} 
	$.closePlus(connectionListDialog);
}

/**
 * 取消录入操作
 */
$("#cancelEntryBtn").live("click", function(){
	$.confirmPlus("是否确定取消录入!", function(index){
		history.go(-1);
		$.closePlus(index);
	}, "确认取消录入", function(index){
		$.closePlus(index);
	});
});

/**
 *  司机管理页面修改 
 */
$("#updateDriver").live("click",function(){
	var driverId = $("#driverId").val();
	 window.self.location="shang/toUpdateTradeDriver.do?driver.driverId=" + driverId;
});
