
/**
 * 撤销保单
 */
function cancelInsurance(insurId,insuranceCode){
	 $("#cancelInsurance").attr("disabled", "disabled");
	 $.confirmPlus("是否确定撤销保单!", function(index){
        $.ajax({
            url: "cancelTradeInsuranceById.do",
            data: {
                "tradeInsurance.id": insurId,
				"tradeInsurance.insuranceCode" : insuranceCode
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function(data){
                if (data.msg == 'success') {
                    $.alertPlus("操作成功！", 1, "提示");
					queryInsuranceCount();
                    queryTradeInsurance();
                } 
                else {
                    $.alertPlus(data.msg, 2, "提示");
                }
            },
            error: function(err){
                $.alertPlus("撤销保单操作失败！", 2, "提示");
            }
        });
        $.closePlus(index);
    }, "确认取消", function(index){
        $.closePlus(index);
    });
}
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
        pageSize = 10;
    }
    
    $("#pageSize").val(pageSize);
    $("#pageNum").val(pageNum);
    
	var status = $("#insuranceStatus").val();
	
	//异步提交表单
    $.ajax({
        url: "queryTradeInsuranceInfo.do",
        type: "post",
        dataType: "html",
		data:{
			"pageNum" : pageNum,
			"pageSize" : pageSize,
			"tradeInsurance.status" : status
		},
        async: false,
        success: function(data){
            $("#insuranceList").html(data);
            parent.dyniframesize();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            $.alertPlus("查询操作出错！",2, "提示");
        }
    });
    
}

//导出查询结果
$("#exportQueryInsurances").live("click", function(){
	var isDownload = $("#isDownload").val();
	if(isDownload == 'aps'){
		 $.alertPlus("数据为空，不能下载", 9, "提示");
		 return false;
	}
	var status = $("#insuranceStatus").val();
	location.href = "exporTradeInsuranceInfo.do?tradeInsurance.status="+status;
});

/**
 * 根据状态查询保单信息
 */
function queryStatusInfo(status){
	$("#insuranceStatus").val(status);
	$.ajax({
            url: "queryTradeInsuranceInfo.do",
            data: {
                "tradeInsurance.status": status
            },
            type: "post",
            async: false,
			dataType: "html",
            success: function(data){
                   $("#insuranceList").html(data);
           			 parent.dyniframesize();
            },
            error: function(err){
                $.alertPlus("查询失败！", 2, "提示");
            }
        });
}


/**
 * 支付
 */
function goBuyInsuranceCombo(insuranceCode){
	currPageDetail();
	window.open("payInsuranceMoney.do?tradeInsurance.insuranceCode=" + insuranceCode);
	
	
}
/**
 * 网上支付提示
 */
var applyRefundDialog;
function currPageDetail(){
	$.getDialog().html($("#payMoney").html());
	applyRefundDialog = $.layerPlus({
		type : 1,
		title : ['网上支付提示'],
		fix : true,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : [0.5 , '#000' , true],
		shadeClose : false,
		page : {dom : '#dialog'}
	});
	$.parentDom("#fulshIns").click(function(){
		/**
		 * 重新加载短信账户信息
		 */
		$.closePlus(applyRefundDialog);
		window.document.location.reload();
	});
	$.parentDom("#exitDom").click(function(){
		$.closePlus(applyRefundDialog);
		window.open("/service/aq_pay_problems.html?menuIndex=2&navIndex=2");
		//http://service.mytd.com/service/aq_pay_problems.html?menuIndex=2&navIndex=2
	});
}
/**
 *  退保费弹出层
 */
var returnMoneyDialog;
function returnInsuranceMoney(insuranceId,insureMoney){
	$("#refundItemId").val(insuranceId);
	$("#insurancebillCost").attr("value",insureMoney);
	$.getDialog().html($("#rerturnMoney").html());
	returnMoneyDialog = $.layerPlus({
		type : 1,
		title : ['申请退保费'],
		fix : false,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : false,
		shadeClose : false,
		page : {dom : '#dialog'}
	});
	
	$.parentDom("#insuranceCancel").click(function(){
		$.closePlus(returnMoneyDialog);
	});
}



/**退保费申请*/
function addRefundInfo(){
	$.parentDom("#insuranceForm").ajaxSubmit({
		url: "refundReasonInfo.do",
		dataType: "json",
		type: "post",
		success: function(data){
			if(data.msg == 'error'){
				$.alertPlus("不能重复申请退保", 2, "提示");
				$.closePlus(returnMoneyDialog);
				return ;
			}
			if(data.msg == "success"){
				$.alertPlus("退款申请提交成功！", 1, "提示");
				queryInsuranceCount();
                queryTradeInsurance();
				$.closePlus(returnMoneyDialog);
			} else{
				$.alertPlus(data.msg, 2, "提示");
			}
		},
		error: function(err){
			$.alertPlus("退款申请提交出错！", 2, "提示");
		}
	});
}


