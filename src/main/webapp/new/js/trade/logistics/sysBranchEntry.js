
//Ztree树插件
var setting = {
	data: {
		simpleData: {
			enable: true
		}
	},
	callback:{
		onClick:zTreeOnClick
	}
};

var childNode = null;

function zTreeOnClick(event,treeId,treeNode){
	childNode = treeNode.children[0];
	mmInfo(treeNode.id,treeNode.levelNum)
}

//$(document).ready(function() {
//
//	 initZTreeMenu();
//	
//});

//遍历所有菜单，组装成树形格式
function initZTreeMenu(){
	
	
	 $.ajax({
			type:"post",
			url:"../shang/queryBranchTree.do",
			datatype:"json",
			success:function(json){		
			 	$.fn.zTree.init($("#treeMenu"),setting,json.tradeBranchs);
				var treeObj = $.fn.zTree.getZTreeObj("treeMenu");
				treeObj.expandAll(true);
				parent.dyniframesize(); 
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.alertPlus("网络繁忙，请稍后重试！", 8, "提示");
	 		}
		});
}


// 获得部门机构信息
function mmInfo(nodeId,levelNum){

	try{
		
		$("#updateTradeBranch").removeClass("disabled");
		$("#delTradeBranch").removeClass("disabled");
		$("#addSysBranch").removeClass("disabled");
		
		
		$("#nodeId").val(nodeId);

		if (nodeId == "" || nodeId == null) {
			
			nodeId = $("#nodeIdFlag").val();
		}
		
		$.ajax({
	 		type:"post",
	 		data:{"branch.nodeId":nodeId,"branch.levelNum":levelNum},
	 		url:'../shang/querySysBranchById.do',
	 		dataType:"json",
	 		success:function(json){
				var branch=json.branch;
				

				
				//文本框清空
				$("#nodeCode").val("");
				$("#nodeIdFlag").val("");
				$("#branchName").val("");
				$("#simpleName").val("");
				$("#enName").val("");
				
				$("#legalPerson").val("");
				$("#phone").val("");
				$("#fixPhone").val("");
				$("#branchAddress").val("");
				$("#branchAddressSelect").val("");
				$("#myNodeId").val("");
				$("#myNodeName").val("");
				
				$("#fax").val("");
				$("#remake").val("");
				$("#serviceName").val("");
				$("#serviceCode").val("");
				$("#creditLevel").val("");
				$("#branchProId").val("");
				$("#branchCityId").val("");
				$("#branchCountyId").val("");
//				$("#levelNum").val("");
//				$("#branchId").attr("value","");
//				$("#branchType").val("");
				
				$("input[name='branch.branchType']").each(function(){

					$(this).removeAttr("checked");
				});
				 
			//	$("#01").attr("checked","checked");
				
				//文本框赋值
				$("#nodeIdFlag").val(branch.nodeId);
				$("#nodeCode").val(branch.nodeCode);
				$("#branchName").val(branch.nodeName);
				$("#simpleName").val(branch.simpleName);
				$("#enName").val(branch.enName);

				$("li[code='" + branch.type + "']").click();
				
				$(branch.type).val(branch.type);
				$("branch.type").val(branch.type);
				$("#branchAddress").val(branch.address);

				$("#branchSelect").val(branch.proName + branch.cityName+ branch.countyName);
				//$("#branchAddressSelect").val(branch.proName + branch.cityName+ branch.countyName);
				$("#myNodeId").val(branch.parentId);
				$("#myNodeName").val(branch.parentName);
				
				
				$("#legalPerson").val(branch.legalPerson);
				$("#phone").val(branch.phone);
				$("#fixPhone").val(branch.fixPhone);
				$("#branchAddressSelect").val(branch.branchAddressSelect);
				
				$("#branchProId").val(branch.proId);
				$("#branchCityId").val(branch.cityId);
				$("#branchCountyId").val(branch.countyId);
				
				

				if (branch.serviceAgent != null) {
					
					$("#serviceName").val(branch.serviceAgent.name);
					$("#serviceCode").val(branch.serviceAgent.code);
					$("#creditLevel").val(branch.serviceAgent.creditLevel);
					$("#serviceId").val(branch.serviceAgent.id);
				}
				
				
				$("#fax").val(branch.fax);
				$("#remake").val(branch.remake);
				
				if (branch.branchType != null &&  branch.branchType != "") {
					
					//定义一数组
					var strs= new Array(); 
					
					//字符分割      
					strs = branch.branchType.split(", ");
					
					for (i=0; i<strs.length; i++ ) {    
						
				      // alert("--" + strs[i] +"--");
				       $("#" +strs[i]).attr("checked","checked");
				    } 
				}	
	 		},
			error:function(XMLHttpRequest, textStatus, errorThrown){
	 			$.alertPlus("网络繁忙，请稍后重试！", 8, "提示");
			}
		});
	}catch(e){
//		alert("查询菜单信息异常"+e);
	}
};

