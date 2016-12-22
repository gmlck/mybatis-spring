//重置按钮，重置下拉框数据
$("input[type='reset']").live("click", function(){
	$(this).parents("form").find(".spinner").each(function(){
		$(this).find(".list ul li").eq(0).trigger("click");
	});
});

//查询按钮，提交查询表单
$("#subBtn").live("click", function(){
	queryAdvList();
});

//查询咨询回复记录数据
function queryAdvList(pageNum, pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	$("#pageNum").val(pageNum);
	$("#pageSize").val(pageSize);
	
	//异步提交表单
	var option = {
		url: "queryAdvList.do",
		type: "post",
		dataType: "html",
		async: false,
		beforeSend: function(){
			
		},
		success: function(data){
			$("#tradeAdvisoryListDiv").html(data);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
		}
	}
	
	$("#tradeAdvisoryForm").ajaxSubmit(option);
}

/**
 * 删除咨询回复记录
 */
$("#delAdv").live("click", function(){
	var ids = [];
	$("#tradeAdvisoryListDiv .data_box .singleCheck:checked").each(function(){
		ids.push($(this).val());
	})
	if(!ids || ids.length < 1){
		$.alertPlus("请选择要删除的记录！", 9, "提示");
		return false;
	}
	$.confirmPlus("是否确定删除选中记录！", function(index){
		$.ajax({
			url: "delAdv.do?tradeAdvisory.id=" + ids,
			type: "POST",
			dataType: "json",
			beforeSend: function(){
//				$("#delOrder").attr("disabled", "disabled").addClass("btn_forbidden");
			},
			success: function(data){
//				$("#delOrder").removeAttr("disabled").removeClass("btn_forbidden");
				if(data.msg == "success"){
					$.alertPlus("操作成功！", 1, "提示");
					queryAdvList();
				} else{
					$.alertPlus(data.msg, 2, "提示");
				}
			},
			error: function(data){
				$.alertPlus("操作失败！", 2, "提示");
//				$("#delOrder").removeAttr("disabled").removeClass("btn_forbidden");
			}
		});
	}, "确认删除", function(index){
		$.closePlus(index);
	});
});