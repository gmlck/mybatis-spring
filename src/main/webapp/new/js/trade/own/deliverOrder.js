var lowestInsFee = 10;
$(function(){
	//点击修改收发货人时切换显示DIV
	$(".up").live("click", function(){
		$(this).parents(".connTextDiv").hide().next().show();
		var connId = $(this).parents(".connTextDiv").find(".name").text();
		var connDiv = $(this).parents(".connTextDiv").next();
		connDiv.find(".connAddr").each(function(){
			$(this).attr("checked", false);
		});
		connDiv.find(".connListDiv").find("#" + connId).attr("checked", true);
	});
	//取消修改联系人
	$('.cancelSelect').live('click',function cancelSelect(){
		var connDiv = $(this).parents(".connDiv");
		var formObj = connDiv.find("form");
		formObj.find(".connFormDiv").hide();
		formObj.parents(".connDiv").hide().prev().show();
	});
	//保存收发货人时切换显示DIV，并设置联系人ID在表单里
	$(".saveConnBtn").live("click", function(){
		var connDiv = $(this).parents(".connDiv");
		var formObj = connDiv.find("form");
		
		var flag = true;
		//去掉表单验证
		invalidConnForm(formObj);
		//如果联系人编辑框是显示的，则需要向后台提交数据，否则不需要向后台提交
		if(formObj.find(".connFormDiv:visible").length == 1){
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
						//设置保险默认发货人信息
						setDefaultInsInfo($(formObj).attr('id')=='senderForm',data.tradeConnection);
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
			var checkedConn = formObj.parents(".connDiv").find(".connListDiv .connAddr:checked");
			if(checkedConn.length == 0){
				formObj.parents(".connDiv").find(".connListDiv .connAddr:first").trigger("click");
			}
			//获取当前选中的联系人的json数据
			var objJson = checkedConn.parents(".add_info").find(".objJson").text();
			var obj = JSON.parse(objJson);
			//将信息设置到隐藏框里
			formObj.find(".name").val(obj.name);
			formObj.find(".companyName").val(obj.companyName);
			formObj.find(".mobilePhone").val(obj.mobilePhone);
			formObj.find(".fixedPhone").val(obj.fixedPhone);
			formObj.find(".address").val(obj.address);
			
			formObj.find(".id").val(obj.id);
			formObj.find(".proId").val(obj.proId);
			formObj.find(".proName").val(obj.proName);
			formObj.find(".cityId").val(obj.cityId);
			formObj.find(".cityName").val(obj.cityName);
			formObj.find(".countyId").val(obj.countyId);
			formObj.find(".countyName").val(obj.countyName);
			//设置保险默认发货人信息
			setDefaultInsInfo($(formObj).attr('id')=='senderForm',obj);
			//给保存后的文本赋值
			setTextValue(formObj.parents(".connDiv").prev(), obj);
		}
		if(flag){
			//保存后切换效果控制
			formObj.find(".connFormDiv").hide();
			formObj.parents(".connDiv").hide().prev().show();
		}
	});
	/** 设置保险默认发货人信息*/
	function setDefaultInsInfo(isSender,obj){
		if(isSender){
			$('#insuredMan').val(obj.name);
			$('#insuredManPhone').val(obj.mobilePhone||obj.fixedPhone);
			$('#insuredManCompany').val(obj.companyName);
			$('#insuredManAddress').val(obj.proName+'-'+obj.cityName+'-'+obj.countyName+' '+obj.address);
		}
	}
	//使用新地址时显示表单，并清空表单里的联系人数据
	$(".useNewAddr").live("change", function(){
		var formObj = $(this).parents(".connDiv").find("form");
		formObj.find(".connFormDiv").show();
		//清空除按钮外的input值
		formObj.find("input").not("input[type='button']").each(function(){
			$(this).val("");
		});
	});
	
	//选中其他单选框的时候隐藏表单
	$(".connAddr").live("click", function(){
		if(!$(this).hasClass("useNewAddr")){
			$(this).parents(".connDiv").find(".connFormDiv").hide();
		}
		var formObj = $(this).parents(".connDiv").find("form");
	});
	
	//控制单选
	$(".connAddr").live("click", function(){
		$(this).parents(".connDiv").find(".connAddr").each(function(){
			$(this).attr("checked", false);
		});
		$(this).attr("checked", true);
	});
	
	//点击删除联系人
	$(".delConn").live("click", function(){
		var connDiv = $(this).parents(".connDiv");
		//获取当前表单
		var formObj = connDiv.find("form");
		//获取当前选中的联系人的json数据
		var objJson = $(this).parents(".add_info").find(".objJson").text();
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
		var objJson = $(this).parents(".add_info").find(".objJson").text();
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
		$(this).parents(".add_info").find(".connAddr").trigger("click");
		
		//获取当前表单
		var formObj = $(this).parents(".connDiv").find("form");
		
		//给表单赋指定对象的值
		setValue(formObj, $(this));
		//并切换显示效果
		formObj.find(".connFormDiv").show();
	});
	//货物数量改变时，选中单位
	$("#cargoCount").live("change", function(){
		var cargoCount = parseFloat($(this).val());
		if(cargoCount){
			$(this).parent().find(".spinner ul li").eq(0).hide();
			$(this).parent().find(".spinner ul li").eq(1).trigger("click");
		} else{
			$(this).parent().find(".spinner ul li").eq(0).show().trigger("click");
		}
	});
	//是否购买保险选框
	$("#buyIns").live("change", function(){
		var checked = $(this).attr("checked");
		if(checked){
			$("#cargoInsType").parents(".cargoInsDiv").find(".cargoInsItem").show().find("input").each(function(){
				$(this).removeAttr("disabled");
			});
			
			$("#cargoInsType").find(".spinner ul li").eq(0).hide();
			$("#cargoInsType").find(".spinner ul li").eq(1).trigger("click");
			calCargoInsFee();
		} else{
			$("#cargoInsType").parents(".cargoInsDiv").find(".cargoInsItem").hide().find("input").each(function(){
				$(this).attr("disabled", "diabled");
			});
		}
	});
	$("#buyIns").trigger("change");
	//货物价格改变事件，计算保险费
	$("#cargoValue").live("change", function(){
		calCargoInsFee();
	});
	/**
	 * 给表单赋指定对象的值
	 * @param formObj 表单对象
	 * @currConn 当前选中的联系人DOM对象
	 */
	function setValue(formObj, currConn){
		//获取当前选中的联系人的json数据
		var objJson = currConn.parents(".add_info").find(".objJson").text();
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
		textObj.find(".name").text(obj.name);
		textObj.find(".mobilePhone").text(obj.mobilePhone||obj.fixedPhone);
		textObj.find(".companyName").text(obj.companyName||"");
		var addressPrev = obj.proName + (obj.cityName ? "-" + obj.cityName : "") + (obj.countyName ? "-" + obj.countyName : "");
		textObj.find(".addressPrev").text(addressPrev);
		textObj.find(".address").text(obj.address);
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
		listObj.find(".addressPrev").text(addressPrev);
		listObj.find(".objJson").text(JSON.stringify(obj));
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
					maxlength: 30,
					toFilter: true
				},
				"tradeConnection.mobilePhone": {
					require_from_group: [1,".connPhone"],
					isMobile: true,
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
					required: "请输入联系人公司名称！",
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
					toFilter: "请不要输入特殊字符"
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
				initSenderAddress();
			}
		} else{
			if(initReceiverAddressFlag == 0){
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
	 		proId : $("#senderProvinceId"),
			proName : $("#senderProvince"),
			cityId : $("#senderCityId"),
			cityName : $("#senderCity"),
			countyId : $("#senderCountyId"),
			countyName : $("#senderCounty"),
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
		initSenderAddressFlag =1;
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
	 		proId : $("#receiverProvinceId"),
			proName : $("#receiverProvince"),
			cityId : $("#receiverCityId"),
			cityName : $("#receiverCity"),
			countyId : $("#receiverCountyId"),
			countyName : $("#receiverCounty"),
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
		initReceiverAddressFlag =1;
		new $.district(receiverAddressPrev).init();
	}
	
	/**
	 * 点击下一步按钮
	 */
	$(".subOrder1").live("click", function(){
		if($("#senderTextDiv:visible").length == 0) {
			layer.alert("请先确认选择发货人信息！", 9, "提示");
			return false;
		}
		if($("#receiverTextDiv:visible").length == 0){
			layer.alert("请先确认选择收货人信息！", 9, "提示");
			return false;
		}
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
		
		var btnId = $(this).attr("id");
		
		$.ajax({
			url: "addOrder1.do",
			type: "post",
			data: {"tradeOrder.senderId": senderId, "tradeOrder.receiverId": receiverId},
			dataType: "json",
			success: function(data){
				if(data.msg == "success" && btnId == "addOrder1"){
//					$("#tradeOrderId").val(data.tradeOrder.id);
					//发货下单第1步操作跳转到第2步下单
//					$("#order1RedirectForm").attr("action", "toOrder2.do?tradeOrder.id=" + data.tradeOrder.id);
					location.href = "toOrder2.do?tradeOrder.id=" + data.tradeOrder.id;
				} else{
					$("#msg").val(data.msg);
					$("#order1RedirectForm").attr("action", "toTips.do");
					$("#order1RedirectForm").submit();
				}
			},
			error: function(err){
				layer.alert("服务器异常！请稍后重试！", 2, "提示");
			}
		});
	});
	
	//菜单滑入滑出效果
	$(".add_info").live("mouseenter", function(){
		$(this).addClass("hover");
	}).live("mouseleave", function(){
		$(this).removeClass("hover");
	});
	
	/**
	 * 显示更多联系人
	 */
	$('.more_add').live('click',function(){
		
		var connDiv = $(this).parents(".connDiv");
		var url = connDiv.attr("id") == "senderDiv" ? "selSenderConns.do" : "selReceiverConns.do";
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
				connDiv.find(".connListDiv .listConn").append(data);
				if($(data).filter(".add_info").length < 5){
					connDiv.find(".addMoreDiv").remove();
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown) {
				layer.alert("查询操作出错！", 2, "提示");
			}
		});
	}
	//使用新地址时显示表单，并清空表单里的联系人数据
	$(".useNewAddr").live("click", function(){
		var formObj = $(this).parents(".connDiv").find("form");
		formObj.find(".connFormDiv").show();
		//清空除按钮外的input值
		formObj.find("input").not("input[type='button']").each(function(){
			$(this).val("");
		});
	});
	//如果没有联系人则显示编辑框
	$(".connTextDiv").each(function(){
		var connId = $(this).find(".name").text();
		var connCount = $(this).next().find(".connListDiv .oneConn").length;
		if(!connId && !connCount){
			initReceiverAddress();
			initSenderAddress();
			$(this).hide();
			$(this).next().show();
			$(this).next().find(".useNewAddr").trigger("click");
		}
	});
});
$("#submitForm").validate({
	rules: {
		"cargoList[0].name": {
			required: true,
			maxlength: 30,
			toFilter: true
		},
		"cargoList[0].cargoCount": {
			required: true,
			maxlength: 10,
			toFilter: true,
			digits: true
		},
		"cargoList[0].remark": {
			maxlength: 60,
			toFilter: true
		},
		
		"order.amountPay": {
			checkIntAndNum: true,
			toFilter: true
		},
		"order.stateInsured": {
			checkIntAndNum: true
		},
		
		"insurance.cargoType": {
			required: true
		},
		"insurance.insureCoverage": {
			required: true,
			checkIntAndNum: true,
			toFilter: true
		},
		"insurance.insuredMan": {
			maxlength: 30,
			required: true
		},
		"insurance.insuredManPhone": {
			required: true,
			mobileOrTel: true
		}
	},
	messages: {
		"cargoList[0].name": {
			required: "请输入货物名称！",
			maxlength: "货物名称最大长度为{0}个字符！",
			toFilter: "请输入正确的货物名称！"
		},
		"cargoList[0].cargoCount": {
			required: "请输入货物数量！",
			maxlength: "货物数量最大长度为{0}个字符！",
			toFilter: "请输入正确的货物数量",
			digits: "请输入整数！"
		},
		"cargoList[0].remark": {
			maxlength: "注意事项最大长度为{0}个字符！",
			toFilter: "请输入正确的注意事项，勿包含特殊字符！"
		},
		
		"order.amountPay": {
			checkIntAndNum: "请输入正确的数值！",
			toFilter: "请输入正确的货物价值！"
		},
		"order.stateInsured": {
			checkIntAndNum: "请输入正确的数值！"
		},
		"insurance.cargoType": {
			required: '请选择货物类型'
		},
		"insurance.insureCoverage": {
			required: '请输入货物价值',
			checkIntAndNum: "请输入正确的数值！",
			toFilter: "请输入正确的货物价值！"
		},
		"insurance.insuredMan": {
			required: '请输入被保人姓名',
			maxlength: "被保人姓名最大长度为{0}个字符！"
		},
		"insurance.insuredManPhone": {
			required: '请输入被保人电话',
			mobileOrTel: "请输入正确的电话号码！"
		}
	}
});

