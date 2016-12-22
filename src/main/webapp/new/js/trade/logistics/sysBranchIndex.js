$(function(){
	querySysBranchs();
})

/**
 * 网点查询按钮事件
 */
$("#querySysBranchBtn").live("click", function(){
	querySysBranchs();
});
$(':input').bind('keyup', function(event){
    
    if (event.keyCode=="13"){
    	if(!$("#conditionForm").valid()){
			return false;
		}else{
			querySysBranchs();
		}
    }
    
 });
/**
 * 查询网点列表
 * @param pageNum
 * @param pageSize
 * @returns {Boolean}
 */
function querySysBranchs(pageNum, pageSize){
	
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = $("#pageSize").val() ? parseInt($("#pageSize").val()) : 10;
	}
	
	$("#pageSize").val(pageSize);
	$("#pageNum").val(pageNum);
	
	//异步提交表单
	var option = {
		url: "querySysBranchs.do",
		type: "post",
		dataType: "html",
		async: false,
		beforeSend: function(){
			$("#querySysBranchBtn").removeAttr("hover").addClass("btn_full_hidden").removeAttr("disabled");
		},
		success: function(data){
			$("#sysBranchList").html(data);
			$("#querySysBranchBtn").removeClass("btn_full_hidden").addClass("btn_full_yellow").removeAttr("disabled");
			//tableControl();
			parent.dyniframesize();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询网点操作出错！", 2, "提示");
			$("#querySysBranchBtn").removeClass("btn_full_hidden").addClass("btn_full_yellow").removeAttr("disabled");
		}
	}
	
	$("#conditionForm").ajaxSubmit(option);
}

/**
 * 删除网点点击事件
 */
$(".delSysBranch").live("click", function(event){
	var nodeId = $(this).attr("id");
	$.confirmPlus("是否确定删除该网点！", function(index){
		$.ajax({
			url: "delSysBranchById.do",
			type: "post",
			data: {"branch.nodeId": nodeId},
			dataType: "json",
			success: function(data){
				if(data.msg == "success"){
					$.alertPlus("网点删除操作成功！", 1, "提示");
					querySysBranchs();
				} else{
					$.alertPlus(data.msg, 2, "提示");
				}
			},
			error: function(data){
				$.alertPlus("网点删除操作出错！", 2, "提示");
			}
		});
	}, "确认删除", function(index){
		$.closePlus(index);
	});
});

$("#nodeAdd").live('click',function(){
	window.self.location="toSysBranchEntry.do";
});
$(".nodeModify").live("click",function(){
	var id = $(this).prev().val();
	var serviceId = $(this).prev().prev().val();
	window.self.location="toSysBranchEntry.do?branch.nodeId="+id+"&"+"branch.serviceId="+serviceId;
});
//删除多个网点
function deleteByIds(){
	var length = $(".checkSingle:checked").length;
	//var id = $("input[name='selectOne']:checked").val();
	var ids="";
	var array = $(".checkSingle:checked");
	if(length==0){
		$.alertPlus("请先勾选网点再删除！", 2, "提示");
		return false;
	}else{
		for(var i=0;i<array.length;i++){
			if(array[i].title=="000"){
				$.alertPlus("不能删除公司默认编码为000的网点,", 2, "提示");
				return false;
			}
			ids+=array[i].value+",";
		}
		$.confirmPlus("确认删除",function(index){
			$.ajax({
				url:"deleteByIds.do",
				type:"post",
				data:{"ids":ids},
				success:function(data){
					querySysBranchs();
				},
				error:function(XMLHttpRequest, textStatus, errorThrown)
				{
					$.alertPlus("服务忙，请稍后再试",8,"提示");
				}
				});
			$.closePlus(index);
		},"确认删除",function(index){
			$.closePlus(index);
		});
	}
};
//网点详情
$(".nodeDetail").live("click",function(){
	var nodeId = $(this).prev().val();
	$.ajax({
		url: "nodeShowDetail.do",
		type: "post",
		data: {"id" : nodeId},
		dataType: "html",
		success: function(data){
			$.getDialog().html(data);
			orderDetailDialog = $.layerPlus({
				type : 1,
				title : ["网点详细信息"],
				fix : false,
				offset:['50px' , '50%'],
				area : ['auto','auto'],
				shadeClose : false,
				page : {dom : '#dialog'}
			});
		},
		error: function(data){
			$.alertPlus("查询网点详情出错！", 2, "提示");
		}
	});
	
});