$(function(){
	
	initZTreeMenu();
	
	var branchAddress = {
 		id : "branchSelect", //要使用弹出层选择省市区功能的input文本框ID
 		countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
 		isShowProvince : false, //选择省份后是否立即显示到文本框
 		isShowCity : true, //选择城市后是否立即显示到文本框
 		proId : $("#branchProId"),
		cityId : $("#branchCityId"),
		countyId : $("#branchCountyId"),
		proUrl : "../common/queryProvince.do", //获取省份数据的访问地址
		cityUrl : "../common/queryCities.do", //获取城市数据的访问地址
		countyUrl : "../common/queryCounties.do", //获取区县数据的访问地址
		countyByCityUrl : "../common/queryCountyByCity.do" //根据城市ID获取区县的访问地址 默认为路径../,所以没有加包路径的话就要自己配置
 	};
	new $.district(branchAddress).init();
	
	//调用表单校验方法
	branchFormValidate();
})

/**
 * 绑定表单校验规则
 */
function branchFormValidate(){
	$("#branchForm").validate({
		
		groups: {
			branchContact: "branch.phone branch.fixPhone"
		},
		
		rules: {
		/*	"branch.nodeCode": {
				required: true,
				rangelength: [1, 30],
				charAndNum: true,
				toFilter: true,
				remote: {
					type: "post",
					url: "../shang/codeExists.do",
					data: {
						"branch.nodeCode": function() {
							return $("#nodeCode").val();
						}
					},
					dataType: "html",
					dataFilter: function(data) {
						obj = JSON.parse(data);
						if (obj.msg == "success"){
							return true;
						} else{
							return true;
						}
					}
				}
			},*/
			"branch.nodeName": {
				required: true,
				rangelength: [1, 30],
				toFilter: true
			},
			"branch.simpleName": {
				maxlength: 30,
				toFilter: true
			},
			"branch.enName": {
				maxlength: 100,
				english: true,
				toFilter: true
			},
			"branch.type": {
				required: true
			},
			"branch.legalPerson": {
				required: true,
				rangelength: [1, 30],
				legealName: true,
				toFilter: true
			},
			"branch.phone": {
				require_from_group: [1,".branchContact"],
				rangelength: [1, 30],
				toFilter: true,
				mobile: true
			},
			"branch.fax": {
				rangelength: [1, 30],
				toFilter: true
			},
			"branch.AddressSelect": {
				required: true
			},
			"branch.address": {
				required:true,
				rangelength: [2, 60],
				toFilter: true
			},
			"branch.remake": {
				maxlength: 30,
				toFilter: true
			},
			"branch.fixPhone":{
				require_from_group: [1,".branchContact"],
				tel:true
			},
			"branch.fax":{
				tel:true
			}
		},
		messages: {
//			"branch.nodeCode": {
//				required: "请输入网点编码！",
//				rangelength: "请输入正确的网点编码，长度为{0}-{1}个字符！",
//				charAndNum: "请输入正确的网点编码，格式为英文或数字！",
//				toFilter: "请勿输入非法字符",
//				remote: "该网点编码已经存在！"
//			},
			"branch.nodeName": {
				required: "请输入部门机构名称！",
				rangelength: "部门机构名称，长度为{0}-{1}个字符！",
				toFilter: "请勿输入非法字符！"
			},
			"branch.simpleName": {
				maxlength: "部门机构简称，长度最大为{0}个字符！",
				toFilter: "请勿输入非法字符！"
			},
			"branch.enName": {
				maxlength: "部门机构英文名称！长度最大为{0}个字符！",
				toFilter: "请勿输入非法字符！"
			},
			"branch.type": {
				required: "请选择部门机构类型！"
			},
			"branch.legalPerson": {
				required: "请输入部门机构法人姓名！",
				rangelength: "部门机构法人姓名，长度为{0}-{1}个字符！",
				legealName: "请输入正确的部门机构法人姓名,中文或者英文！",
				toFilter:"请勿输入非法字符！"
			},
			"branch.phone": {
				required: "请输入部门机构手机！",
				rangelength: "部门机构手机，长度为{0}-{1}个字符！",
				toFilter: "请勿输入非法字符！",
				mobile:"请输入正确的部门机构手机！"
			},
			"branch.fax": {
				rangelength: "部门机构传真，长度为{0}-{1}个字符！",
				toFilter: "请勿输入非法字符！"
			},
			"branch.AddressSelect": {
				required: "请选择部门机构地址省市区！"
			},
			"branch.address": {
				required:"请输入部门机构详细地址！",
				rangelength: "部门机构详细地址，长度为{0}-{1}个字符！",
				toFilter: "请勿输入非法字符！"
			},
			"branch.remake": {
				maxlength: "部门机构备注，长度最大为{0}个字符！",
				toFilter: "请勿输入非法字符！"
			},
			"branch.fixPhone":{
				tel:"请输入有效的电话号码！"
			},
			"branch.fax":{
				tel:"请输入有效的传真号码！"
			}
		}
	});
	
//	//如果部门机构编码存在，则去除其判断编码是否存在的校验
//	if($("#nodeCode").val()){
//		$("#nodeCode").rules("remove");
//		$("input[name='branch.nodeCode']").rules("add", {
//			required: true,
//			rangelength: [1, 30],
//			toFilter: true,
//			messages: {
//				required: "请输入部门机构编码！",
//				rangelength: "请输入正确的部门机构编码，长度为{0}-{1}个字符！",
//				toFilter: "请输入正确的部门机构编码！"
//			}
//		});
//	}
}

