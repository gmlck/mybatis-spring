var timeOut;
$(function(){
	timeTrigger();
});

//发送短信验证码
function sendPhoneCode(){
	var phoneNum = $("#mobilePhone").val();	
	/*$("#getValidateCode").removeClass("btn_full_yellow").addClass("btn_forbidden");
	$("#getValidateCode").attr("disabled","disabled").attr("style","width:140px");*/
	
	$("#getValidateCode").removeClass("btn_gray_h30").addClass("btn_forbidden");
	$("#getValidateCode").attr("disabled","disabled").attr("style","width:140px");
	timeTrigger();
	$.ajax({
		url:"../phoneCode.do",
		type:"post",
		data:{"mobilePhone":phoneNum},
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess==1){
				/*$.alertPlus(data.msg,1,"提示");*/
				layer.alert(data.msg,1,"提示");
			}else{
				/*$("#getValidateCode").removeClass("btn_forbidden").addClass("btn_full_yellow");*/
				$("#getValidateCode").removeAttr("disabled").removeAttr("style").val("获取验证码");
				clearInterval(timeOut);
				/*$.alertPlus(data.msg,"2","提示");*/
				layer.alert(data.msg,2,"提示");
			}
		}
	});
}

//时间触发器
function timeTrigger(){
	//发送短信验证码
	var time = 60;
	$("#getValidateCode").val(time+"秒后可以重新发送");
	timeOut = setInterval(function(){
		--time;
		$("#getValidateCode").val(time+"秒后可以重新发送");
		if(time<=0){
/*			$("#getValidateCode").removeClass("btn_forbidden").addClass("btn_full_yellow");
*/			$("#getValidateCode").removeAttr("disabled").removeAttr("style").val("获取验证码");
			clearInterval(timeOut);
		}
	},1000);
}

//检查验证码是否正确
$("#checkPhoneCode").live("click",function(){
	var validateCode=$("#validateCode").val();
	if(validateCode==""){
		/*$.alertPlus("验证码不能为空！","2","提示");*/
		layer.alert("验证码不能为空！","2","提示");
		return false;
	}
	var phoneNum = $("#mobilePhone").val();
	var modifyMsg=$("#chossePhone").val();
	$.ajax({
		url:"checkPhoneCode.do",
		type:"post",
		data:{"validateCode":validateCode,"mobilePhone":phoneNum},
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess==1){
				//$.alertPlus(data.msg,"1","提示");
				//如果正确跳转到相应的位置,如果msg==手机验证跳转到手机页面，如果为邮箱验证跳转到邮箱页面，如果为密保问题跳转到密保页面
				if(modifyMsg=="手机号"){
					window.location.href="modifyPhone.do";
				}else if(modifyMsg=="密保问题"){
					window.location.href="questionAnswerIndex.do";
				}else{
					window.location.href="setEmail.do";
				}
			}else{
/*				$("#getValidateCode").removeClass("btn_forbidden").addClass("btn_full_yellow");
*/				$("#getValidateCode").removeAttr("disabled").removeAttr("style").val("获取验证码");
				clearInterval(timeOut);
				/*$.alertPlus(data.msg,"2","提示");*/
				layer.alert(data.msg,"2","提示");
			}
		}
	});
});