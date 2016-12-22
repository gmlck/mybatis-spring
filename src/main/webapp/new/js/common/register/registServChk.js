/**
 * jquery.validate ajax服务端验证
 * @author lijianwei
 */
jQuery.validator.addMethod("isExistName",function(value,element){
	result = false;
	$.ajax({
		url:"checkName.do",
		type:"post",
		async:false,
		data:{"fieldValue":value},
		success:function(data){
			result = data.exist;
		},
		error:function(data){
			result = data.exist;
		}
	});
	return this.optional(element) || result;
},"此用户名已被使用,请更换其它用户名!");


/**
 * 验证手机
 * @param {Object} value
 * @param {Object} element
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
jQuery.validator.addMethod("isRegisterMobile",function(value,element){
	var length = value.length;
	var mobile = /(^(13|14|15|18)\d{9}$)/;
	var isPass = false;
	if(length == 11 && mobile.test(value)){
		isPass = true;
//		$("#getValidateCode").removeAttr("disabled").focus();
//		$("#phoneValidateCode").val("").removeAttr("disabled");
	}
//	else{
//		$("#getValidateCode").attr("disabled","disabled");
//		$("#phoneValidateCode").attr("disabled","disabled");
//	}
	return this.optional(element) || isPass;
},"请正确填写您的手机号码!")


//字符验证
jQuery.validator.addMethod("validateCodeCheckRegister", function(value, element) {
	var isPass = false;
	if(/^[\w\d]{4}$/.test(value)){
		isPass = true;
		//$("#doValidatePhoneCode").removeAttr("disabled");
	}
//	else{
		//$("#doValidatePhoneCode").attr("disabled","disabled");
//	}
	return this.optional(element) || isPass;
}, "只能输入4位英文字母或数字");

//字符验证
jQuery.validator.addMethod("isValidPassed", function(value, element) {
	var isPass = false;
	var isValidPassed = $("#isValidPassed").val();
	if(isValidPassed=="1"){
		isPass = true;
	}
	return this.optional(element) || isPass;
}, "请进行手机验证码认证!");

//字符验证
jQuery.validator.addMethod("registerCompanyName", function(value, element) {
	var isPass = false;
	var reg = /^[\u4e00-\u9fa5\uff08\uff09\u0028\u0029]{4,30}$/;
	if(reg.test(value))
		isPass = true;
	return this.optional(element) || isPass;
}, "只能输入4到30个中文!!");

//字符验证
jQuery.validator.addMethod("checkPhoneEixsts", function(value, element) {
	var isPass = false;
	$.ajax({
		url:"checkPhoneExists.do",
		type:"post",
		async:false,
		data:{"fieldValue":value},
		success:function(data){
			isPass = data.exist;
		},
		error:function(data){
			isPass = data.exist;
		}
	});
	return this.optional(element) || isPass;
}, "此手机号已被注册,请用其他手机号!");

//字符验证
jQuery.validator.addMethod("checkPhoneCode", function(value, element,param) {
	var isPass = false;
	var phoneNum = $("#"+param).val();
	$.ajax({
		url:"checkPhoneValidateCode.do",
		type:"post",
		data:{"infoBackPwd.validateCode":phoneNum+value},
		cache:false,
		async:false,
		success:function(data){
			if( data.infoBackPwd.validateState==1){
				isPass = true;
			}
		}
	})
	return this.optional(element) || isPass;
}, "验证码不正确!");

