jQuery.validator.addMethod("tradePasswordCheck",function(value,element){
	var result;
	var password = $("#currentPassword").val();
	if(password==null||password==""){
		return true;
	}
	$.ajax({
			url:"checkTradePassword.do",
			type:"post",
			data:{"password":password},
			dataType:"json",
			async: false,
			success:function(data){
				if(data.msg=="check"){
					result =  true;
				}else{
					result =  false;
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown)
			{
				$.alertPlus("服务忙，请稍后再试",8,"提示");
			} 
		});
		return result;
	
},"原始登录密码不正确");

$("#passwordCheck").validate({
	onkeyup :false,
	rules:{
		"password":{
			tradePasswordCheck:true,
			required:true
		},
		"newPassword":{
			required:true,
			minlength: 6
		},
		"sureNewPassword":{
			required:true,
			minlength: 6,
			equalTo: "#newPassword"
		}
	},
	messages:{
		"password":{
			required:"原始登录密码不能为空"
		},
		"newPassword":{
			required:"新密码不能为空",
			minlength: "密码长度不能少于6位"
		},
		"sureNewPassword":{
			required:"新密码不能为空",
			minlength: "密码长度不能少于6位",
			equalTo: "两次密码不一致，请重新输入"
		}
	}
});

$("#modifyPwd").live("click",function(){
	if($("#passwordCheck").valid()){
		var option = {
				url: "updateTradePassword.do",
				type: "post",
				dataType: "json",
				async: false,
				success: function(data){
					if(data.msg == 'success'){
						/*$.alertPlus("修改成功！", 1, "提示");*/
						layer.alert("修改成功！",1,"提示",function(index){
							$.closePlus(index);
							/*var basePath = $("#basePath").val();
							var url =basePath+"my/owncenter.do?menuType=5100&mfUrl=initAccountMessage.do";*/
							
							var ourDomain = window.location.host;
							ourDomain = ourDomain.split(".").length == 2 ? ourDomain : ourDomain.substring(ourDomain.indexOf(".") + 1, ourDomain.length);
							window.open("http://my." + ourDomain + "/my/owncenter.do?menuType=5100&mfUrl=initAccountMessage.do");
							//window.open(url);
						});
						//location.href = "initAccountMessage.do";
					} else{
						layer.alert(data.msg, 2, "提示");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown) {
					layer.alert("操作出错！", 2, "提示");
				}
		};	
		$("#passwordCheck").ajaxSubmit(option);
	}
});
