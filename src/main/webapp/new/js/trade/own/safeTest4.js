$(function(){
	var modifyMsg=$("#chossePhone").val();
	$("#checkEmail").live("click",function(){
	/*	var bashPath=$("#bpath").val();*/
		//如果正确跳转到相应的位置,如果msg==手机验证跳转到手机页面，如果为邮箱验证跳转到邮箱页面，如果为密保问题跳转到密保页面
		if(modifyMsg=="手机号"){
			/*window.open(bashPath+"../owncenter.do?menuType=5100&mfUrl=modifyPhone.do");*/
			window.location.href="modifyPhone.do";
		}else if(modifyMsg=="密保问题"){
			window.location.href="questionAnswerIndex.do";
		}else{
			window.location.href="modifyEmail.do";
		}
	});
	//通过邮箱验证失败的时候
	$(".failChange").live("click",function(){
		if(modifyMsg=="手机号"){
			window.location.href="bindPhone.do";
		}else if(modifyMsg=="密保问题"){
			window.location.href="setQuestionManager.do";
		}else{
			window.location.href="emailCheck.do";
		}
	});
});
