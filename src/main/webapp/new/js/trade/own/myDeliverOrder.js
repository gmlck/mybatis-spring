//设置enter键快捷查询
$("#conditionForm").find("input").keyup(function(event){
	if(event.keyCode == '13'){
		queryDeliverOrder();
	}
});
$('#resetBtn').live('click',function(){
	$("#conditionForm").find(".spinner ul li").eq(0).show().trigger("click");
})
/** 查询配送订单*/
function queryDeliverOrder(pageNum, pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	if(!pageSize || pageSize < 1){
		pageSize = $("#pageSize").val() ? parseInt($("#pageSize").val()) : 10;
	}
	$("#pageSize").val(pageSize);
	$("#pageNum").val(pageNum);
	var o = $("#conditionForm").serialize();
	//异步提交表单
	var option = {
		url: "queryMyDeliverOrder.do",
		type: "post",
		dataType: "html",
		async: false,
		beforeSend: function(){
			$("#queryBtn").attr("disabled", "disabled").addClass("btn_forbidden");
		},
		success: function(data){
			$("#orderList").html(data);
			$("#queryBtn").removeAttr("disabled").removeClass("btn_forbidden");
			parent.dyniframesize();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
			$("#queryBtn").removeAttr("disabled").removeClass("btn_forbidden");
		}
	}
	$("#conditionForm").ajaxSubmit(option);
}
/** 查看详情*/
function viewDetail(id){
	location.href = 'viewDeliverOrderDetail.do?id='+id;
};
/** 撤销*/
function cancel(id){
	 $.confirmPlus("您确定要撤销订单吗?",function(index){
		   $.ajax({
			url: "cancelDeliverOrder.do",
			type: "post",
			data: {"id" : id},
			dataType: "json",
			success: function(data){
				if(data.success){
					$.alertPlus("撤销操作成功！", 1, "提示");
					queryDeliverOrder($("#pageNum").val(),$("#pageSize").val());
					//隐藏解约href
//					$('#'+id+'-cancel').html("<a href="+"'javascript:deleteDeliverOrder('"+id+"')+'"+">取消</a>");
//					$('#'+id+'-status').html('已撤销');
				}else{
					$.alertPlus("撤销操作失败！", 2, "提示");
				}
			},
			error: function(data){
				$.alertPlus("撤销操作出错！", 2, "提示");
			}
		}); 
	  $.closePlus(index);
  	 },"提示信息",function(index){
		 $.closePlus(index);
  	});
}
/** 删除*/
function deleteDeliverOrder(id){
	 $.confirmPlus("您确定要删除订单吗?",function(index){
		   $.ajax({
			url: "deleteDeliverOrder.do",
			type: "post",
			data: {"id" : id},
			dataType: "json",
			success: function(data){
				if(data.success){
					$.alertPlus("删除操作成功！", 1, "提示");
					queryDeliverOrder();
				}else{
					$.alertPlus("删除操作失败！", 2, "提示");
				}
			},
			error: function(data){
				$.alertPlus("删除操作出错！", 2, "提示");
			}
		}); 
	  $.closePlus(index);
  	 },"提示信息",function(index){
		 $.closePlus(index);
  	});
}
/** 评价*/
function remark(id){
	$('#'+id+"-form").validate({
        rules:{ 
    		//标题
    		'review.revTitle':{required:true,rangelength: [1, 200]},
    		//内容
    		'review.revContent':{required:true,rangelength: [10, 300]}
        },
         messages:{ 
    		//标题
    		'review.revTitle':{required:'请输入标题',rangelength: '请输入10-200个字'},
    		//内容
    		'review.revContent':{required:'请输入内容',rangelength: '请输入10-300个字'}
        }       
    })
	if(!$('#'+id+"-form").valid()){
		return false;
	}
	var paramJson = {};
	paramJson['review.revAttitude'] = $('#'+id+'-attitude').text();
	paramJson['review.revFee'] = $('#'+id+'-freight').text();
	paramJson['review.revSpeed'] = $('#'+id+'-failDate').text();
	paramJson['review.revSafe'] = $('#'+id+'-safe').text();
	var t = [];
	$('[name="'+id+'-remarkTags"]').each(function(i,obj){
		if($(obj).hasClass('border_orange')){
			t.push(obj.id);
		}
	})
	if(!t.join()){
		$.alertPlus("请选择评价标签", 2, "提示");
		return;
	}
	paramJson['review.revMark'] = t.join();
	//异步提交表单
	var option = {
		url: "remarkDeliverOrder.do",
		type: "post",
		data:paramJson,
		dataType: "json",
		success: function(data){
			queryDeliverOrder($("#pageNum").val(),$("#pageSize").val());
			if(data.success){
				$.alertPlus(data.msg, 1, "提示");
			}else{
				$.alertPlus(data.msg, 2, "提示");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("评价失败！", 2, "提示");
		}
	};
	$('#'+id+"-form").ajaxSubmit(option);
}
/** 确认收货1/拒签2 */
function confirmSign(id,type){
	var tip = (type==1?'确认收货会将运费支付给商家，您确定对方已经收到货物了吗？':'货物拒签会将运费支付给商家，您确定对方已经拒签了吗？');
	 $.confirmPlus(tip,function(index){
		   $.ajax({
			url: "confirmSign.do",
			type: "post",
			data: {"order.id" : id},
			dataType: "json",
			success: function(data){
				if(data.success){
					$.alertPlus("确认操作成功！", 1, "提示");
					queryDeliverOrder();
				}else{
					$.alertPlus("确认操作失败！", 2, "提示");
				}
			},
			error: function(data){
				$.alertPlus("确认操作出错！", 2, "提示");
			}
		}); 
	  $.closePlus(index);
  	 },"提示信息",function(index){
		 $.closePlus(index);
  	});
}
/** 支付运费*/
function payFreight(id){
	$.getDialog().html($("#payDiv").html());
	payTipDialog = $.layerPlus({
		type : 1,
		title : ['网上支付提示'],
		fix : true,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : [0.5 , '#000' , true],
		shadeClose : false,
		closeBtn : [0 , false],
		move : ['.xubox_title' , false],
		page : {dom : '#dialog'}
	});
	parent.window.open("payDeliverFreight.do?id=" + id);
	clickPayFreightBtn(id);
}

/** 支付保费*/
function payIns(insuranceCode){
	$.getDialog().html($("#payDiv").html());
	payTipDialog = $.layerPlus({
		type : 1,
		title : ['网上支付提示'],
		fix : true,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : [0.5 , '#000' , true],
		shadeClose : false,
		closeBtn : [0 , false],
		move : ['.xubox_title' , false],
		page : {dom : '#dialog'}
	});
	parent.window.open("payInsuranceMoney.do?tradeInsurance.insuranceCode=" + insuranceCode);
	clickPayInsBtn(insuranceCode);
}
function clickPayFreightBtn(id){
	$.parentDom("#finishBtn").click(function(){
		$.ajax({
			url: "checkPayStatus.do",
			type: "post",
			data: {"order.id" : id},
			dataType: "json",
			success: function(data){
				if(data.success){
					$.closePlus(payTipDialog);
					$.alertPlus("订单支付成功！", 1, "提示");
					delete(payTipDialog);
					queryDeliverOrder($("#pageNum").val(),$("#pageSize").val());
				}else{
					$.alertPlus("订单未支付成功，请重新支付！", 2, "提示");
					$.closePlus(payTipDialog);
					delete(payTipDialog);
				}
			},
			error: function(data){
				$.alertPlus("订单支付查询出错！", 2, "提示");
			}
		});
	});
}
//支付出现问题
function payError(){
	openUrl('service', '/service/aq_pay_problems.html?menuIndex=2&navIndex=2');
	$.closePlus(payTipDialog);
	queryDeliverOrder($("#pageNum").val(),$("#pageSize").val());
}
function clickPayInsBtn(insuranceCode){
	$.parentDom("#finishBtn,#errorBtn").click(function(){
		$.closePlus(payTipDialog);
		delete(payTipDialog);
		queryDeliverOrder($("#pageNum").val(),$("#pageSize").val());
	});
}
/** 申请退运费*/
function applyReturnPay(id){
	$.getDialog().html($("#applyReturnFreightDiv").html());
	$.parentDom('#id').val(id);
	returnpayTipDialog = $.layerPlus({
		type : 1,
		title : ['申请退款'],
		fix : false,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : false,
		shadeClose : false,
		page : {dom : '#dialog'}
	});
	//绑定按钮事件
	clickReturnPayBtn(id);
}
function clickReturnFreightBtn(id){
	$.parentDom("#cancleBtn").click(function(){
		$.closePlus(returnpayTipDialog);
		delete(returnpayTipDialog);
	});
	var option = {
		url: "applyReturnFreight.do",
		type: "post",
		dataType: "json",
		success: function(data){
			if(data.success){
				$.closePlus(returnpayTipDialog);
				$.alertPlus("申请已提交,工作人员将于3个工作日内处理完毕！", 1, "提示");
				delete(returnpayTipDialog);
				queryDeliverOrder($("#pageNum").val(),$("#pageSize").val());
			}else{
				$.alertPlus("申请提交失败！", 2, "提示");
			}
		},
		error: function(data){
			$.alertPlus("申请提交出错,请检查网络连接！", 2, "提示");
			$.closePlus(returnpayTipDialog);
			delete(returnpayTipDialog);
		}
	};
	$("#returnFreightForm").ajaxSubmit(option);
}