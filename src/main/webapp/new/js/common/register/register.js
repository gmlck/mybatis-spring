$(document).ready(function (base){
	$("#p_registerForm").validate({
		onkeyup:false,
		rules: {
			'user.userName': {
				required: true,
				userNameCheck: true,
				isExistName:true
			},
			'user.password': {
				required: true,
				rangelength: [6, 20]
			},
			'passwordAgain': {
				required: true,
				rangelength: [6, 20],
				equalTo: '#p_user_password'
			},
			'user.infoPersonal.mobilePhone': {
				required: true,
				isMobile: true,
				checkPhoneEixsts:true
			},
			"phoneValidateCode":{
				required: true,
				validateCodeCheckRegister:true,
				checkPhoneCode:'p_mobilePhone'
			}
		},
		messages: {
			'user.userName': {
				required: "请输入用户名"
			},
			'user.password': {
				required: "请输入密码",
				rangelength: "密码长度为6-20位"
			},
			'passwordAgain': {
				required: "请再次输入密码",
				rangelength: "密码长度为6-20位",
				equalTo: "两次输入密码不相同"
			},
			'user.infoPersonal.mobilePhone': {
				required: "请输入手机号码",
				isMobile: "请输入有效的手机号码"
			},
			"phoneValidateCode":{
				required: "请输入手机验证码!"
			}
		},
		errorPlacement:function(error,element){
			$(element).parents(".box_text").find(".hint").removeClass("no2").addClass("no1").text("").append($("<div class='arrows'></div>")).append(error.text());
			$(element).parents(".box_text").find(".jquery_valid_error").append(error);
		},
		success:function(label){
			var currBox = $(label).parents(".box_text");
			currBox.find(".hint").removeClass("no1").addClass("no2").text("").append($("<div class='arrows'></div>")).append(currBox.find(".success_tip").text());
			label.remove();
		},
		submitHandler: function(form) { 
			$("#p_register").attr("disabled","disabled").removeClass("btn_yellow").addClass("btn_gray");
			var phoneNum = $("#p_mobilePhone").val();
			var vc = $("#p_phoneValidateCode").val();
			$("#p_registerForm").ajaxSubmit( {
				url : "register.do",
				type : "post",
				data:{"infoBackPwd.validateCode":phoneNum+vc},
				cache : false,
				async:false,
				success : function(data) {
					if (data.exist) {
						$.confirmPlus("去登陆啦", function(index){
					        $.closePlus(index);
					        location.href = "toLoginPage.do";
					    }, data.msg, function(index){
					        $.closePlus(index);
					    });
						
					} else {
						layer.alert(data.msg,2,"提示");
						$("#p_register").removeAttr("disabled").removeClass("btn_gray_h38").addClass("btn_yellow");;
					}
				}
			});
		},
		invalidHandler: function(form, validator) {  //不通过回调
			return false;
		}
	});

	

});

function agreeDeal(chk,pre){
	if($(chk).attr("checked")){
		$("#"+pre+"_register").removeAttr("disabled").removeClass("btn_gray_h38").addClass("btn_yellow");
	}else{
		$("#"+pre+"_register").attr("disabled","disabled").removeClass("btn_yellow").addClass("btn_gray_h38");
	}
}





var nodeLayerBid;
function dealTerms(){
	try{
		nodeLayerBid = $.layer({
			type : 1,
			title : '《短信服务平台条款》',
			fix : false,
			offset:['200px' , '450px'],
			area : ['640','460'],
			shadeClose : false,
			page : {dom : '#dealTermsDiv'}
		});
	}catch(e){
		layer.alert(e);
	}
}

function readOver(){
	$.closePlus(nodeLayerBid);
}