//计算货物保险费
function calCargoInsFee(){
	if(isNaN($("#cargoValue").val())){
		return;
	}
	var cargoInsRate = parseFloat($("#cargoInsRate").val());
	var cargoValue = Number($("#cargoValue").val());
	cargoValue = Number($("#cargoValue").attr("_max"))>cargoValue?cargoValue:Number($("#cargoValue").attr("_max"));
	cargoValue = Number($("#cargoValue").attr("_min"))<cargoValue?cargoValue:Number($("#cargoValue").attr("_min"));
	var cargoInsFee = cargoInsRate && cargoValue ? (cargoInsRate * cargoValue) / 1000 : 0;
	var extraTip = cargoInsFee>lowestInsFee?'':'(最低'+lowestInsFee+')';
	var cargoInsInfo = "需支付保费：" + cargoInsRate + "‰×" + cargoValue + "=<span class='color_orange'>" + cargoInsFee.toFixed(2)+extraTip + "</span> 元";
	
	$('#insureMoney').val(((cargoInsFee>lowestInsFee)?cargoInsFee:lowestInsFee).toFixed(2));
	cargoInsInfo = cargoInsFee ? cargoInsInfo : "";
	$("#cargoInsInfo").html(cargoInsInfo);
}
$("#submitDeliverOrder").live("click", function(){
	if(!$("#submitForm").valid()){
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
	
	var jsonData = {};
	$('#senderForm,#receiverForm').find('input').each(function(){
		if(this.id){
			jsonData['order.'+this.id] = this.value;
		}
	})
	var subBtn = $(this);
	var option = {
			url: 'saveDeliverOrder.do',
			type: "post",
			dataType: "json",
			data:jsonData,
			beforeSend: function(){
				subBtn.attr("disabled", "disabled");
			},
			success: function(data){
				if(data.success){
					location.href = "toDeliverOrderSuccess.do?id="+data.order.id;
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
	$("#submitForm").ajaxSubmit(option);
});