//重置按钮，重置下拉框数据
$("input[type='reset']").live("click", function(){
	$(this).parents("form").find(".spinner").each(function(){
		$(this).find(".list ul li").eq(0).trigger("click");
	});
});
(function(){
	var checkedValue =[]; 
	function getCheckedValue(){
		checkedValue = [];
		var checks = $("#tradeCmsNewsListDiv .data_box").find("input[type='checkbox']:checked");
		if(checks.length < 1){
			$.alertPlus("请选择新闻公告！", 9, "提示");
			return false;
		}
		$.each(checks, function(i, check){
			checkedValue.push(checks.eq(i).val());
		});
		return true;
	}
	/**
	 * 批量删除新闻
	 */
	$("#delNews").live("click", function(){
		if(!getCheckedValue()){
			return false;
		}
		
		$.confirmPlus("是否确定删除选中新闻！", function(index){
			$.ajax({
				type:"get",
				url:'delCmsNews.do?ids=' + checkedValue,
				dataType:"json",
				beforeSend: function(){
					$("#delNews").attr("disabled", "disabled").addClass("btn_forbidden");
				},
				success:function(data){
					$("#delNews").removeAttr("disabled").removeClass("btn_forbidden");
					if(data.msg == "success"){
						$.alertPlus("删除成功！", 1, "提示");
						queryNews();
					}else{
						$.alertPlus(data.msg, 2, "提示");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown) {
					$.alertPlus("删除失败！", 2, "提示");
					$("#delNews").removeAttr("disabled").removeClass("btn_forbidden");
				}
			});
		}, "确认删除", function(index){
			$.closePlus(index);
		});
	});
	
})();

$("#queryCmsNewsBtn").live("click", function(){
	queryNews();
});

//刷新新闻列表
function queryNews(pageNum,pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = $("#pageSize").val() ? parseInt($("#pageSize").val()) : 10;
	}
	
	$("#pageNum").val(pageNum);
	$("#pageSize").val(pageSize);
	
	var option = {
		type:"post",
		url:'queryCmsAdminNews.do',
		dataType:"html",
		success:function(data){
			$("#tradeCmsNewsListDiv").html(data);
			parent.dyniframesize();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询新闻失败！", 2, "提示");
		}
	};
	$("#conditionForm").ajaxSubmit(option);
}
