$(document).ready(function(){
	queryReceiveSends();
});
/**
 * 我发出的评价
 */
function queryReceiveSends(pageNum, pageSize){
	if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    if (!pageSize || pageSize < 1) {
        pageSize = 10;
    }
    $("#pageNum").val(pageNum);
    $("#pageSize").val(pageSize);
    var options = {
		url:"my/queryReviewSends.do",
    	type:"post",
    	data:{"sign":"send"},
    	success:function(data){
    		$("#tab_cont1").html(data);
    		parent.dyniframesize();
    		$.chageColor("#tab_cont1");
    	},
    	error:function(XMLHttpRequest, textStatus, errorThrown){
    		$.alertPlus("服务忙，请稍后再试", 8, "提示");
    	}	
    }
    $("#reviewForm").ajaxSubmit(options);	
}