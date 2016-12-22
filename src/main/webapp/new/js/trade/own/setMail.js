//校验邮箱唯一性
jQuery.validator.addMethod("checkEmailOne",function(value,element){
	var result = false;
	$.ajax({
		url:"checkEmailOne.do",
		type:"post",
		data:{"email":value},
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess=="1"){
				result = false;
			}else{
				result = true;
			}
		}
	});
	return this.optional(element) || result;
}, "邮箱已经存在，请重新输入!");

$("#saveEmail").live("click",function(){
	if(!$("#checkEmail").valid()){
		return false;
	}
	var option = {
		url:"saveEamil.do",
		type:"post",
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess==1){
				layer.alert(data.msg,1,"提示",function(index){
					$.closePlus(index);
					/*var basePath = $("#basePath").val();
					var url =basePath+"my/owncenter.do?menuType=5100&mfUrl=initAccountMessage.do";
					window.open(url);*/
					
					
					var ourDomain = window.location.host;
					ourDomain = ourDomain.split(".").length == 2 ? ourDomain : ourDomain.substring(ourDomain.indexOf(".") + 1, ourDomain.length);
					window.open("http://my." + ourDomain + "/my/owncenter.do?menuType=5100&mfUrl=initAccountMessage.do");
					
					//window.location.href="initAccountMessage.do";
				});
			}else{
				layer.alert(data.msg,"2","提示");
			}
		}
	};
	$("#checkEmail").ajaxSubmit(option);
});

$("#checkEmail").validate({
	rules:{
		"email":{
			maxlength:30,
			isEmail: true,
			required:true,
			checkEmailOne:true
		}
	},
	messages:{
		"email":{
			maxlength:"输入的最大长度为30个字符!",
			required:"请输入邮箱!"
		}
	}
});