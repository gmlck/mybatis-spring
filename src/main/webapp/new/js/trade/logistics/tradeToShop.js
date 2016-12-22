$("#createShop").live("click", function(){
	$.ajax({
        url:"createShop.do",
        type:"post",
        dataType: "json",
        beforeSend: function(){
        	$("#createShop").attr("disabled", "disabled");
        },
        success : function(data){
    		if("success" == data.msg){
    			$.alertPlus("操作成功", 1, "提示");
    			window.location.reload();
    		}else {
    			$.alertPlus(data.msg, 2, "提示");
    			$("#createShop").removeAttr("disabled");
			}
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            $.alertPlus("网络繁忙，请稍后重试", 2, "提示");
            $("#createShop").removeAttr("disabled");
        }
    });
});