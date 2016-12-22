$("#subReplyAdv").live("click", function(){
	var advReply = $("#advReply").val();
	if(!$.trim(advReply)){
		$.alertPlus("请填写回复内容！", 9, "提示");
		return false;
	}
	
	if($.trim(advReply).length < 1 || $.trim(advReply).length > 1000){
		$.alertPlus("回复内容长度为1-1000个字符！", 9, "提示");
		return false;
	}
	
	$("#advReply").val($.trim(advReply));
	//异步提交表单
	var option = {
		url: "subAdvReply.do",
		type: "post",
		dataType: "json",
		async: false,
		beforeSend: function(){
			
		},
		success: function(data){
			if(data.msg == 'success'){
				$.alertPlus("回复成功！", 1, "提示");
				location.href = 'toAdvIndex.do';
			} else{
				$.alertPlus(data.msg, 2, "提示");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("操作出错！", 2, "提示");
		}
	}
	
	$("#advReplyForm").ajaxSubmit(option);
});