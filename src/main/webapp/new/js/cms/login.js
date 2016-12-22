$("#valdiateImg").live("click", function() {
	$("#valdiateImgSelect").click();
});

// 输入框获取光标事件
$("#userName").focus(function() {
	if ($(this).val() == '请输入用户名或手机号') {
		$(this).val('');
	}
});

$("#userName").focusout(function() {
	if ($(this).val() == '') {
		$(this).val('请输入用户名或手机号');
	}
});
$("#userName").focus();

// 记住账号
function remember1(thisChk) {
	if ($(thisChk).attr("checked")) {
		$("#remeberName").attr("checked", "checked");
	}
}

// 忘记密码操作
function backpwd() {
	window.location.href = "backPwdStepOne.do?user.userName="
			+ $("#userName").val();
}

$("#loginForm").validate({
	rules : {
		'user.userName' : {
			userNameRequired : true,
			maxlength : 60,
			stringCheck : true
		},
		'user.password' : {
			required : true,
			maxlength : 20
		},
		"validateCode" : {
			required : true,
			validateCodeCheck : true,
			maxlength : 4
		}
	},
	messages : {
		'user.userName' : {
			required : "请输入用户名!",
			maxlength : "输入超长!"
		},
		'user.password' : {
			required : "请输入密码!",
			maxlength : "输入超长!"
		},
		"validateCode" : {
			required : "请输入验证码!",
			maxlength : "请输入四位合格验证码"
		}
	},
	errorPlacement : function(error, element) {
		$($(element).parents("div")[0]).append(error);
	},
	success : function(label) {
		label.remove();
	},
	submitHandler : function(form) {
		if ($("#loginBtn").attr("disabled")) {
			return;
		}
		$("#loginBtn").attr("disabled", "disabled");
		$("#loginForm").ajaxSubmit({
			url : "login.do",
			type : "post",
			cache : false,
			dataType : "json", // 增加数据类型 邓夫伟 2013-12-24
			success : function(data) {
				if (data.isLogin == "0") {
					layer.alert(data.msg, 2, "提示");
					$("#loginBtn").removeAttr("disabled");
					$("#validateCode").val("");
					$("#valdiateImg").click();
				} else {
					var nextUrl = $("#nextUrl").val();
					if (nextUrl) {
						nextUrl = decodeURIComponent(nextUrl);
						window.location.href = nextUrl;
					}
				}
				$("#loginBtn").removeAttr("disabled");
			},
			// 增加error处理 邓夫伟 2013-12-24
			error : function(err) {
				layer.alert("登录操作出错，请刷新再试或者联系4008560100！", 2, "提示");
			}
		});
	}
});