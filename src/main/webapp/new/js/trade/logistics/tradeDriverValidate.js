//初始化
$(document).ready(function(){
	var senderAddress = {
	        id : "senderAddressSelect", //要使用弹出层选择省市区功能的input文本框ID
	        countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
	        isShowProvince : false, //选择省份后是显示到文本框
	        isShowCity : true, //选择城市后是否立即显示到文本框
	        proId : $("#senderProvinceId"),
	        proName : $("#senderProvince"),
	        cityId : $("#senderCityId"),
	        cityName : $("#senderCity"),
	        countyId : $("#senderCountyId"),
	        countyName : $("#senderCounty"),
	        proUrl : "/common/queryProvince.do", //获取省份数据的访问地址
	        cityUrl : "/common/queryCities.do", //获取城市数据的访问地址
	        countyUrl : "/common/queryCounties.do", //获取区县数据的访问地址
	        countyByCityUrl : "/common/queryCountyByCity.do" //根据城市ID获取区县的访问地址 
	    };
	    new $.district(senderAddress).init();
	    
		var connectionAddress = {
		        id : "connectionAddressSelect", //要使用弹出层选择省市区功能的input文本框ID
		        countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
		        isShowProvince : false, //选择省份后是显示到文本框
		        isShowCity : true, //选择城市后是否立即显示到文本框
		        proId : $("#connectionProvinceId"),
		        proName : $("#connectionProvince"),
		        cityId : $("#connectionCityId"),
		        cityName : $("#connectionCity"),
		        countyId : $("#connectionCountyId"),
		        countyName : $("#connectionCounty"),
		        proUrl : "/common/queryProvince.do", //获取省份数据的访问地址
		        cityUrl : "/common/queryCities.do", //获取城市数据的访问地址
		        countyUrl : "/common/queryCounties.do", //获取区县数据的访问地址
		        countyByCityUrl : "/common/queryCountyByCity.do" //根据城市ID获取区县的访问地址 
		    };
		    new $.district(connectionAddress).init();
	trigger();
	checkDriver();
})
//校验规则
function checkDriver(){
    
    $("#tradeDriverForm").validate({ 
    	groups: {
			driverContact: "driver.mobilePhone driver.fixedPhone"
    	},
        rules:{ 
    		//姓名
    		'driver.driverName':{
    			required:true,
    			maxlength:30,
    			toFilter:true
    		},
    		//身份证号
    		'driver.identityNo':{
    			required:true,
    			checkCard:true,
    			isCard:true
    		},
    		//档案号
            'driver.filesNo':{
    			filesNo:true,
    			charAndNum:true,
    			maxlength:30,
    			toFilter:true
    		},
    		//驾龄
            'driver.age':{
    			checkAge:true,
    			required:true
    		},
    		//性质
    		'driver.driverNature':{
    			required:true
    		},
    		//手机号码
    		'driver.mobilePhone':{
    			require_from_group: [1,".driverContact"],
    			mobile:true
    		},
    		//固定电话
    		'driver.fixedPhone':{
    			require_from_group: [1,".driverContact"],
    			tel:true
    		},
    		//邮箱地址
    		'driver.email':{
    			emailReg:true,
    			maxlength:30
    		},
    		//QQ号码
            'driver.qq':{
    			QQ:true
    		},
    		//msn
    		'driver.email':{
    			emailReg:true,
    			maxlength:30
    		},
    		//备注
    		'driver.remarks':{
    			rangelength: [2, 60],
    			toFilter: true
    		},
    		"senderAddressSelect" : {
	            required : true,
	            toFilter: true
	        },
    		//详细地址
    		'driver.allAddress':{
    			required:true,
    			rangelength: [2, 60],
    			toFilter:true
    		},
    		'driver.connection.name':{
    			maxlength:30,
    			toFilter:true
    		},
    		'driver.connection.mobilePhone':{
    			mobile: true
    		},
    		'driver.connection.fixedPhone':{
    			tel: true
    		},
    		'driver.connection.allAddress':{
    			rangelength: [2, 60],
    			toFilter:true
    		},
    		'driver.connection.faxNum':{
    			tel:true
    		},
    		'driver.connection.areaCode':{
    			pattern:true
    		},
    		'driver.connection.qq':{
    			QQ:true
    		},
    		'driver.company.companyCode':{
    			companyCode:true
    		 },
    		 'driver.connection.email':{
    			 email:true,
    			 toFilter: true,
    			 maxlength: 30 
    		 }
        },
        
         messages:{ 
            'driver.driverName':{
    			required:"请输入司机名称",
    			maxlength:"司机名称最多只能输入{0}个字符",
    			toFilter:"司机名称不能包含特殊字符"
    		},
    		'driver.birthday':{
    			required:"请输入出生日期"
    		},
    		'driver.identityNo':{
    			required:"请输入身份证号",
    			isCard:"请输入正确的身份证号"
    		},
    		'driver.eduLevel':{
    			required:"请选择文化程度"
    		},
            'driver.filesNo': {  
    			maxlength:"档案号最多只能输入{0}个字符",
                toFilter:"档案号不能包含特殊字符"
            },
            'driver.age':{
    			required:"请输入驾龄"
    		},
    		//性质
    		'driver.driverNature':{
    			required:"请选择司机性质"
    		},
    		'driver.mobilePhone':{
    			require_from_group: "手机和固话请至少填一项",
    			mobile:"请输入正确的手机号码"
    		},
    		'driver.fixedPhone':{
    			require_from_group: "手机和固话请至少填一项",
    			tel:"请输入正确的固定电话"
    		},
    		'driver.email':{
    			emailReg:"请输入正确的邮箱地址",
    			maxlength:"邮箱地址长度最长为{0}"
    		},
    		'driver.msn':{
    			emailReg:"请输入正确的MSN地址",
    			maxlength:"MSN地址长度最长为{0}"
    		},
    		"senderAddressSelect" : {
	            required : "请选择省市区",
	            toFilter: "请选择正确的省市区"
	        },
    		'driver.allAddress':{
    			required:"请输入详细地址",
    			rangelength:"请填写正确的详细地址，长度为{0}-{1}个字符",
    			toFilter:"详细地址里不能包含特殊字符"
    		},
    		'driver.remarks':{
    			rangelength:"请填写正确的备注，长度为{0}-{1}个字符",
    		},
    		'driver.connection.mobilePhone':"请输入有效的手机号",
			'driver.connection.fixedPhone':"请输入正确的的固定电话号码",
			'driver.connection.faxNum':{
				tel:"请输入有效的传真号码"},
			'driver.connection.qq':{QQ:"请输入5-11位有效的QQ号码"},
			'driver.connection.allAddress':{
				rangelength:"请输入地址,长度为{0}-{1}个字符",
				toFilter:"联系人地址不能包含特殊字符"
			},
			'driver.connection.email':{
				email:"请输入正确的邮件地址",
				toFilter: "邮件地址不能包含特殊字符",
				maxlength: "邮件的最大长度不超过30"
			},
			'driver.connection.name':{
				maxlength:"姓名最大长度为{0}个字符",
				toFilter:"姓名不能包含特殊字符"
			}
        }       
    }); 
    
     // 司机档案号重复验证
    jQuery.validator.addMethod("filesNo", function(value, element) {  
       //司机id
       var driverId = $("#driverId").val();
       result = false;
        $.ajax({
            url:"shang/checkTradeDriver.do",
            type:"post",
            data:{
        		"driver.filesNo":value,
        		"driver.driverId":driverId
        	},
            async:false,
            success:function(data){
                if (data.msg = "success") {
                	result = true;
				}else{
					result = false;
				}
            },
            error:function(data){
                result = false;
            }
        })
        return this.optional(element) || result;
    },"司机档案号重复");
    
    // 司机身份证号重复验证
    jQuery.validator.addMethod("checkCard", function(value, element) {  
       //司机id
       var driverId = $("#driverId").val();
       result = false;
        $.ajax({
            url:"shang/checkTradeDriver.do",
            type:"post",
            data:{
        		"driver.identityNo":value,
        		"driver.driverId":driverId
        	},
            async:false,
            success:function(data){
        		if (data.msg == "success") {
                	result = true;
				}else{
					result = false;
				}
            },
            error:function(data){
                result = false;
            }
        })
        return this.optional(element) || result;
    },"司机身份证号重复");
    
    // 司机驾驶年龄判断
    jQuery.validator.addMethod("checkAge", function(value, element) {  
        var result;
    	//身份证号
        var idCardBirth = $("#identityNo").val();
    	//当前系统时间
    	var nowDate = new Date();
    	var nowYear = nowDate.getFullYear();
        
        if($("#identityNo").valid()){
        	//出生年份转数字
            var year = parseFloat(idCardBirth.substring(6,10));
            //得到结果差
            var chaYear = nowYear-(year+18);
            var value = parseFloat(value);
            if(value > chaYear){
            	result = false;
            }else {
				result = true;
			}
        } 
        return this.optional(element) || result;
    },"司机驾龄和年龄不符合！");
}

//页面加载完之后执行判断
function trigger(){
    var driverId = $("#driverId").val();
    if("" == driverId){
   	 $(".driverNature").find("li").eq(1).trigger("click");
    };
}