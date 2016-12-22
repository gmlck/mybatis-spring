/**
 * 初始化页面查询我收到的评价
 */
$(function(){
	$.pubTab("#tab_parent");
	if($("#sign").val() == "receive"){
		$("#send").removeClass("active");
		$("#receive").addClass("active");
		queryReceiveReviews();
	}else {
		$("#receive").removeClass("active");
		$("#send").addClass("active");
		queryReceiveSends();
	}
});
$("#receive").live("click",function(){
	queryReceiveReviews();
});
$("#send").live("click",function(){
	queryReceiveSends();
});

/**
 * 我收到的评价
 */
function queryReceiveReviews(pageNum, pageSize){
	if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    if (!pageSize || pageSize < 1) {
        pageSize = 10;
    }
    $("#pageNum").val(pageNum);
    $("#pageSize").val(pageSize);
    var options = {
		url:"renjia/queryReviewReceives.do",
    	type:"post",
    	data:{"sign":"receive"},
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
		url:"renjia/queryReviewSends.do",
    	type:"post",
    	data:{"sign":"send"},
    	success:function(data){
    		$("#tab_cont2").html(data);
    		parent.dyniframesize();
    		$.chageColor("#tab_cont2");
    	},
    	error:function(XMLHttpRequest, textStatus, errorThrown){
    		$.alertPlus("服务忙，请稍后再试", 8, "提示");
    	}	
    }
    $("#reviewForm").ajaxSubmit(options);	
}