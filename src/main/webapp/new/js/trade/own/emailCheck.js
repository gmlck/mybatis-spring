
$("#checkEmail").live("click",function(){
	var email=$("#email").val();
	window.location.href="sendMail.do?email="+email;
	
});
