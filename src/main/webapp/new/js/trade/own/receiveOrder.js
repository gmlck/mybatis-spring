/**
 * 点击修改，获得其余的5个联系人信息
 * 联系人类型1:发货人 2:收货人
 */
function selectContact(type){
	if($("#connectionForm").length){
		$.alertPlus("请先将", 2, "提示");
		return;
	}
	$.ajax({
		url: "trade/loadFiveConntion.do",
		type:"post",
		dataType:"html",
		data:{"type":type},
		success:function(data){
			if(type==1){
				$("#send").hide();
				$("#senderSelectDiv").html(data);
				$("#tip").text('发货人信息');
			}else{
				$("#fetch").hide()
				$("#receiverSelectDiv").html(data);
				$("#tip").text('收货人信息');
			}
		},
		error:function(data){
			$.alertPlus("查询记录出错！", 2, "提示");
		}
	});
}
/**
 * 选定联系人
 */
function decideConnection(id,type){
	var json = JSON.parse($('#'+id).text());
	$("#newRadio").removeAttr("checked");
	$("#connectionForm").hide();
	if(type==1){
		$('#sid').val(json.id);
		$('#sname').text(json.name);
		$('#sphone').text(json.mobilePhone);
		$('#saddr2').text(json.address);
	}else{
		
	}
	cancel(type);
}
/** 
 * 编辑
 * 联系人类型1:发货人 2:收货人
 */
function editConnection(id,type){
	$.ajax({
		url:"trade/loadEditConnectionInfo.do",
		type:"post",
		data:{"connection.id":id},
		success:function(data){
			if(type==1){
				$("#send").hide();
				$("#senderSelectDiv").html(data);
				$("#tip").text('发货人信息');
			}else{
				$("#fetch").hide()
				$("#receiverSelectDiv").html(data);
				$("#tip").text('收货人信息');
			}
			$("#connectionForm").show();
		},
		error:function(data){
			$.alertPlus("查询记录出错！", 2, "提示");
		}
	});
}
/**
 * 使用新地址，输入框显示。
 */
function newAddress(){
	$("#connectionForm").show();
	$('[name="address"]').each(function(i,obj){
		$(obj).removeAttr('checked');
	});
}


/**
 * 取消修改
 */
function cancel(type){
	if(type==1){
		$("#send").show();
		$("#senderSelectDiv").html('');
	}else{
	 	$("#fetch").show();
		$("#receiverSelectDiv").html('');
	}
}
