var basePath = $("#basePath").val();
/**
 * 购买短信套餐
 * @param comboId 套餐ID
 */
function goBuyMsgCombo(comboId){
	$.ajax({
		url:"buyMsgCombo.do",
		type:"post",
		data:{"tradeMsgCombo.id":comboId},
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess == "Y"){
//				$.alertPlus("购买订单已经提交到满意宝账户,请您登陆满意宝进行付款!",1,"提示");
				currPageDeal();
				toPay(data);
			}else{
				$.alertPlus("操作失败,请联系客服!",2,"提示");
			}
		},
		error:function(data){
			$.alertPlus("服务器正忙,请稍后再试....",2,"提示");
		}
	});
}

/**
 * 跳转到支付页面
 */
function toPay(data){
//	alert(basePath);
//	var returnUrl = basePath+"common/payBackMsgOrder.do";
//	returnUrl = encodeURIComponent(returnUrl);
//	var basePathStr = basePath+"pay/paymentTenpay.do?entity.orderNo="+data.tradeMsgExpense.orderNoPre+data.tradeMsgExpense.orderNo+"&entity.flag=2&entity.billMoney="
//		+data.tradeMsgExpense.msgComboPrice+"&entity.shouldPay="+data.tradeMsgExpense.msgComboPrice
//		+"&entity.returnURL="+returnUrl;
	var basePathStr = "toPayPage.do?tradeMsgExpense.orderNo="+data.tradeMsgExpense.orderNoPre+data.tradeMsgExpense.orderNo+"&trade.id="+data.trade.id;
	window.open(basePathStr);
}

/**
 * 购买短信
 * @param msgCount 购买数量
 */
function goBuyMsg(){
	var msgCount = $("#anyMsgCount").val();
	if(msgCount == undefined || msgCount <= 0)
	{
		$.alertPlus("请输入要购买的短信条数.",2,"提示");
		return false;
	}
	$.ajax({
		url:"buyMsg.do",
		type:"post",
		data:{"tradeMsgExpense.msgCount":msgCount},
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess == "Y"){
//				$.alertPlus("购买订单已经提交到满意宝账户,请您登陆满意宝进行付款!",1,"提示");
				currPageDeal();
				toPay(data);
			}else{
				$.alertPlus(data.msg,2,"提示");
			}
		},
		error:function(data){
			$.alertPlus("服务器正忙,请稍后再试....",2,"提示");
		}
	});
}

/**
 * 输入任何一个短信数量
 */
function anyMsgCount(curr,evt){
	evt = (evt) ? evt : window.event;
	if (evt.keyCode) {
		if(evt.keyCode == 37 || evt.keyCode == 39){
			return false;
		}
	}
	curr.value=curr.value.replace(/\D/g,'');
	if(curr.value == undefined || curr.value==""){
		return false;
	}
	$("#price").text("¥"+curr.value+".00");
	$("#comboPrice").text("¥"+curr.value+".00");
}

/**
 * 本页处理
 */
var nodeLayerBid;
function currPageDeal(){
	$.getDialog().html($('#myPayDialogTip').html());
	nodeLayerBid = $.layerPlus({
		type : 1,
		title : '提示',
		fix : false,
		offset:['200px' , '450px'],
		area : ['auto','auto'],
		shadeClose : false,
		page : {dom : '#dialog'},
	});
	$.parentDom("#hasDone").click(function(){
		/**
		 * 重新加载短信账户信息
		 */
		$.closePlus(nodeLayerBid);
		window.document.location.reload();
	});
	$.parentDom("#hasProblemBtn").click(function(){
		/**
		 * 重新加载短信账户信息
		 */
//		$.closePlus(nodeLayerBid);
		window.open("/service/aq_pay_problems.html?menuIndex=2&navIndex=2");
	});
}