/**
 * 清空页面文本框
 */
function clearInput(){
	
	//文本框清空
	$("#nodeCode").val("自动生成");
	$("#branchName").val("");
	$("#simpleName").val("");
	$("#enName").val("");
	
	$("#legalPerson").val("");
	$("#phone").val("");
	$("#fixPhone").val("");
	$("#branchSelect").val("");
	
	$("#fax").val("");
	$("#remake").val("");
	$("#nodeId").val("");
	$("#levelNum").val("");
	$("#myNodeId").val("");
	$("#serviceName").val("");
	$("#serviceCode").val("");
	$("#creditLevel").val("");
	$("#branchProId").val("");
	$("#branchCityId").val("");
	$("#branchCountyId").val("");
//	$("#levelNum").val("");
//	$("#branchId").attr("value","");
	$("#myNodeId").val("");
	$("#myNodeName").val("");
	
	$("#branchAddress").val("");

	$("#branchSelect").val("");

	 $("input[name='branch.branchType']").each(function(){

		$(this).removeAttr("checked");
	});
	 
	 $("#01").attr("checked","checked");
	
	//$("#nodeCode").removeClass("text_disable");
	$("#branchName").removeClass("text_disable");
	$("#simpleName").removeClass("text_disable");
	$("#enName").removeClass("text_disable");
	$("#legalPerson").removeClass("text_disable");
	$("#phone").removeClass("text_disable");
	$("#fixPhone").removeClass("text_disable");
	$("#branchSelect").removeClass("text_disable");
	$("#fax").removeClass("text_disable");
	$("#remake").removeClass("text_disable");
	$("#branchType").removeClass("text_disable");
	$("#branchAddress").removeClass("text_disable");
	$("#myNodeName").removeClass("text_disable");
	$("#myParentnode").addClass("selectNode");
	
	
	$("#branchName").attr("readonly",false);
	$("#nodeCode").attr("readonly",false);
	$("#simpleName").attr("readonly",false);
	$("#enName").attr("readonly",false);
	$("#legalPerson").attr("readonly",false);
	$("#phone").attr("readonly",false);
	$("#fixPhone").attr("readonly",false);
	$("#branchSelect").attr("disabled",false);
	$("#fax").attr("readonly",false);
	$("#remake").attr("readonly",false);
	$("#branchType").attr("readonly",false);
	$("#branchAddress").attr("readonly",false);
}


