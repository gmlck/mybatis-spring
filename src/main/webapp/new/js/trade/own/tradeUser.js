$(function(){
	//修改密保
	$(".setQuestionManager").live("click",function(){
		/*window.location.href="setQuestionManager.do";*/
		window.open("setQuestionManager.do");
	});
	//设置密保
	$(".modifyQuestionManager").live("click",function(){
		/*window.location.href="questionAnswerIndex.do";*/
		window.open("questionAnswerIndex.do");
	});
	//修改密码
	$(".updatePassWord").live("click",function(){
		/*window.location.href="modifyTradePassword.do";*/
		window.open("modifyTradePassword.do");
		
	});
	//绑定手机号setPhone
	$(".bindPhone").live("click",function(){
		/*window.location.href="bindPhone.do";*/
		window.open("bindPhone.do");
		
	});
	//设置手机号
	$(".setPhone").live("click",function(){
		/*window.location.href="modifyPhone.do";*/
		window.open("modifyPhone.do");
		
	});
	//修改邮箱
	$(".checkEmail").live("click",function(){
		/*window.location.href="emailCheck.do";*/
		window.open("emailCheck.do");
	});
	//设置邮箱
	$(".setEmail").live("click",function(){
		/*window.location.href="setEmail.do";*/
		window.open("setEmail.do");
	});
	//身份验证
	$(".checkIdentity").live("click",function(){
		window.location.href="basicInfo.do?tabId=2";
	});
	//实名认证
	$(".confirmName").live("click",function(){
		window.location.href="basicInfo.do?tabId=2";
	});
	//更换头像
	$(".replacePicture").live("click",function(){
		window.location.href="basicInfo.do?tabId=1";
	});
});