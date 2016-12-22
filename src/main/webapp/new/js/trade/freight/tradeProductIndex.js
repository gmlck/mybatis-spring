/**
 *  产品管理查询按钮 
 */
$("#selectProduct").live('click', function(event) {
	queryProductList();
});
//设置enter键快捷查询
$("#tradeProductForm").find("input").keyup(function(event){
	if(event.keyCode == '13'){
		queryProductList();
	}
});
/**
 *  产品管理页面上页下页刷新页面
 */
function queryProductList(pageNum, pageSize) {
    if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    if (!pageSize || pageSize < 1) {
        pageSize = 10;
    }
    $("#pageNum").val(pageNum);
    $("#pageSize").val(pageSize);
    var options = {
		url:"queryTradeProducts.do",
    	type:"post",
    	success:function(data){
    		$("#tradeProductListDiv").html(data);
    		parent.dyniframesize();
    	},
    	error:function(XMLHttpRequest, textStatus, errorThrown){
    		$.alertPlus("服务忙，请稍后再试", 8, "提示");
    	}	
    }
    $("#tradeProductForm").ajaxSubmit(options);	
}

/**
 * 删除一条记录
 */
$(".delOne").live("click", function(){
	var tradeProductId = $(this).attr("id");
	$.confirmPlus("是否确定删除?", function(index){
       $.ajax({
           url:"delOne.do?tradeProduct.id=" + tradeProductId,
           type:"post",
           dataType: "json",
           success : function(data){
       		if("success" == data.msg){
       			$.alertPlus("操作成功", 1, "提示");
       			queryProductList();
       		}else {
       			$.alertPlus(data.msg, 2, "提示");
				}
           },
           error : function(XMLHttpRequest, textStatus, errorThrown){
               $.alertPlus("网络繁忙，请稍后重试", 2, "提示");
           }
       });
       $.closePlus(index);
    }, "确认删除", function(index){
        $.closePlus(index);
    });
});

/**
 * 删除多条记录
 */
$("#delList").live("click", function(){
	var ids = [];
	$("#tradeProductListDiv .data_box .singleCheck:checked").each(function(){
		ids.push($(this).val());
	})
	if(!ids || ids.length < 1){
		$.alertPlus("请选择要删除的记录！", 9, "提示");
		return false;
	}
	
	$.confirmPlus("是否确定删除?", function(index){
       $.ajax({
           url:"delList.do?tradeProduct.id=" + ids,
           type:"post",
           dataType: "json",
           success : function(data){
       		if("success" == data.msg){
       			$.alertPlus("操作成功", 1, "提示");
       			queryProductList();
       		}else {
       			$.alertPlus(data.msg, 2, "提示");
				}
           },
           error : function(XMLHttpRequest, textStatus, errorThrown){
               $.alertPlus("网络繁忙，请稍后重试", 2, "提示");
           }
       });
       $.closePlus(index);
    }, "确认删除", function(index){
        $.closePlus(index);
    });
});
