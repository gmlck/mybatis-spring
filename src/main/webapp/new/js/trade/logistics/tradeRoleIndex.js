var setting = {
		check: {
		 enable: true,
		 chkStyle : 'checkbox'
	 	},
	 	data:{
	 		simpleData:{
	 			enable: true
	 		}
	 	}
	 };
$.getUrlParam = function(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) 
		return unescape(r[2]);
	return null;
}	 
$(document).ready(function(){
	$(".cj").find(".box1_title").click(function(){
		if($(this).find('.hide_show').html()=='展开'){
			$(this).find('.hide_show').html('收起');
			 $(".cj").find(".sub_box").eq($(this).find('.hide_show').index(".hide_show")).slideDown();
			 $(this).find('.hide_show').addClass("click");
		}else{
			$(this).find('.hide_show').html('展开');
			$(this).find('.hide_show').removeClass("click");
			 $(".cj").find(".sub_box").eq($(this).find('.hide_show').index(".hide_show")).slideUp();
		}
		 setTimeout("zishiying()",500);
	});
	initTree();
});
//自适应方法
function zishiying(){
	parent.dyniframesize();
}

/**点击角色列表执行方法
 * @param role
 * @return
 */
function clickRole(role){
	//DOM对象转化为Jquery对象
	var role = $(role);
	//获取当前角色的ID
	var roleId = role.next().val();
	//给右侧需要显示的地方赋值
	$("#roleId").val(roleId);
	$("#roleName").html(role.next().next().val());
	$("#roleRemark").html(role.next().next().next().val());
	$("#roleCode").val(role.next().next().next().next().val());
	$("#statusIndex").val(role.next().next().next().next().next().val());
	//把所有的角色都去除样式
	role.parent().find("dd").removeClass("active");
	//给当前的角色添加上选中的样式
	role.addClass("active");
	//开始查询菜单
	queryRoleMenus(roleId);
	$("#menus").show();
	$("#childNumber").hide();
};

/**初始化菜单树
 * @param roleId
 * @return
 */
function initTree(){
	$.ajax({
	 	url:"shang/queryAllMenus.do",
		type:"post",
		dataType:"json",
		success:function(json){		
		 	$.fn.zTree.init($("#logistic"),setting,json.logisticMenus);
		 	$.fn.zTree.init($("#manyida"),setting,json.manyidaMenus);
		 	$.fn.zTree.init($("#manyipei"),setting,json.manyipeiMenus);
		 	$(".cont_left").find("dd").eq($.getUrlParam('statusIndex')).click();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.alertPlus("网络繁忙，请稍后重试！", 8, "提示");
 		}
	});
}	
/**查询角色拥有菜单数据
 * @param roleId
 * @return
 */
