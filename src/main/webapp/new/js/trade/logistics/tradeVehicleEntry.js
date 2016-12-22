//初始化
$(document).ready(function(){
	checkVehicle();
	if ($("#vehicleId").val() == null || $("#vehicleId").val() == "") {
		$(".eleCode").find("li").eq(1).click();
	}
});
function checkVehicle(){
	//校验规则
	    $("#vehicleEditForm").validate({ 
	        
	        rules:{ 
	    		//车牌号
		        'vehicle.num':{
		    		required:true,
		    		repeatNum:true,
		    		vehicleNum:true,
		    		toFilter:true
		    	},
		    	//车辆编码
		        'vehicle.code':{
		    		required:true,
		    		repeatCode:true,
		    		charAndNum:true,
		    		maxlength:30,
		    		toFilter:true
		    	},
		    	//车辆状态
		        "vehicle.eleId":{
		    		required:true
		    	},
		    	//主驾驶
		    	"vehicle.driverId":{
		    		required:true
		    	},
		    	//车型
		        "vehicle.vehicleTypeId":{
		    		toFilter:true
		    	},
		    	//发动机号
		    	"vehicle.engineNo":{
		    		maxlength:30,
		    		toFilter:true
		    	},
		    	//车架号
		    	"vehicle.frameNo":{
		    		maxlength:30,
		    		toFilter:true
		    	},
		    	//车身重量
		    	"vehicle.weighs":{
		    		number:true,
		    		max:999.99,
		    		toFilter:true
		    	},
		    	//轮胎数量
		    	"vehicle.tireNum":{
		    		number:true,
		    		max:999,
		    		toFilter:true
		    	},
		    	//轮胎规格
		    	"vehicle.tire":{
		    		maxlength:30,
		    		toFilter:true
		    	},
		    	//出厂型号
		    	"vehicle.deliveryNo":{
		    		maxlength:30,
		    		toFilter:true
		    	},
		    	//购置税证
		    	"vehicle.purchaseNo":{
		    		maxlength:30,
		    		toFilter:true
		    	},
		    	//购置保险卡号
		    	"vehicle.safeNo":{
		    		maxlength:30,
		    		toFilter:true
		    	},
		    	//营运号
		    	"vehicle.operationNo":{
		    		maxlength:30,
		    		toFilter:true
		    	}
	        },
	         messages:{ 
	    		//车牌号
		        'vehicle.num':{
		    		required:"请输入车牌号",
		    		repeatNum:"你所输入的车牌号已存在",
		    		vehicleNum:"请输入正确的车牌号",
		    		toFilter:"车牌号不能包含特殊字符"
		    	},
		    	//车辆编码
		        'vehicle.code':{
		    		required:"请输入车辆编码",
		    		repeatCode:"你所输入的车辆编码已存在",
		    		maxlength:"车辆编码最大长度为30",
		    		toFilter:"车辆编码不能包含特殊字符"
		    	},
		    	//车辆状态
		        "vehicle.eleId":{
		    		required:"请选择车辆状态"
		    	},
		    	//主驾驶
		    	"vehicle.driverId":{
		    		required:"请选择主驾驶"
		    	},
		    	//车型
		        "vehicle.vehicleTypeId":{
		    		required:"请选择车型"
		    	},
		    	//发动机号
		    	"vehicle.engineNo":{
		    		maxlength:"发动机号最大长度为30",
		    		toFilter:"发动机号不能包含特殊字符"
		    	},
		    	//车架号
		    	"vehicle.frameNo":{
		    		maxlength:"车架号最大长度为30",
		    		toFilter:"车架号不能包含特殊字符"
		    	},
		    	//车身重量
		    	"vehicle.weighs":{
		    		number:"车身重量只能是由数字组成",
		    		max:"车身重量最大为999.99",
		    		toFilter:"车身重量不能包含特殊字符"
		    	},
		    	//轮胎数量
		    	"vehicle.tireNum":{
		    		number:"轮胎数量只能是由数字组成",
		    		max:"轮胎数量最多不能超过999",
		    		toFilter:"轮胎数量不能包含特殊字符"
		    	},
		    	//轮胎规格
		    	"vehicle.tire":{
		    		maxlength:"轮胎规格最大长度为30",
		    		toFilter:"轮胎规格不能包含特殊字符"
		    	},
		    	//出厂型号
		    	"vehicle.deliveryNo":{
		    		maxlength:"出厂型号最大长度为30",
		    		toFilter:"出厂型号不能包含特殊字符"
		    	},
		    	//购置税证
		    	"vehicle.purchaseNo":{
		    		maxlength:"购置税证号最大长度为30",
		    		toFilter:"购置税证不能包含特殊字符"
		    	},
		    	//购置保险卡号
		    	"vehicle.safeNo":{
		    		maxlength:"保险卡号最大长度为30",
		    		toFilter:"购置保险卡号不能包含特殊字符"
		    	},
		    	//营运号
		    	"vehicle.operationNo":{
		    		maxlength:"营运号最大长度为30",
		    		toFilter:"营运号不能包含特殊字符"
		    	}
	        }              
	    })

		 // 车牌号是否重复
	    jQuery.validator.addMethod("repeatNum", function(value, element) {  
	       
	       //获取车辆ID
	       var vehicleId = $("#vehicleId").val();
	       result = false;
	        $.ajax({
	            url:"shang/checkVehicleNum.do",
	            type:"post",
	            data:{
	        		"vehicle.num":value,
	        		"vehicle.id":vehicleId
	        	},
	            async:false,
	            success:function(data){
	                if (data.msg == "success") {
						result = true
					}
	            },
	            error:function(data){
	                result = false;
	            }
	        })
	        return this.optional(element) || result;
	    },"车牌号已存在！");
	}
