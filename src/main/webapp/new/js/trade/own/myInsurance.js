
/**
 * 更新头部信息
 */
function queryInsuranceCount(){
	$.ajax({
			url: "queryInsuranceCount.do",
            type: "post",
            dataType: "html",
            async: false,
            success: function(data){
                if (data.msg != "success") {
					$("#insuranceIndex").html(data);
            		parent.dyniframesize();
                }
            },
	});
}

/**
 * 查询保单
 */
function queryTradeInsurance(pageNum, pageSize){
	 if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    
    if (!pageSize || pageSize < 1) {
        pageSize = 4;
    }
    
    $("#pageSize").val(pageSize);
    $("#pageNum").val(pageNum);
	var status = $("#myInsuranceStatus").val();
	
	//异步提交表单
    $.ajax({
        url: "toMyInsuranceIndex.do",
        type: "post",
        dataType: "html",
		data:{
			"pageNum" : pageNum,
			"pageSize" : pageSize,
			"tradeInsurance.status" : status
		},
        async: false,
        success: function(data){
            $("#myInsuranceList").html(data);
            parent.dyniframesize();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            $.alertPlus("查询操作出错！", 2, "提示");
        }
    });
    
}


/**
 * 下载保单
 */
function exportQueryInsurances(insuId){
	location.href = "exporTradeInsuranceInfo.do?tradeInsurance.id="+insuId;
}

/**
 * 下载查询结果
 */ 
function exportQueryInfo(){
	var status = $("#myInsuranceStatus").val();
	var isDownload = $("#isDownload").val();
	if(isDownload == 'aps'){
		 $.alertPlus("数据为空，不能下载", 9, "提示");
		 return false;
	}
	if(status==null || status==''){
		status="outOfDate";
	}
	
	location.href = "exporTradeInsuranceInfo.do?tradeInsurance.status="+status;
}

/**
 * 根据状态查询保单信息
 */
function queryStatusInfo(status){
	$("#myInsuranceStatus").val(status);
	$.ajax({
            url: "queryMyInsuranceInfo.do",
            data: {
                "tradeInsurance.status": status
            },
            type: "post",
            async: false,
			dataType: "html",
            success: function(data){
                   $("#myInsuranceList").html(data);
           			 parent.dyniframesize();
            },
            error: function(err){
                $.alertPlus("查询失败！", 2, "提示");
            }
        });
}