function queryRoleMenus(roleId){
	 $.ajax({
		 	url:"shang/queryLogisticMenus.do",
			type:"post",
			data:{"role.id":roleId},
			datatype:"json",
			success:function(json){		
				var logisticTreeObj = $.fn.zTree.getZTreeObj("logistic");
				if(logisticTreeObj != null && json.menus != null){
					logisticTreeObj.checkAllNodes(false);
					logisticTreeObj.expandAll(true);
					$.each(json.menus, function(i, menu){
							var node = logisticTreeObj.getNodesByParam("id",menu.id);
							if(node[0]!=null && node[0]!=undefined){
								logisticTreeObj.checkNode(node[0], true, false, false);
							}
					});
					parent.dyniframesize(); 
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.alertPlus("网络繁忙，请稍后重试！", 8, "提示");
	 		}
		});

	 $.ajax({
		 	url:"shang/queryManyidaMenus.do",
			type:"post",
			data:{"role.id":roleId},
			datatype:"json",
			success:function(json){		
				var manyidaTreeObj = $.fn.zTree.getZTreeObj("manyida");
				if(manyidaTreeObj != null && json.menus != null){
					manyidaTreeObj.checkAllNodes(false);
					manyidaTreeObj.expandAll(true);
					$.each(json.menus, function(i, menu){
							var node = manyidaTreeObj.getNodesByParam("id",menu.id);
							if(node[0]!=null && node[0]!=undefined){
								manyidaTreeObj.checkNode(node[0], true, false, false);
							}
					});
					parent.dyniframesize(); 
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.alertPlus("网络繁忙，请稍后重试！", 8, "提示");
	 		}
		});

	 $.ajax({
		 	url:"shang/queryManyipeiMenus.do",
			type:"post",
			data:{"role.id":roleId},
			datatype:"json",
			success:function(json){		
				var manyipeiTreeObj = $.fn.zTree.getZTreeObj("manyipei");
				if(manyipeiTreeObj != null && json.menus != null){
					manyipeiTreeObj.checkAllNodes(false);
					manyipeiTreeObj.expandAll(true);
					$.each(json.menus, function(i, menu){
							var node = manyipeiTreeObj.getNodesByParam("id",menu.id);
							if(node[0]!=null && node[0]!=undefined){
								manyipeiTreeObj.checkNode(node[0], true, false, false);
							}
					});
					parent.dyniframesize(); 
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.alertPlus("网络繁忙，请稍后重试！", 8, "提示");
	 		}
		});
}

//保存角色菜单数据
$("#saveRoleMenu").live("click",function(){
	var roleId = $("#roleId").val();
	var logisticTreeObj = $.fn.zTree.getZTreeObj("logistic");
	var manyidaTreeObj = $.fn.zTree.getZTreeObj("manyida");
	var manyipeiTreeObj = $.fn.zTree.getZTreeObj("manyipei");
	
	var menuId = "";
	if(logisticTreeObj != null){
		var logisticNodes = logisticTreeObj.getCheckedNodes(true);
		for (var i = 0; i < logisticNodes.length; i++) {
		       menuId +=  logisticNodes[i].id+",";
			}
	}
	if (manyidaTreeObj != null) {
		var manyidaNodes = manyidaTreeObj.getCheckedNodes(true);
		for (var i = 0; i < manyidaNodes.length; i++) {
		    menuId +=  manyidaNodes[i].id+",";
		}
	}
	if (manyipeiTreeObj != null) {
		var manyipeiNodes = manyipeiTreeObj.getCheckedNodes(true);
		for (var i = 0; i < manyipeiNodes.length; i++) {
		    menuId +=  manyipeiNodes[i].id+",";
		}
	}
	if(roleId == "" || roleId == null){
		$.alertPlus("请选择要操作的角色",2,"提示")
		return;
	}
	$("#saveRoleMenu").attr("disabled","disabled");
	$.ajax({
		url:"shang/saveRoleMenu.do",
		type:"post",
		dataType:"json",
		data:{"role.id":roleId,"menuId":menuId},
		success:function(data){
			if("success" == data.msg){
				$.alertPlus("保存成功",1,"提示")
				$("#saveRoleMenu").removeAttr("disabled");
			}else {
				$.alertPlus(data.msg,8,"提示")
				$("#saveRoleMenu").removeAttr("disabled");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.alertPlus("网络繁忙，请稍后重试！", 8, "提示");
		}
	});
	
});

//角色新增校验规则
function checkRole(){
	$.parentDom("#roleForm").validate({
		rules: {
			//名称
			"role.name" : {
				required: true,
				checkRoleName:true,
				maxlength:7,
				toFilter:true
			},
			//描述
			"role.remark" : {
				maxlength:30,
				toFilter:true
			}
		},
		messages : {
			//编码
			"role.name" : {
				required: "请输入角色名称！",
				checkRoleName:"角色名称已经存在！",
				maxlength:"最大只是输入7个字符"
			},
			//名称
			"role.remark" : {
				maxlength:"最大只是输入30个字符"
			}
		}
	});
	 // 车牌号是否重复
    jQuery.validator.addMethod("checkRoleName", function(value, element) {  
       
       var roleId = $.parentDom("#divRoleId").val();
       var roleName = $.parentDom("#divRoleName").val()
       result = false;
        $.ajax({
            url:"shang/checkRoleName.do",
            type:"post",
            data:{
        		"role.name":roleName,
        		"role.id":roleId
        	},
            async:false,
            success:function(data){
                if (data.msg == "success") {
					result = true
				}else {
					result = false
				}
            },
            error:function(data){
                result = false;
            }
        })
        return this.optional(element) || result;
    },"角色名称已经存在！");
};

/**
 * 新增角色
 */
var roleLayer;
function addRole(){
	var sizeNum = $("#sizeNum").val();
	if(sizeNum >= 18){
		$.alertPlus("角色数量已达到最大限额",9,"提示");
		return false;
	}
	$.getDialog().html($("#addRole").html());
	roleLayer = $.layerPlus({
		type : 1,
		title : ['新增角色'],
		fix : false,
		offset : ['50px','50%'],
		area : ['auto','auto'],
		shadeClose : false,
		page : {dom : '#dialog'}
	});
	if($.trim($("#driverResult").html())){
        return false;
    }
	checkRole();
}
/**
 * 修改角色
 */
var roleLayer;
function updateRole(){
	$.getDialog().html($("#addRole").html());
	roleLayer = $.layerPlus({
		type : 1,
		title : ['修改角色'],
		fix : false,
		offset : ['50px','50%'],
		area : ['auto','auto'],
		shadeClose : false,
		page : {dom : '#dialog'}
	});
	$.parentDom("#divRoleId").val($("#roleId").val());
	$.parentDom("#divRoleName").val($("#roleName").text());
	$.parentDom("#divRoleRemark").val($("#roleRemark").html());
	checkRole();
}
/**
 * 保存角色信息
 */
function saveRole(){
	if(!$.parentDom("#roleForm").valid()){
    	return false;
    }
	var statusIndex = parseInt($("#statusIndex").val());
	//空格处理
    $.parentDom("#roleForm").find("input").each(function() {
        $(this).val($.trim($(this).val()));
    });
    //判断是新增还是修改
    var url="";
    var roleId = $.parentDom("#divRoleId").val();
    if(roleId == ""){
    	url = "shang/addRole.do";
    }else {
		url = "shang/updateRole.do";
	}
	var options = {
			url:url,
			type:"post",
			beforeSend: function(){
				$.parentDom("#saveRole").attr("disabled","disabled");
			},
			success:function(data){
				if(data.msg == "success"){
					$.alertPlus("操作成功", 1, "提示");
					$.closePlus(roleLayer);
					$.parentDom("#saveRole").removeAttr("disabled","disabled");
					location.href = "shang/toTradeRoleIndex.do?statusIndex="+statusIndex;
				}else {
					$.alertPlus(data.msg, 8, "提示")
					$.parentDom("#saveRole").removeAttr("disabled","disabled");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.alertPlus("网络繁忙，请稍后重试！", 8, "提示");
				$.parentDom("#saveRole").removeAttr("disabled","disabled");
			}
	}
	$.parentDom("#roleForm").ajaxSubmit(options);
};
/**
 * 点击关闭角色新增弹出层
 */
function cancalSave(){
	$.closePlus(roleLayer);
}
/**
 * 删除物流商角色
 */
function deleteRole(){
	var roleId = $("#roleId").val();
	var roleCode = $("#roleCode").val();
	$.confirmPlus("是否确定删除选中的角色！",function(index){
		$.ajax({
			url:"shang/deleteRole.do",
			type:"post",
			data:{"role.id":roleId,"role.code":roleCode},
			success:function(data){
				if(data.msg = "success"){
					location.href = "shang/toTradeRoleIndex.do";
					$.alertPlus("操作成功",1,"提示");
				}else {
					$.alertPlus(data.msg, 8, "提示");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.alertPlus("网络繁忙，请稍后重试！", 8, "提示");
			}
		});
	}, "确认删除", function(index){
		$.closePlus(index);
	});
}