/**
 * 部门机构新增按钮事件
 */
$("#addTradeBranch").live("click", function(){
	
	$("#addSysBranch").removeClass("display_none");

	clearInput();
});

/**
 * 部门机构修改按钮事件
 */
$("#updateTradeBranch").live("click", function(){
	
	var nodeId = $("#nodeId").val();
	
	var nodeIdFlag = $("#nodeIdFlag").val();
	
	if (nodeIdFlag == null || nodeIdFlag == "") {
		
		$.alertPlus("请选择要修改的部门机构！", 2, "提示");
	}
	else {
		
		$("#addSysBranch").removeClass("display_none");

		mmInfo(nodeId,null);
		
		$("#myNodeId").val("");
		
		//$("#nodeCode").removeClass("text_disable");
		$("#branchName").removeClass("text_disable");
		$("#simpleName").removeClass("text_disable");
		$("#enName").removeClass("text_disable");
		$("#legalPerson").removeClass("text_disable");
		$("#phone").removeClass("text_disable");
		$("#fixPhone").removeClass("text_disable");
		$("#branchSelect").removeClass("text_disable");
		$("#fax").removeClass("text_disable");
		$("#remake").removeClass("text_disable");
		$("#branchType").removeClass("text_disable");
		$("#branchAddress").removeClass("text_disable");
		$("#myNodeName").removeClass("text_disable");
		$("#myParentnode").addClass("selectNode");
		
		
		$("#branchName").attr("readonly",false);
		//$("#nodeCode").attr("readonly",false);
		$("#simpleName").attr("readonly",false);
		$("#enName").attr("readonly",false);
		$("#legalPerson").attr("readonly",false);
		$("#phone").attr("readonly",false);
		$("#fixPhone").attr("readonly",false);
		$("#branchSelect").attr("disabled",false);
		$("#fax").attr("readonly",false);
		$("#remake").attr("readonly",false);
		$("#branchType").attr("readonly",false);
		$("#branchAddress").attr("readonly",false);
		
	}
});

/**
 * 部门机构删除按钮事件
 */
$("#delTradeBranch").live("click", function(){
	
	var nodeIdFlag = $("#nodeIdFlag").val();
	
	if (nodeIdFlag == null || nodeIdFlag == "") {
		
		$.alertPlus("请选择要修改的部门机构！", 2, "提示");
	}
	else {

		if (childNode != null) {
			
			$.alertPlus("拥有下级部门的机构不能被删除！", 2, "提示");
		}
		else {
			
			var nodeId = $("#nodeId").val();

			$.confirmPlus("是否确定删除该部门机构！", function(index){
				$.ajax({
					url: "../shang/delSysBranchById.do",
					type: "post",
					data: {"branch.nodeId": nodeId},
					dataType: "json",
					success: function(data){
						if(data.msg == "success"){
							$.alertPlus("部门机构删除操作成功！", 1, "提示");
							location.href='../shang/toSysBranchEntry.do';
						} else{
							$.alertPlus(data.msg, 2, "提示");
						}
					},
					error: function(data){
						$.alertPlus("部门机构删除操作出错！", 2, "提示");
					}
				});
			}, "确认删除", function(index){
				$.closePlus(index);
			});
		}
	}
});

