$(document).ready(function(){
	//如果没有联系人则显示编辑框
	$(".connAllDiv").each(function(){
		var connId = $(this).find(".connTextDiv span.id").text();
		var connCount = $(this).find(".connListDiv .oneConn").length;
		if(!connId && !connCount){
			$(this).find(".connTextDiv").hide();
			$(this).find(".connDiv").show();
			$(this).find(".connDiv .connListDiv").hide();
			$(this).find(".connDiv .useNewAddr").trigger("click");
		}
	});
});

(function(){
	//联系人操作按钮滑入滑出效果
	$(".new_info").live("mouseenter", function(){
		$(this).addClass("hover");
	}).live("mouseleave", function(){
		$(this).removeClass("hover");
	});
	
	//点击修改收发货人时切换显示DIV
	$(".up").live("click", function(){
		var connTextDiv = $(this).parents(".connAllDiv").find(".connTextDiv");
		connTextDiv.hide().next().show();
		var connId = connTextDiv.find(".id").text();
		var connDiv = connTextDiv.next();
		connDiv.find(".connAddr").each(function(){
			$(this).attr("checked", false);
		});
		connDiv.find(".connListDiv").find("#" + connId).attr("checked", true);
	});
	
	//保存收发货人时切换显示DIV，并设置联系人ID在表单里
	$(".saveConnBtn").live("click", function(){
		var connDiv = $(this).parents(".connDiv");
		var formObj = connDiv.find("form");
		
		var flag = true;
		//去掉表单验证
		invalidConnForm(formObj);
		//如果联系人编辑框是显示的，则需要向后台提交数据，否则不需要向后台提交
		if(formObj.filter(":visible").length == 1){
			//绑定表单验证
			validateConnForm(formObj);
			if(!formObj.valid()){
				return false;
			}
			
			var connId = formObj.find(".id").val();
			var url = connId ? "upConn.do" : "addConn.do";
			//设置联系人类型
			var connectType = connDiv.attr("id") == "senderDiv" ? 1 : 2;
			formObj.find(".connectType").val(connectType);
			formObj.ajaxSubmit({
				url: url,
				type: "post",
				dataType: "json",
				async: false,
				success: function(data){
					if(data.msg == "success"){
						//将ID设置到隐藏框里
						formObj.find(".id").val(data.tradeConnection.id);
						//给保存后的文本赋值
						setTextValue(formObj.parents(".connDiv").prev(), data.tradeConnection);
						
						var listObj = connDiv.find(".listConn");
						if(connId){
							setListOneValue(listObj, data.tradeConnection);
						}
					} else{
						layer.alert("保存联系人失败！", 2, "提示");
						flag = false;
					}
				},
				error: function(err){
					layer.alert("保存联系人出错！", 2, "提示");
					flag = false;
				}
			});
		} else{
			var checkedConn = connDiv.find(".connListDiv .connAddr:checked");
			if(checkedConn.length == 0){
				connDiv.find(".connListDiv .connAddr:first").trigger("click");
			}
			//获取当前选中的联系人的json数据
			var objJson = checkedConn.parents(".oneConn").find(".objJson").text();
			var obj = JSON.parse(objJson);
			//将ID设置到隐藏框里
			formObj.find(".id").val(obj.id);
			//给保存后的文本赋值
			setTextValue(connDiv.prev(), obj);
		}
		if(flag){
			//保存后切换效果控制
			formObj.hide();
			connDiv.hide().prev().show();
		}
	});
	
	//使用新地址时显示表单，并清空表单里的联系人数据
	$(".useNewAddr").live("change", function(){
		var formObj = $(this).parents(".connDiv").find("form");
		formObj.show();
		//清空除按钮外的input值
		formObj.find("input").not("input[type='button']").each(function(){
			$(this).val("");
		});
	});
	
	//选中其他单选框的时候隐藏表单
	$(".connAddr").live("click", function(){
		if(!$(this).hasClass("useNewAddr")){
			$(this).parents(".connDiv").find("form").hide();
		}
	});
	
	//点击删除联系人
	$(".delConn").live("click", function(){
		var connDiv = $(this).parents(".connDiv");
		//获取当前表单
		var formObj = connDiv.find("form");
		//获取当前选中的联系人的json数据
		var objJson = $(this).parents(".oneConn").find(".objJson").text();
		var obj = JSON.parse(objJson);
		
		layer.confirm("是否确定删除该联系人！", function(index){
			$.ajax({
				url: "delConn.do",
				type: "post",
				dataType: "json",
				data: {"tradeConnection.id": obj.id, "tradeConnection.connectType": obj.connectType},
				async: false,
				success: function(data){
					if(data.msg == "success"){
						connDiv.find(".connListDiv").find("." + obj.id).remove();
					} else{
						layer.alert("删除联系人失败！", 2, "提示");
					}
				},
				error: function(err){
					layer.alert("删除联系人出错！", 2, "提示");
				}
			});
			layer.close(index);
		}, "确认删除该联系人", function(index){
			layer.close(index);
		});
	});
	
	//点击设为默认联系人
	$(".setDefault").live("click", function(){
		//获取当前表单
		var formObj = $(this).parents(".connDiv").find("form");
		//获取当前选中的联系人的json数据
		var objJson = $(this).parents(".oneConn").find(".objJson").text();
		var obj = JSON.parse(objJson);
		
		layer.confirm("是否确定设为默认联系人！", function(index){
			$.ajax({
				url: "defConn.do",
				type: "post",
				dataType: "json",
				data: {"tradeConnection.id": obj.id, "tradeConnection.connectType": obj.connectType},
				async: false,
				success: function(data){
					if(data.msg != "success"){
						layer.alert("设为默认联系人失败！", 2, "提示");
					}
				},
				error: function(err){
					layer.alert("设为默认联系人出错！", 2, "提示");
				}
			});
			layer.close(index);
		}, "确认设为默认联系人", function(index){
			layer.close(index);
		});
	});
	
	//点击编辑联系人，将联系人信息设置到表单里，并显示表单
	$(".editConn").live("click", function(){
		//触发单选框的点击事件，控制单选框的效果
		$(this).parents(".oneConn").find(".connAddr").trigger("click");
		
		//获取当前表单
		var formObj = $(this).parents(".connDiv").find("form");
		
		//给表单赋指定对象的值
		setValue(formObj, $(this));
		//并切换显示效果
		formObj.show();
	});
	
	/**
	 * 给表单赋指定对象的值
	 * @param formObj 表单对象
	 * @currConn 当前选中的联系人DOM对象
	 */
	function setValue(formObj, currConn){
		//获取当前选中的联系人的json数据
		var objJson = currConn.parents(".oneConn").find(".objJson").text();
		var obj = JSON.parse(objJson);
		
		for(var attr in obj){
			formObj.find("." + attr).val(obj[attr])
		}
		var addressPrev = obj.proName + (obj.cityName ? "-" + obj.cityName : "") + (obj.countyName ? "-" + obj.countyName : "");
		formObj.find("input[name='addressPrev']").val(addressPrev);
	}
	
	/**
	 * 给文本里赋指定对象的值
	 * @param formObj 表单对象
	 * @currConn 当前选中的联系人DOM对象
	 */
	function setTextValue(textObj, obj){
		obj.mobilePhone = obj.mobilePhone ? obj.mobilePhone : obj.fixedPhone;
		for(var attr in obj){
			textObj.find("." + attr).text(obj[attr] ? obj[attr] : "");
		}
		var addressPrev = obj.proName + (obj.cityName ? "-" + obj.cityName : "") + (obj.countyName ? "-" + obj.countyName : "");
		textObj.find(".addressPrev").text(addressPrev);
		
		//如果是发货人信息，则设置到货物保险里
		if(textObj.attr("id") == "senderTextDiv"){
			var cargoInsDiv = $(".cargoInsDiv");
			cargoInsDiv.find(".cargoInsName").val(obj.name);
			cargoInsDiv.find(".cargoInsMobile").val(obj.mobilePhone);
			cargoInsDiv.find(".cargoInsCompanyName").val(obj.companyName);
			cargoInsDiv.find(".cargoInsAddress").val(addressPrev + " " + obj.address);
		}
	}
	
	/**
	 * 给联系人列表里赋指定对象的值
	 * @param formObj 表单对象
	 * @currConn 当前选中的联系人DOM对象
	 */
	function setListOneValue(listObj, obj){
		var listOneObj = listObj.find("." + obj.id);
		for(var attr in obj){
			listOneObj.find("." + attr).text(obj[attr])
		}
		var addressPrev = obj.proName + (obj.cityName ? "-" + obj.cityName : "") + (obj.countyName ? "-" + obj.countyName : "");
		listOneObj.find(".addressPrev").text(addressPrev);
		listOneObj.find(".objJson").text(JSON.stringify(obj));
	}
	
	/**
	 * 给联系人表单绑定校验规则
	 */
	function validateConnForm(formObj){
		formObj.validate({
			groups: {
				connPhone: "tradeConnection.mobilePhone tradeConnection.fixedPhone"
		    },
			rules: {
				"tradeConnection.name": {
					required: true,
					maxlength: 30,
					toFilter: true
				},
				"tradeConnection.companyName": {
//					required: true,
					maxlength: 30,
					toFilter: true
				},
				"tradeConnection.mobilePhone": {
					require_from_group: [1,".connPhone"],
					mobile: true,
					toFilter: true
				},
				"tradeConnection.fixedPhone": {
					require_from_group: [1,".connPhone"],
					tel: true,
					toFilter: true
				},
				"addressPrev": {
					required: true
				},
				"tradeConnection.address": {
					required: true,
					maxlength: 60,
					toFilter: true
				}
			},
			messages: {
				"tradeConnection.name": {
					required: "请输入联系人姓名！",
					maxlength: "联系人姓名最多为{0}个字符！",
					toFilter: "请输入正确的联系人姓名！"
				},
				"tradeConnection.companyName": {
//					required: "请输入联系人公司名称！",
					maxlength: "公司名称最多为{0}个字符！",
					toFilter: "请输入正确的公司名称！"
				},
				"tradeConnection.mobilePhone": {
					require_from_group: "手机号和固话请至少输入一项！",
					mobile: "请输入正确的手机号！",
					toFilter: "请输入正确的手机号！"
				},
				"tradeConnection.fixedPhone": {
					require_from_group: "手机号和固话请至少输入一项！",
					tel: "请输入正确的固话号码！",
					toFilter: "请输入正确的固话号码！"
				},
				"addressPrev": {
					required: "请选择联系人地址！"
				},
				"tradeConnection.address": {
					required: "请输入详细地址！",
					maxlength: "详细地址最多为{0}个字符！",
					toFilter: "请输入正确的详细地址！"
				}
			}
		});
	}
	
	/**
	 * 去掉表单的验证
	 */
	function invalidConnForm(formObj){
		try{formObj.rules("remove");} catch(e){}
	}
	
	var initSenderAddressFlag = 0;
	var initReceiverAddressFlag = 0;
	
	/**
	 * 第一次点击使用新地址和点击编辑时初始化地址
	 */
	$(".useNewAddr, .editConn").live("click", function(){
		var divId = $(this).parents(".connDiv").attr("id");
		if(divId == "senderDiv"){
			if(initSenderAddressFlag == 0){
				initSenderAddressFlag ++;
				initSenderAddress();
			}
		} else{
			if(initReceiverAddressFlag == 0){
				initReceiverAddressFlag ++;
				initReceiverAddress();
			}
		}
	});
	/**
	 * 初始化发货地址
	 */
	function initSenderAddress(){
		var senderAddressPrev = {
	 		id : "senderAddressPrev", //要使用弹出层选择省市区功能的input文本框ID
	 		countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
	 		isShowProvince : false, //选择省份后是否立即显示到文本框
	 		isShowCity : true, //选择城市后是否立即显示到文本框
	 		proId : $("#senderProId"),
			proName : $("#senderProName"),
			cityId : $("#senderCityId"),
			cityName : $("#senderCityName"),
			countyId : $("#senderCountyId"),
			countyName : $("#senderCountyName"),
			hotCityBack: function(data){
				try{$("#senderAddressPrev").valid();} catch(e){}
			},
			proBack: function(data){
				try{$("#senderAddressPrev").valid();} catch(e){}
			},
			cityBack: function(data){
				try{$("#senderAddressPrev").valid();} catch(e){}
			},
			countyBack: function(data){
				try{$("#senderAddressPrev").valid();} catch(e){}
			}
	 	};
		new $.district(senderAddressPrev).init();
	}
	
	/**
	 * 初始化收货地址
	 */
	function initReceiverAddress(){
		var receiverAddressPrev = {
	 		id : "receiverAddressPrev", //要使用弹出层选择省市区功能的input文本框ID
	 		countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
	 		isShowProvince : false, //选择省份后是否立即显示到文本框
	 		isShowCity : true, //选择城市后是否立即显示到文本框
	 		proId : $("#receiverProId"),
			proName : $("#receiverProName"),
			cityId : $("#receiverCityId"),
			cityName : $("#receiverCityName"),
			countyId : $("#receiverCountyId"),
			countyName : $("#receiverCountyName"),
			hotCityBack: function(data){
				try{$("#receiverAddressPrev").valid();} catch(e){}
			},
			proBack: function(data){
				try{$("#receiverAddressPrev").valid();} catch(e){}
			},
			cityBack: function(data){
				try{$("#receiverAddressPrev").valid();} catch(e){}
			},
			countyBack: function(data){
				try{$("#receiverAddressPrev").valid();} catch(e){}
			}
	 	};
		new $.district(receiverAddressPrev).init();
	}
	
	/**
	 * 显示更多联系人
	 */
	$('.more_add').live('click',function(){
		
		var connDiv = $(this).parents(".connDiv");
		var url = connDiv.attr("id") == "senderDiv" ? "selSenderConnsLineOrder.do" : "selReceiverConnsLineOrder.do";
		var pageNum = parseInt(connDiv.find("#pageNum").val()) + 1;
		if(!pageNum || pageNum < 1){
			pageNum = 1;
		}
		selConns(pageNum, connDiv, url);
	});
	
	/**
	 * 显示更多联系人
	 */
	function selConns(pageNum, connDiv, url){
		connDiv.find("#pageNum").val(pageNum);
		$.ajax({
			url: url,
			type: "post",
			dataType: "html",
			data: {"pageNum": pageNum},
			async: false,
			success: function(data){
				connDiv.find(".connListDiv").append(data);
				if($(data).filter(".oneConn").length < 5){
					connDiv.find(".addMoreDiv").remove();
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				layer.alert("查询操作出错！", 2, "提示");
			}
		});
	}
	
	
})();

//下单提交
$("#addLineOrder").live("click", function(){
	
	if(!$("#lineOrderForm").valid()){
		return false;
	}
	
	//判断收发货人是否已保存
	if($("#senderTextDiv:visible").length == 0) {
		layer.alert("请先确认选择发货人信息！", 9, "提示");
		return false;
	}
	if($("#receiverTextDiv:visible").length == 0){
		layer.alert("请先确认选择收货人信息！", 9, "提示");
		return false;
	}
	//判断收发货人ID是否存在
	var senderId = $("#senderId").val();
	var receiverId = $("#receiverId").val();
	if(!senderId){
		layer.alert("发货人信息有异常，请重新选择！", 9, "提示");
		return false;
	}
	if(!receiverId){
		layer.alert("收货人信息有异常，请重新选择！", 9, "提示");
		return false;
	}
	
	//判断线路来源和订单操作
	var lineType = $("#lineType").val();
	var opMark = parseInt($("#opMark").val());
	var url = opMark == 1 ? (lineType == "TRADE_ORDER_LINE_TYPE_LINE" ? "upLineOrder.do" : (lineType == "TRADE_ORDER_LINE_TYPE_RETURN" ? "upReturnOrder.do" : "")) : (lineType == "TRADE_ORDER_LINE_TYPE_LINE" ? "addLineOrder.do" : (lineType == "TRADE_ORDER_LINE_TYPE_RETURN" ? "addReturnOrder.do" : ""));
	if(!url){
		$.alertPlus("线路来源有误！", 2, "提示");
		return false;
	}
	
	//设置收发货人的ID
	$("#tradeOrderSenderId").val(senderId);
	$("#tradeOrderReceiverId").val(receiverId);
	
	//增值服务处理
	var valueAdded = "";
	$("#pickUpFee, #deliverHomeFee, #deliverDoorFee").each(function(){
		if($(this).attr("checked")){
			valueAdded += $(this).attr("stc") + ",";
		}
	});
	
	valueAdded = valueAdded ? valueAdded.substring(0, valueAdded.length-1) : valueAdded;
	//保价运输和代收货款如果没选中则清空文本框里的内容
	var checked = $("#insuredFee") && $("#insuredFee").attr("checked");
	if(!checked && $("#stateInsured")){
		$("#stateInsured").val("");
	}
	var checked = $("#amountFee") && $("#amountFee").attr("checked");
	if(!checked && $("#amountPay")){
		$("#amountPay").val("");
	}
	
	var subBtn = $(this);
	
	var option = {
			url: url,
			type: "post",
			dataType: "json",
			data: {"tradeOrder.tradeOrderLine.valueAddedServices": valueAdded},
			beforeSend: function(){
				subBtn.attr("disabled", "disabled");
			},
			success: function(data){
				if(data.msg == "success"){
					location.href = "toOrderSucc.do?tradeOrder.id="+data.tradeOrder.id + "&opMark=" + opMark;
				} else{
					layer.alert(data.msg, 2, "提示");
					subBtn.removeAttr("disabled");
				}
			},
			error: function(err){
				layer.alert("提交订单出错！", 2, "提示");
				subBtn.removeAttr("disabled");
			}
		};
	
	//异步提交表单
	$("#lineOrderForm").ajaxSubmit(option);
});

