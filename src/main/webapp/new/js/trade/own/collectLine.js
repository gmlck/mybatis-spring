/*
 * 删除收藏的专线
 */
function deleteCollectLineInfo(lineId){
	$.confirmPlus("是否删除此收藏!", function(index){
	$.ajax({
			url: "delectCollectLine.do",
            type: "post",
            dataType: "json",
            async: false,
			data: {
                "lineId": lineId
            },
            success: function(data){
                if (data.msg == "success") {
					$.alertPlus("操作成功！", 1, "提示");
					queryCollectLineCount();
					queryCollectLineInfo();
                }else {
                    $.alertPlus(data.msg, 2, "提示");
                }
            },
			error: function(err){
                $.alertPlus("撤销是否删除此收藏失败！", 2, "提示");
            }
	});
	 $.closePlus(index);
    }, "确认取消", function(index){
        $.closePlus(index);
    });
}
/**
 * 分页查询收藏专线信息
 */
function queryCollectLineInfo(pageNum, pageSize){
	if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    
    if (!pageSize || pageSize < 1) {
        pageSize = 10;
    }
	$("#pageSize").val(pageSize);
    $("#pageNum").val(pageNum);
	//异步提交表单
    $.ajax({
        url: "selectCollectLine.do",
        type: "post",
		data:{
			"pageSize":pageSize,
			"pageNum":pageNum
			
		},
        dataType: "html",
        async: false,
        success: function(data){
            $("#collecLineList").html(data);
            parent.dyniframesize();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            $.alertPlus("查询操作出错！", 2, "提示");
        }
    })
}
/**
 * 更新头部信息
 */
function queryCollectLineCount(){
	$.ajax({
			url: "queryCollectLineCount.do",
            type: "post",
            dataType: "html",
            async: false,
            success: function(data){
                if (data.msg != "success") {
					$("#collectLineIndex").html(data);
            		parent.dyniframesize();
                }
            },
	});
}