/**
 * 部门机构刷新按钮事件
 */
$("#freshTradeBranch").live("click", function(){

	location.href='../shang/toSysBranchEntry.do';
});

/**
 * 部门机构保存按钮事件
 */
$("#addSysBranch").live("click", function(){
	
	$(this).addClass("btn_gray");
	
	$("#branchForm input").each(function(){
		$(this).val($.trim($(this).val()));
	});
	
	if(!$("#branchForm").valid()){
		
		$("#addSysBranch").removeClass("btn_gray").addClass("btn_yellow");
		
		return false;
	}
	
	var url = $("#nodeId").val() ? "../shang/updateSysBranchById.do" : "../shang/addSysBranch.do";
	var nodeCode=$("#nodeCode").val();
	var option = {
		url: url,
		type: "post",
		dataType: "json",
		beforeSend: function(){
			//$("#addSysBranch").removeAttr("hover").addClass("btn_full_hidden").attr("disabled","disabled");
		},
		success: function(data){
			
			if(data.msg == "success"){
				
				$.alertPlus("部门机构操作成功！", 1, "提示", function(index){//点击后再跳转
					
					//location.href = "toSysBranchIndex.do";
					$.closePlus(index);
					location.href='../shang/toSysBranchEntry.do';
				});
			} else{
				$.alertPlus(data.msg, 2, "提示");
				$("#addSysBranch").removeClass("btn_gray").addClass("btn_yellow");
			}
		},
		error: function(data){
			$.alertPlus("部门机构操作失败！", 2, "提示");
			$("#addSysBranch").removeClass("btn_gray").addClass("btn_yellow");
		}
	};
	$("#branchForm").ajaxSubmit(option);
});

$("#nodeReturn").live("click",function(){
	window.self.location="javascript:window.history.go(-1)";
});
$("#selectService").live('click',function(){
	
});

/**
 * 点击查询，弹出服务商选择层
 */
var serviceListDialog;
$(".nodeService").live("click", function(){
	mark = $(this).attr("id");
	
	$.getDialog().html($('#nodeServiceSelect').html());
	serviceListDialog = $.layerPlus({
		type : 1,
		title : ['选择服务商'],
		fix : false,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shadeClose : false,
		page : {dom : '#dialog'}
	});

//	if($.trim($.parentDom("#connectionResult").html())){
//		return false;
//	}

	queryServiceList();
});

/**
 * 服务商弹出层查询事件
 */
$.parentDom("#queryServiceList").live("click",function(){
	queryServiceList();
});
/**
 * 查询所有的服务商信息，列表显示
 */
function queryServiceList(pageNum, pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	
	var serviceName = $.parentDom("#serviceName").val();
	var serviceCode = $.parentDom("#serviceCode").val();
	$.ajax({
		type:"post",
		url:"../shang/serviceList.do",
		dataType:"html",
		data:{
			"pageSize": pageSize, 
			"pageNum": pageNum, 
			"serviceAgent.name":serviceName,
			"serviceAgent.code":serviceCode
		},
		success:function(data){
			$.parentDom("#nodeServiceSelect").html(data);
		},
		error:function(data){
			$.alertPlus("查询服务商出错！", 2, "提示");
		}
	});
}
//确定服务商
function sureService(obj){
	
	var obj = JSON.parse($(obj).find("span").html());
	$("#serviceName").val(obj.name);
	$("#serviceCode").val(obj.code);
	$("#creditLevel").val(obj.creditLevel);
	$("#serviceId").val(obj.id);
	$.closePlus(serviceListDialog);
};
$(".nodeServiceClear").live('click',function(){
	$("#serviceName").val("");
	$("#serviceCode").val("");
	$("#creditLevel").val("");
	$("#serviceId").val("");
});
$(function(){
//	if($("#nodeCode").val()=="000"){
//		$(".show").html("3、其他信息");
//	}
});




