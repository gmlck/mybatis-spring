//验证手机是否重复
jQuery.validator.addMethod("checkMobilePhone", function(value, element) {
	var result = false;
	$.ajax({
		url:"../info/checkConfrimPhone.do",
		type:"post",
		data:{"mobilePhone":value},
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess == "1"){
				result = true;
			}
			$("#checkResult").val(data.isSuccess);
		}
	});
	return this.optional(element) || result;
}, "该手机已被使用,请更换手机号码!");

$(document).ready(function(){
	$("#phoneForm").validate({
		rules:{
			"mobilePhone":{
				required:true,
				isMobile:true,
				checkMobilePhone:true
			},
			"validateCode":{
				required:true,
				validateCodeCheck:true
			}
		},
		messages:{
			"mobilePhone":{
				required:"手机号不能为空!"
			},
			"validateCode":{
				required:"验证码不能为空!"
			}
		},
		submitHandler:function(form){
			$(form).ajaxSubmit({
				url:"../info/doConfrimPhone.do",
				type:"post",
				cache:false,
				async:false,
				success:function(data){
					if(data.isSuccess == "1"){
						//禁用获取短信的密码
						clearInterval(timeOut);
						$("#getValidateCode").removeClass("btn_full_yellow").addClass("btn_forbidden").val("获取验证码").removeAttr("style");
						/*$.alertPlus("修改成功!",1,"提示");*/
						layer.alert("修改成功!",1,"提示",function(index){
							$.closePlus(index);
							/*window.location.href="initAccountMessage.do";*/
							/*var basePath = $("#basePath").val();
							var url =basePath+"my/owncenter.do?menuType=5100&mfUrl=basicInfo.do?tabId=0&menuIndex=1";
							window.open(url);*/
							
							var ourDomain = window.location.host;
							ourDomain = ourDomain.split(".").length == 2 ? ourDomain : ourDomain.substring(ourDomain.indexOf(".") + 1, ourDomain.length);
							window.open("http://my." + ourDomain + "/my/owncenter.do?menuType=5100&mfUrl=basicInfo.do?tabId=0&menuIndex=1");
						});
					}else{
						/*$.alertPlus(data.msg,"2","提示");*/
						layer.alert(data.msg,"2","提示");
						//"验证不通过,请重新进行验证!"
						$("#mobilePhone").removeAttr("readonly").removeClass("text_disenable");
						$("#phoneValidateCode").removeAttr("readonly","readonly").removeClass("text_disenable");
						$("#doValidatePhoneCode").removeAttr("disabled").addClass("btn_full_yellow").removeClass("btn_forbidden").removeAttr("style");
					}
				}
			});
		}
	});
});

var timeOut;
//发送短信验证码
function sendPhoneCode(){
	var phoneNum = $("#mobilePhone").val();
	if(!/(^(13|14|15|18)\d{9}$)/.test(phoneNum)){
		/*$.alertPlus("请正确输入手机号!","2","提示");*/
		layer.alert("请正确输入手机号!","2","提示");
		return;
	}
	//如果已经注册了是不能发验证码的？
	/*var phoneError = $("#mobilePhone").parents("td").find("label.error:visible");
	if(phoneError!=undefined && phoneError.length>0){
		$.alertPlus("手机号码已被使用,不能发送验证码!",2,"提示");
		return;
	}
	
	$("#getValidateCode").removeClass("btn_full_yellow").addClass("btn_forbidden");
	$("#getValidateCode").attr("disabled","disabled").attr("style","width:140px");*/
	var time = 60;
	$("#getValidateCode").val(time+"秒后可以重新发送");
	timeOut = setInterval(function(){
		--time;
		$("#getValidateCode").val(time+"秒后可以重新发送");
		if(time<=0){
			$("#getValidateCode").removeClass("btn_forbidden").addClass("btn_full_yellow");
			$("#getValidateCode").removeAttr("disabled").removeAttr("style").val("获取验证码");
			clearInterval(timeOut);
		}
	},1000);
	
	$.ajax({
		url:"../sendPhoneCode.do",
		type:"post",
		data:{"mobilePhone":phoneNum},
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess==1){
				/*$.alertPlus(data.msg,"1","提示");*/
				layer.alert(data.msg,"1","提示");
			}else{
				$("#getValidateCode").removeClass("btn_forbidden").addClass("btn_full_yellow");
				$("#getValidateCode").removeAttr("disabled").removeAttr("style").val("获取验证码");
				clearInterval(timeOut);
				/*$.alertPlus(data.msg,"2","提示");*/
				layer.alert(data.msg,"2","提示");
			}
		}
	});
}