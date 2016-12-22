
function selCarInsList(pageNum, pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	$("#pageNum").val(pageNum);
	$("#pageSize").val(pageSize);
	
	$.ajax({
		url: "selCarInsList.do",
		type: "post",
		dataType: "html",
		data: {"condition.pageNum": pageNum, "condition.pageSize": pageSize},
		async: false,
		success: function(data){
			$("#tradeCarInsDiv").html(data);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
		}
	});
}