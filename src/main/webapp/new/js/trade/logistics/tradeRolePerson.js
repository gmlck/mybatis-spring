//查看子账号
$("#selectChildNumber").live("click",function(){
	$("#menus").hide();
	$("#childNumber").show();
	queryChildPersons();
});

/**
 * 查询子账号数据
 */
function queryChildPersons(pageNum, pageSize){
	var roleId = $("#roleId").val();
	
    if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    if (!pageSize || pageSize < 1) {
        pageSize = 10;
    }
    $("#pageNum").val(pageNum);
    $("#pageSize").val(pageSize);
	$.ajax({
		url:"shang/selectPersonByRole.do",
		type:"post",
		data:{
			"role.id":roleId,
			"pageNum":pageNum,
			"pageSize":pageSize
		},
		dataType:"html",
		success:function(data){
			$("#personResult").html(data);
			parent.dyniframesize();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
    		$.alertPlus("服务忙，请稍后再试", 8, "提示");
    	}
	});
}
/**
 * 点击添加人员
 */
var personsLayer;
$("#addPersons").live("click",function(){
	$.getDialog().html($("#choosePerson").html());
	personsLayer = $.layerPlus({
		type:1,
		title:['选择人员'],
		fix:false,
		offset:['50px','50%'],
		area:['auto','740'],
		shadeClose:false,
		page:{dom:"#dialog"}
	});
	queryPersons();
});
//查询按钮
$.parentDom("#select").live("click",function(){
	queryPersons();
});
//手动清除查询条件
$.parentDom("#clear").live("click",function(){
	$.parentDom("#personName").val("");
	$.parentDom("#personPhone").val("");
	$.parentDom("#personNodeName").val("");
});
/**
 * 查询人员
 * @return
 */
function queryPersons(pageNum,pageSize){
    if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    if (!pageSize || pageSize < 1) {
        pageSize = 10;
    }
    //给页面的隐藏框赋值
	$.parentDom("#personRoleId").val($("#roleId").val());
    $.parentDom("#pageNum").val(pageNum);
    $.parentDom("#pageSize").val(pageSize);
    var options = {
    		url:"shang/queryPersons.do",
    		type:"post",
    		dataType: "html",
    		success:function(data){
    			$.parentDom("#personsResult").html(data);
    		},
    		error:function(XMLHttpRequest, textStatus, errorThrown){
        		$.alertPlus("服务忙，请稍后再试", 8, "提示");
        	}
    }
    $.parentDom("#personForm").ajaxSubmit(options);
}
/**
 * 确定选择的人员
 */
function surePerson(){
	var roleId = $("#roleId").val();
	var strIds="";
	$.parentDom("input[name='checkbox']:checkbox").each(function(){ 
        if($.parentDom(this).attr("checked")){
        	strIds += $.parentDom(this).val()+","
        }
    })
    if (strIds.length <= 0) {
		$.alertPlus("至少选择一条数据", 2, "提示", function(index){
               $.closePlus(index);
        });
		return true;
	}
    $.ajax({
    	url:"shang/saveRolePersons.do",
    	type:"post",
    	data:{"role.id":roleId,"strIds":strIds},
    	success:function(data){
    		if(data.msg == "success"){
    			$.alertPlus("操作成功", 1, "提示");
    			$.closePlus(personsLayer);
    			queryChildPersons();
    		}else {
				$.alertPlus(data.msg, 2, "提示");
			}
    	},
    	error:function(XMLHttpRequest, textStatus, errorThrown){
    		$.alertPlus("服务忙，请稍后再试", 8, "提示");
    	}
    });
}
//批量删除
function deletePersons(){
	var strIds="";
	$("input[name='checkbox']:checkbox").each(function(){ 
        if($(this).attr("checked")){
        	strIds += $(this).val()+","
        }
    })
	//处理删除数据
	handeDel(strIds);
};	
//单个删除
function deletePerson(userId){
	//处理删除数据
	handeDel(userId);
}
//处理删除数据
function handeDel(strIds){     
	var roleId = $("#roleId").val();
	if (strIds.length <= 0) {
		$.alertPlus("至少选择一条数据", 2, "提示", function(index){
               $.closePlus(index);
        });
		return true;
	}
	$.confirmPlus("是否确定删除?", function(index){
       $.ajax({
           url:"shang/deleteRolePerson.do?",
           type:"post",
           data:{
    	   		"role.id":roleId,
    	   		"strIds":strIds
    	   	},
           success : function(data){
       		if("success" == data.msg){
       			$.alertPlus("操作成功", 1, "提示");
       			queryChildPersons();
       		}else {
       			$.alertPlus(data.msg, 2, "提示");
				}
           },
           error : function(XMLHttpRequest, textStatus, errorThrown){
               $.alertPlus("网络繁忙，请稍后重试", 2, "提示");
           }
       });
       $.closePlus(index);
    }, "确认删除", function(index){
        $.closePlus(index);
    });
}	


/**
 * 查看物流商人员详情
 */
function queryPersonDetail(personId){
	$("#showData").hide();
	$("#personDetail").show();
	$.ajax({
		type:"post",
		url:"shang/queryRolePersonDetail.do",
		data:{"person.id":personId},
		dataType:"html",
		success:function(data){
			$("#personDetail").html(data);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
    		$.alertPlus("服务忙，请稍后再试", 8, "提示");
    	}
	});
}

/**
 * 关闭物流商人员详情页面
 */
function closePersonDetail(){
	$("#showData").show();
	$("#personDetail").hide();
	$("#personDetail").empty();
}