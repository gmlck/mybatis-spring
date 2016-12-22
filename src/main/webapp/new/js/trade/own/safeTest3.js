$(function(){
	$("#checkSafeAnswer").live("click",function(){
		var safeAnswer=$("#safeAnswer").val();
		var newSafeAnswer=$("#newSafeAnswer").val();
		var modifyMsg=$("#chossePhone").val();
		if(safeAnswer==newSafeAnswer){
			//如果正确跳转到相应的位置,如果msg==手机验证跳转到手机页面，如果为邮箱验证跳转到邮箱页面，如果为密保问题跳转到密保页面
			if(modifyMsg=="手机号"){
				window.location.href="modifyPhone.do";
			}else if(modifyMsg=="密保问题"){
				window.location.href="questionAnswerIndex.do";
			}else{
				window.location.href="modifyEmail.do";
			}
		}else{
			/*$.alertPlus("您输入的密保不正确，请重新输入！","2","提示");*/
			layer.alert("您输入的密保不正确，请重新输入！","2","提示");
		}
	});
	
});