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
						/*var before = $("li").filter("."+value).filter(".checked")[0].innerHTML;
						if(before==content){
							return false;
						}*/
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
						//$(this).parents(".box").next().find("input").val("");
					}
				});
				
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.alertPlus("服务忙，请稍后再试",8,"提示");
		}
	});
	
	
	$("#sureSubmit").live("click",function(){
		if($("#question").valid()){
			var option = {
				url:"saveQuestionList.do",
				type:"post",
				success:function(data){
					
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.alertPlus("服务忙，请稍后再试",8,"提示");
				}
			}
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