//保存
$("#saveVehicle").click(function (){
	if(!$("#vehicleEditForm").valid()){
		return false;
	}
	var url="";
	if ($("#vehicleId").val() == "") {
		url = "shang/addVehicle.do";
	}else {
		url = "shang/updateVehicle.do";
	}
	//异步提交表单
  $("#vehicleEditForm").ajaxSubmit({
	url:url,
	type: "post",
	dataType: "json",
	beforeSend: function(){
		$.parentDom("#saveVehicle").attr("disabled","disabled");
	},
	success: function(data){
	  if (data.msg == "success") {
		  $.alertPlus("操作成功", 1, "提示");
		  window.self.location="shang/toVehicleIndex.do";
	  }else {
		  $.alertPlus(data.msg, 2, "提示")
          $("#saveVehicle").removeAttr("disabled","disabled");
		}
	},
	error:function(XMLHttpRequest, textStatus, errorThrown) {
        $.alertPlus("网络繁忙，稍后再试", 8, "提示")
        $("#saveVehicle").removeAttr("disabled","disabled");
    }  
  });
});
$("#cancelVehicle").live("click",function(){
	$.confirmPlus("是否确定取消录入!", function(index){
		history.go(-1);
		$.closePlus(index);
	}, "确认取消录入", function(index){
		$.closePlus(index);
	});
});
/**
 * 点击选择主驾驶员
 */
var driverLayer;
$("#co_m_driver").live('click',function() {
    $.getDialog().html($('#chooseDriver').html());
    driverLayer = $.layerPlus({
        type : 1,
        title : ['选择主驾驶'],
        fix : false,
        offset:['50px' , '50%'],
        area : ['auto','auto'],
        shadeClose : false,
        page : {dom : '#dialog'}
    });
    //如果有内容就不用查询
    if($.trim($("#driverResult").html())){
        return false;
    }
    queryDriverList();
    $("#driverType").val("main");
})
/**
 * 点击选择副驾驶员
 */
var driverLayer;
$("#co_d_driver").live('click',function() {
    $.getDialog().html($('#chooseDriver').html());
    driverLayer = $.layerPlus({
        type : 1,
        title : ['选择副驾驶'],
        fix : false,
        offset:['50px' , '50%'],
        area : ['auto','auto'],
        shadeClose : false,
        page : {dom : '#dialog'}
    });
    //如果有内容就不用查询
    if($.trim($("#driverResult").html())){
        return false;
    }
    queryDriverList();
    $("#driverType").val("deputy");
})

/**
 * 驾驶员查询按钮
 */
$.parentDom("#queryDriver").live("click", function(){
	queryDriverList();
});

/**
 * 查询主驾驶信息
 */
function queryDriverList(pageNum, pageSize){   
	if(!pageNum || pageNum < 1){
        pageNum = 1 ;
    }
    if(!pageSize || pageSize < 1){
        pageSize = 10;
    }
    $.parentDom("#driverForm").find("#pageSize").val(pageSize);
    $.parentDom("#driverForm").find("#pageNum").val(pageNum);
    var options = {
         url:"shang/queryVehicleDriver.do",
         type:"post",
         cache : false,
         dataType:"html",
         async:true,
         success:function(data){
            $.parentDom("#driverResult").html(data);
         },
         error:function() {
        	 $.alertPlus("服务器忙，请稍候重新操作", 1, "提示");
         }   
    };
    $.parentDom("#driverForm").ajaxSubmit(options);
}


/** 将选中的司机信息赋给文本框*/
function pickDriver(driverName,driverId) {
	if ($("#driverType").val() == "main") {
		$("#driverName").val(driverName);
		$("#driverId").val(driverId);
	}else {
		$("#deputyDriverName").val(driverName);
		$("#deputyDriverId").val(driverId);
	}
    //关闭弹出层
    $.closePlus(driverLayer);
}


//车型选择弹出层
var vehiceleDialog;
$("#queryVehicleType").live("click",function(){
	$.getDialog().html($("#queryVehiceTypeDiv").html());
	vehiceleDialog = $.layerPlus({
		type : 1,
		title : ["选择车型"],
		fix : false,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shadeClose : false,
		page : {dom : '#dialog'}
	});
	queryVehicleTypes();
});

//点击查询按钮
$.parentDom("#queryVehicleTypes").live("click",function(){
	queryVehicleTypes();
});
//分页查询车型列表
function queryVehicleTypes(pageNum, pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	$.parentDom("#pageSize").val(pageSize);
	$.parentDom("#pageNum  ").val(pageNum);
	//异步提交表单
	var options = {
		url: "shang/queryVehicleTypes.do",
		type: "post",
		data:{"queryParam":"queryParam"},
		dataType: "html",
		success:function(data){
			$.parentDom("#vehicleTypeResult").html(data);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.alertPlus("服务忙，请稍后再试", 8, "提示");
		}
	}
	$.parentDom("#vehiceTypeForm").ajaxSubmit(options);
};
//点击车型名称，确定选择的车型
function sureVehicleType(obj){
	var objData = $(obj).find(".vtData").text();
	var obj = JSON.parse(objData);
	$("#vehicleTypeId").val(obj.id);
	$("#vehicleTypeName").val(obj.name);
	$("#vehicle_length").val(obj.length);
    $("#vehicle_width").val(obj.width);
    $("#vehicle_height").val(obj.height);
    $("#vehicle_vehicleSize").val(obj.vehicleSize);
    $("#vehicle_tonnage").val(obj.tonnage);
    //关闭弹出层
    $.closePlus(vehiceleDialog);
};

$("#updateVehicle").live("click",function(){
	var vehicleId = $("#vehicleId").val();
	 window.self.location="shang/toUpdateVehicle.do?vehicle.id=" + vehicleId;
});