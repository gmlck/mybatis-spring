//退出
function logout(){
	var basePath = $("#basePath").val();
	basePath = basePath==undefined ? "" :basePath;
	$.ajax({
		url : "logout.do",
		type : "post",
		success : function(data) {
			/*var nextUrl = $("#logoutNextUrl");
			if (nextUrl == null || nextUrl == undefined || nextUrl.val() == "" || nextUrl.length <= 0) {
				$("#logoutstate").show();
				$("#loginstate").hide();
				$("#loginUserName").text("");
				return;
			}
			if (nextUrl.val() != null && nextUrl.val() != "")
				location.href = basePath + nextUrl.val();
			else{
			}*/
			location.href = basePath;
		}
	});
};

$("div.index_menu a").removeClass("visited");
$("div.index_menu a." + $("body").attr("id")).addClass("visited");

$(document).ready(function(){
	$.getUrlParam = function(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) 
			return unescape(r[2]);
		return null;
	}
	var link = $.getUrlParam('link');
	if(link==null || link == 1){
		$("#toMYB").addClass("visited").siblings().removeClass("visited");
	}else if(link == 2){
		$("#toJYJL").addClass("visited").siblings().removeClass("visited");
	}else if(link == 3){
		$("#toZHBZGL").addClass("visited").siblings().removeClass("visited");
	}
});