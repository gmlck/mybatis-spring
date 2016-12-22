$(document).ready(function(){
	$('.data_box').each(function(i){
		 if(i%2==1){
			 $(this).addClass('Double');
		 }
	});
	getSystemMsgs();
});
$("#insert").live("click", function(){
	$.ajax({
		url: "my/insertSysMsg.do",
		type: "post",
		dataType: "json",
		async: false,
		success: function(result){
			getSystemMsgs();
		},
		error: function(data) {
			$.alertPlus("网络繁忙，请稍后再试！", 8, "提示");
		}
	});
});
function getSystemMsgs(pageNum,pageSize){
	//异步提交表单
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	$("#pageNum").val(pageNum);
	$("#pageSize").val(pageSize);
	var option = {
		url: "my/selectSysMsg.do",
		type: "post",
		dataType: "html",
		data:{"pageNum":pageNum,"pageSize":pageSize},
		async: false,
		success: function(data){
			$(".box_1").html(data);
			parent.dyniframesize();
		},
		error: function(data) {
			$.alertPlus("网络繁忙，请稍后再试！", 8, "提示");
		}
	};
	$("#form").ajaxSubmit(option);
}
/**
 * 详情
 */
$("#detail").live("click", function(){
	var id = $(this).parent().parent().find("input").val();
	$("#systemMsgId").attr("value",id);
	$("#form").attr("action","my/detailSysMsg.do");
	$("#form").submit();
});
$("#look").live("click", function(){
	var id = $(this).parent().parent().find("input").val();
	$("#systemMsgId").attr("value",id);
	$("#form").attr("action","my/detailSysMsg.do");
	$("#form").submit();
});
/**
 * 删除
 */
$("#delete").live("click", function(){
	var id = $(this).parent().parent().find("input").val();
	$.confirmPlus("是否确定删除该系统消息！", function(index){
		$.ajax({
		url: "my/deleteSysMsg.do",
		type: "post",
		data: {"systemMsg.id":id},
		dataType: "json",
		async: false,
		success: function(result){
			getSystemMsgs();
		},
		error: function(data) {
			$.alertPlus("网络繁忙，请稍后再试！", 8, "提示");
		}
	});
		$.closePlus(index);
	}, "确定删除！", function(index){
		$.closePlus(index);
	});
	
});

