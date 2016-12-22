$(document).ready(function(){
	checkValidate();
});
//容积计算
$("#vehicleType_length, #vehicleType_width, #vehicleType_height").die().live("change", function() {
    var length = parseFloat($("#vehicleType_length").val());
    var width = parseFloat($("#vehicleType_width").val());
    var height = parseFloat($("#vehicleType_height").val());
    var vol = length * width  * height;
    if(vol && vol > 0){
        $("#vehicleType_vehicleSize").val(vol.toFixed(2));
    }
}); 


function checkValidate(){
    // 校验
    $("#vehicleTypeForm").validate({ 
        rules:{ 
    	 	'veType.vehicleSize':{required:true,max:999999.99},
            'veType.tonnage':"required",
            'veType.length':"required",
            'veType.width':"required",
            'veType.height':"required",
            'veType.code':{
    			required:true,
    			charAndNum:true,
    			maxlength:30,
    			toFilter:true
    		},
    		"veType.shortName":{
    			maxlength:30,
    			toFilter:true
    		},
            'veType.name':{
    			required:true,
    			vehicleTypeName:true,
    			maxlength:30,
    			toFilter:true
    		}
        },
         messages:{ 
        	'veType.vehicleSize':{
				required: "请输入容积！",
				max:"请输入小于999999.99的正数！"
			}, 
            'veType.tonnage':"请输入载重！",
            'veType.length':"请输入长！",
            'veType.width':"请输入宽！",
            'veType.height':"请输入高！",
            'veType.code':{
               required: "请输入车型编码！",
               charAndNum:"车型编码只能包含字母和数字！",
               maxlength:"车型编码最大长度为{0}！",
               toFilter:"车型编码不能包含特殊字符！"
            }, 
            "veType.shortName":{
    			maxlength:"车型简称最大长度为{0}！",
    			toFilter:"车型简称不能包含特殊字符！"
    		},
            'veType.name': {  
               required: "请输入车型名称！",
               maxlength:"车型名称最大长度为{0}！",
               toFilter:"车型名称不能包含特殊字符！"
            }  
        }
    }); 
    
    // 车型名称重复验证   
    jQuery.validator.addMethod("vehicleTypeName", function(value, element) {  
       
       //获取车型的id
       var vehicleTypeId = $("#veTypeId").val();
       result = false;
        $.ajax({
            url:"shang/checkVehicleType.do",
            type:"post",
            data:{
        		"veType.name":value,
        		"veType.id":vehicleTypeId
        	},
            async:false,
            success:function(data){
                if (data.msg == "success") {
					result = true;
				}else {
					result = false;
				}
            },
            error:function(data){
                result = false;
            }
        })
        return this.optional(element) || result;
    },"车型名称重复");
  
}

//保存车型数据
$("#saveVehicleType").live("click",function(){
	if(!$("#vehicleTypeForm").valid()){
        return false;
    }
	//空格处理
    $("#vehicleTypeForm").find("input").each(function() {
        $(this).val($.trim($(this).val()));
    });
	//处理金额数据
	$(".numInput").each(function(){
		$(this).val(NumInput.getValue($(this)));
	});
	var veTypeId = $("#veTypeId").val();
	var url;
	if(veTypeId == ""){
		url = "shang/addVehicleType.do";
	}else {
		url = "shang/updateVehicleType.do";
	};
    var options = {
            url:url,
            type:"post",
            cache : false,
            async:true,
            beforeSend: function(){
				$("#saveVehicleType").attr("disabled","disabled");
			},
            success:function(data){
       	  	if("success" == data.msg){
       	  		$.alertPlus("操作成功", 1, "提示");
       	  		window.self.location = 'shang/toVehicleTypeIndex.do';
       	  	}else {
       	  		$.alertPlus(data.msg, 2, "提示")
                $("#saveVehicleType").removeAttr("disabled","disabled");
   			}
         	},
           error:function(XMLHttpRequest, textStatus, errorThrown) {
                $.alertPlus("网络繁忙，稍后再试", 8, "提示")
                $("#saveVehicleType").removeAttr("disabled","disabled");
            }   
         };
         $("#vehicleTypeForm").ajaxSubmit(options);
});

/**
 * 取消录入操作
 */
$("#cancelVehicleType").live("click", function(){
	$.confirmPlus("是否确定取消录入!", function(index){
		history.go(-1);
		$.closePlus(index);
	}, "确认取消录入", function(index){
		$.closePlus(index);
	});
});




