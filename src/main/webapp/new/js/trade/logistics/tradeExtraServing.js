$(document).ready(function(){
	queryExtraList();
});
/**
 * 处理查询配送单函数
 */
function queryExtraList(){
	//异步提交表单
	var option = {
		url: "shang/queryExtraList.do",
		type: "post",
		dataType: "html",
		async: false,
		success: function(data){
			$(".data_list").html(data);
			parent.dyniframesize();
		},
		error: function(data) {
			$.alertPlus("网络繁忙，请稍后再试！", 8, "提示");
		}
	};
	$("#queryExtraForm").ajaxSubmit(option);
}
/**
 * 查询按钮事件
 */
$(".btn_yellow").live("click", function(){
	queryExtraList();
});
/**
 * 清空表单查询条件
 */
$(".btn_gray").live("click", function(){
	$(".spLiFirst").click();
});
/**
 * 新增业务
 */
$("#add").live("click", function(){
	$("#addOrUpdateInitForm").attr("action","shang/addOrUpdateInit.do");
	$("#addOrUpdateInitForm").submit();
});
/**
 * 编辑
 */
$("#servingUpdate").live("click", function(){
	var id = $(this).parent().prev().prev().val();
	$("#addOrUpdateInitForm").attr("action","shang/addOrUpdateInit.do?tradeExtraServing.id="+id);
	$("#addOrUpdateInitForm").submit();
});
/**
 * 详情
 */
$("#detail").live("click", function(){
	var id = $(this).parent().prev().prev().val();
	$("#addOrUpdateInitForm").attr("action","shang/detail.do?tradeExtraServing.id="+id);
	$("#addOrUpdateInitForm").submit();
});
/**
 * 删除
 */
$("#delete").live("click", function(){
	var id = $(this).parent().prev().prev().val();
	$.confirmPlus("是否确定删除该服务!", function(index){
		$.ajax({
			url: "shang/deleteServing.do",
			type: "post",
			data: {"tradeExtraServing.id":id},
			dataType: "json",
			success: function(result){
				queryExtraList();
			},
			error: function(data) {
				$.alertPlus("网络繁忙，请稍后再试！", 8, "提示");
			}
		});
		$.closePlus(index);
	}, "确认删除", function(index){
		$.closePlus(index);
	});
	
});
$("#deletes").live("click", function(){
	if(!getCheckedIds()){
		return false;
	}else{
		$.confirmPlus("是否确定删除该服务!", function(index){
		$.ajax({
			url: "shang/deleteServing.do",
			type: "post",
			data: {"tradeExtraServing.id":checkedIds},
			dataType: "json",
			success: function(result){
				queryExtraList();
				checkedIds = "";
			},
			error: function(data) {
				$.alertPlus("网络繁忙，请稍后再试！", 8, "提示");
			}
		});
		$.closePlus(index);
	}, "确认删除", function(index){
		$.closePlus(index);
	});
	}
});
/**
 * 遍历复选框
 */
var checkedIds = "";
function getCheckedIds(){
	checkedIds = "";
	var checks = $("div.data_box .data1").find("input[type='checkbox']:checked");
	if(checks.length < 1){
		$.alertPlus("请选择要操作的记录！", 9, "提示");
		return false;
	}
	$.each(checks, function(i, check){
		checkedIds=checkedIds+checks.eq(i).attr("value")+",";
	});
	return true;
}
