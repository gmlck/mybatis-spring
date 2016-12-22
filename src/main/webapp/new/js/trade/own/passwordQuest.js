$(function(){
	$.ajax({
		url:"questionList.do",
		dataType:"json",
		type:"post",
		success:function(data){
				var list = data.defaultList;
				$.each(list,function(i,item){
					$(".questionF").append("<li class="+i+" value="+i+">"+item.safeQuestion+"</li>");
				});
				$("ul li").live("click",function(){
					var value = $(this).val();
					var content = $(this).text();
					if($("."+value).hasClass("checked")){
						var list = $("span").filter(".result");
						var num = 0;
						$.each(list,function(i,item){
							if(item.innerHTML==content){
								num++;
							}
						});
						if(num==1){
							return false;
						}
						layer.alert("不能选相同的问题",2);
						$(this).parent().find(".checked").removeClass("checked");
						$(this).parent().prev().text("--请选择一个问题--");
						$(this).parents(".box").next().find("input").val("");
						$(this).parents(".spinner").next(".myQuestion").val("");
					}else{
						$(this).parent().find("li").removeClass("checked");
						$(this).addClass("checked");
						$(this).parents(".spinner").next(".myQuestion").val(content);
					}
				});
				
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.alertPlus("服务忙，请稍后再试",8,"提示");
		}
	});
		

	$("#sureSubmit").live("click",function(){
		//判断一下生日
		var myQuestionOne=$("#myQuestionOne").val();
		var safeAnswerOne=$("#safeAnswerOne").val();
		var myQuestionTwo=$("#myQuestionTwo").val();
		var safeAnswerTwo=$("#safeAnswerTwo").val();
		var myQuestionThree=$("#myQuestionThree").val();
		var safeAnswerThree=$("#safeAnswerThree").val();
		var reg="^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$";
		if(myQuestionOne=="您父亲的生日是？" || myQuestionOne=="您母亲的生日是？" || myQuestionOne=="您配偶的生日是？"){
			if(!safeAnswerOne.match(reg) || safeAnswerOne.length!=10){
				$.alertPlus("您输入的生日格式不正确！正确格式为2014-01-08",2,"提示");
				return false;
			}
		}
		if(myQuestionTwo=="您父亲的生日是？" || myQuestionTwo=="您母亲的生日是？" || myQuestionTwo=="您配偶的生日是？" ){
			if(!safeAnswerTwo.match(reg) || safeAnswerTwo.length!=10){
				$.alertPlus("您输入的生日格式不正确！正确格式为2014-01-08",2,"提示");
				return false;
			}
		}
		if(myQuestionThree=="您父亲的生日是？" || myQuestionThree=="您母亲的生日是？" || myQuestionThree=="您配偶的生日是？"){
			if(!safeAnswerThree.match(reg) || safeAnswerThree.length!=10){
				$.alertPlus("您输入的生日格式不正确！正确格式为2014-01-08",2,"提示");
				return false;
			}
		}
		if($("#question").valid()){
			var option = {
				url:"saveQuestionList.do",
				type:"post",
				success:function(data){
					if(data.msg=="ok"){
						layer.alert("密保设置成功",1,"提示",function(index){
							$.closePlus(index);
						/*	var basePath = $("#basePath").val();
							var url =basePath+"my/owncenter.do?menuType=5100&mfUrl=initAccountMessage.do";
							window.open(url);*/
							
							
							var ourDomain = window.location.host;
							ourDomain = ourDomain.split(".").length == 2 ? ourDomain : ourDomain.substring(ourDomain.indexOf(".") + 1, ourDomain.length);
							window.open("http://my." + ourDomain + "/my/owncenter.do?menuType=5100&mfUrl=initAccountMessage.do");
						});
					/*	$.alertPlus("密保设置成功",1,"提示");
   						window.location.href="initAccountMessage.do";*/
					}else if(data.msg=="error"){
						layer.alert('密保问题设置出错，请稍后再试');
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.alertPlus("服务忙，请稍后再试",8,"提示");
				}
			};
			$("#question").ajaxSubmit(option);
		}else{
			return false;
		}
		
	});

	
});

$("#question").validate({
	onkeyup :false,//由于第一次之后会有默认的按键校验，会往后台发送请求，所以设置为false
	rules:{
		"userSafeList[0].safeAnswer":{
			required:true
		},
		"userSafeList[1].safeAnswer":{
			required:true
		},
		"userSafeList[2].safeAnswer":{
			required:true
		},
		"userSafeList[0].safeQuestion":{
			required:true
		},
		"userSafeList[1].safeQuestion":{
			required:true
		},
		"userSafeList[2].safeQuestion":{
			required:true
		}
	},
	messages:{
		"userSafeList[0].safeAnswer":{
			required: "密保答案不能为空，请填写"
		},
		"userSafeList[1].safeAnswer":{
			required: "密保答案不能为空，请填写"
		},
		"userSafeList[2].safeAnswer":{
			required: "密保答案不能为空，请填写"
		},
		"userSafeList[0].safeQuestion":{
			required:"请选择密保问题"
		},
		"userSafeList[1].safeQuestion":{
			required:"请选择密保问题"
		},
		"userSafeList[2].safeQuestion":{
			required:"请选择密保问题"
		}
	}	
});
//取消
$("#cancleSubmit").live("click",function(){
	window.location.href="initAccountMessage.do";
});


function clearValidateOne(){
   $("#myQuestionOne").valid();
}

function clearValidateTwo(){
  $("#myQuestionTwo").valid();
}
function clearValidateThree(){
	  $("#myQuestionThree").valid();
	}
/*//表单校验
jQuery.validator.addMethod("checkIdentityCode",function(value,element,params){
	var result = false;
	var reg="^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$";
	if(value=="您父亲的生日是？" || value=="您母亲的生日是？" || value=="您配偶的生日是？"){
		if(!safeAnswerOne.match(reg)){
			$.alertPlus("您输入的生日格式不正确！正确格式为YYYY-MM-DD",2,"提示");
			return false;
		}
	}
	return this.optional(element) || result;
}, "您输入的生日格式不正确！正确格式为YYYY-MM-DD!");*/