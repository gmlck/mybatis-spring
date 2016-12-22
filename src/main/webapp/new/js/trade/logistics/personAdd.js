$(document).ready(function(){ 
	// 检核
	$("#addForm").validate({ 
		rules:{ 
			/*"person.code":{
				required:true,
				checkPersonCode: true,
				rangelength: [1, 30],
				charAndNum: true,
				toFilter: true
			}, */
			"person.fullName":{
				required:true,
				isChs: true,
				rangelength: [1, 30],
				toFilter: true
			}, 
			"person.nickName": {
				rangelength: [1, 30],
				toFilter: true
			},
			"person.sex": {
				required: true
			},			
			"person.nodeName": {
				required: true,
			}, 
			"person.identityCode":{
				toFilter:true,
				isCard: true
			},
			"person.birthDate": {
				toFilter: true
			},
			"person.identityAddress": {
				maxlength: 100,
				toFilter: true
			},
			"person.mobilePhone":{
				required:true,
				mobile: true,
				checkPhoneEixsts:true,
				toFilter: true
			},
			"person.fixedPhone":{
				tel:true,
				toFilter: true 
			},
			"person.email":{
				email:true,
				toFilter: true,
				maxlength: 30
			},
			"person.qq":{
				digits:true,
				rangelength: [5, 11],
				toFilter: true
			}, 
			"person.connectionName":{
				maxlength: 30,
				isChs: true,
				toFilter: true
			},
			"person.connectionPhone":{
				mobileOrTel: true,
				toFilter: true 
			},
			"addressSelect": {
				required: true
			},
			"person.address": {
				required: true,
				maxlength: 60,
				toFilter: true
			},
			"user.userName":{
				maxlength: 30,
				checkUserName:true,
				toFilter: true
			}
		},
	    messages:{ 
	    	"person.code":{
				required: "请输入人员编码！",
				rangelength: "请输入正确的人员编码，长度为{0}-{1}个字符！",
				toFilter: "请输入正确的人员编码，请勿输入非法字符！"
			}, 
			"person.fullName": {
	    		required: "请输入姓名！",
	    		rangelength: "请输入正确的姓名，长度为{0}-{1}个字符！",
	    		toFilter: "请输入正确的姓名，请勿输入非法字符！"
	    	},
			"person.nickName": {
	    		rangelength: "请输入的昵称长度为{0}-{1}个字符！",
				toFilter: "请输入正确的昵称,勿输入非法字符！"
			},
			"person.sex": {
				required: "请选择人员性别！"
			},			
			"person.nodeName": {
				required: "请选择人员所属网点！"
			}, 
			"person.identityCode":{
				toFilter:"请输入正确的身份证号码！"
			},
			"person.birthDate": {
				toFilter: "请正确选择人员出生日期！"
			},
			"person.identityAddress": {
				maxlength: "请输入正确的人员身份证地址，长度最大为{0}个字符！",
				toFilter: "请输入正确的人员地址，请勿输入非法字符！"
			},
			"person.mobilePhone":{
				required: "请输入人员手机！",
				mobile: "请输入正确的人员手机！",
				toFilter: "请输入正确的人员手机，请勿输入非法字符！"
			},
			"person.fixedPhone":{
				tel:"请输入正确的人员固定电话！",
				toFilter: "请输入正确的人员固定电话，请勿输入非法字符！" 
			},
			"person.email":{
				email:"请输入正确的邮件地址！",
				toFilter: "邮件地址请勿输入非法字符！",
				maxlength: "邮件地址长度最大为{0}个字符！"
			},
			"person.qq":{
				digits: "请输入正确的QQ号码！",
				rangelength: "请输入正确的QQ号码，长度为{0}-{1}个字符！",
				toFilter: "请输入正确的QQ号码，请勿输入非法字符！"
			}, 
			"person.connectionName":{
				maxlength: "请输入正确的联系人姓名，长度最大为{0}个字符！",
				toFilter: "请输入正确的联系人姓名，请勿输入非法字符！"
			},
			"person.connectionPhone":{
				mobileOrTel: "请输入正确的联系人电话！",
				toFilter: "联系人电话请勿输入非法字符！"
			},
			"addressSelect": {
				required: "请选择人员联系地址！"
			},
			"person.address": {
				required: "请输入人员联系详细地址！",
				maxlength: "请输入人员联系详细地址，长度最大为{0}个字符！",
				toFilter: "请输入正确的联系详细地址，请勿输入非法字符！"
			},
			"user.userName":{
				maxlength: "请输入正确的用户名，长度最大为{0}个字符！",
				toFilter: "请输入正确的用户名，请勿输入非法字符！"
			}
	    }		
	}); 
	
	// 手机号是否重复验证
	jQuery.validator.addMethod("checkPhoneEixsts", function(value, element) {
		var isPass = false;
		$.ajax({
			url:"../shang/checkPhoneExists.do",
			type:"post",
			async:false,
			data:{"fieldValue":value},
			success:function(data){
				isPass = data.exist;
			},
			error:function(data){
				isPass = data.exist;
			}
		});
		return this.optional(element) || isPass;
	}, "此手机号已被注册,请用其他手机号!");
	
	
//	// 人员编码是否重复验证
//	jQuery.validator.addMethod("checkPersonCode", function(value, element) {
//		
//		var personCode = $("#personCode").val();
//		var personId = $("#personId").val();
//		
//		var isPass = false;
//		$.ajax({
//			url:"../shang/checkPersonCode.do",
//			type:"post",
//			async:false,
//			data:{"personCode":personCode,"personId":personId},
//			success:function(data){
//				isPass = data.exist;
//			},
//			error:function(data){
//				isPass = data.exist;
//			}
//		});
//		
//		return this.optional(element) || isPass;
//	}, "人员编码重复,请重新输入!");
	
	// 登录名是否重复验证
	jQuery.validator.addMethod("checkUserName", function(value, element) {
		
		var userName = $("#userName").val();
		
		var isPass = false;
		
		$.ajax({
			url:"../shang/checkPersonUserName.do",
			type:"post",
			async:false,
			data:{"userName":userName},
			success:function(data){
				isPass = data.exist;
			},
			error:function(data){
				isPass = data.exist;
			}
		});
		
		return this.optional(element) || isPass;
	}, "登录名重复,请重新输入!");
	
	
//	//字符验证
//	jQuery.validator.addMethod("isValidPassed", function(value, element) {
//		var isPass = false;
//		var isValidPassed = $("#isValidPassed").val();
//		if(isValidPassed=="1"){
//			isPass = true;
//		}
//		
//		alert(isValidPassed);
//		return this.optional(element) || isPass;
//	}, "请进行手机验证码认证!");
	
//	// 选择联系人按钮
//	$("#selectConn").click(function() {
//
//		tb_show("选择联系人", "selectConnectionList.action?width=900&height=300");
//	});

	if($("#personId").val() != null && $("#personId").val() != "") {
		
		if($("#userId").val()){
			
			$("#userName").rules("remove");
		}
	}
	
	var customerAddress = {
 		id : "addressSelect", //要使用弹出层选择省市区功能的input文本框ID
 		countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
 		isShowProvince : true, //选择省份后是否立即显示到文本框
 		isShowCity : true, //选择城市后是否立即显示到文本框
 		proUrl : "/common/queryProvince.do",
		cityUrl : "/common/queryCities.do",
		countyUrl : "/common/queryCounties.do",
		countyByCityUrl : "/common/queryCountyByCity.do",
 		proId : $("#proId"),
		proName : $("#proName"),
		cityId : $("#cityId"),
		cityName : $("#cityName"),
		countyId : $("#countyId"),
		countyName : $("#countyName")
 	};
	
	new $.district(customerAddress).init();
	
	addPassword2();

})

// 新增人员信息表
$("#saveBtn").live('click', function() {
	if($("#mobilePhoneBak").val() && $("#mobilePhoneBak").val() == $("#mobilePhone").val()){
		$("#mobilePhone").rules("remove","checkPhoneEixsts");
	} else{
		$("#mobilePhone").rules("add", {
			checkPhoneEixsts: true
		});
	}
	
	$("#personBirthDate").removeAttr("disabled");

	if(!$("#addForm").valid()){
		return false;
	}
	
	$("#addForm").ajaxSubmit({
		url: "shang/insertPerson.do",
		type: "post",
		dataType: "json",
		beforeSend: function(){
			$("#saveBtn").attr("disabled", "disabled").addClass("btn_forbidden");
		},
		success: function(data){
			if(data.message == 'success'){
				$.alertPlus("操作成功！", 1, "提示", function(index){
					$.closePlus(index);
					location.href='shang/selectPerson.do';
				});
			} else{
				$.alertPlus(data.message, 2, "提示");
				$("#saveBtn").removeAttr("disabled").removeClass("btn_forbidden");
			}
		},
		error: function(err){
			$.alertPlus("操作出错！", 2, "提示");
			$("#saveBtn").removeAttr("disabled").removeClass("btn_forbidden");
		}
	});
});

//返回列表
$("#listBtn").live('click', function() {
	
	//window.self.location ="selectPerson.do";
	window.self.location="javascript:window.history.go(-1)";
});

// 联系人姓名
function conName() {

	$("#connectionName").val($("#personName").val())
}

//将选中的联系人信息赋给文本框
function selectConn(id,name) {
   
    $("#connectionId").val(id);
    $("#connectionName").val(name);
  
    // 关闭弹出层
    tb_remove();
}

//var flag = true;
//
////  验证编码重复
//function checkCode() {
//
//	var personCode = $("#personCode").val();
//	var personId = $("#personId").val();
//
//	$.ajax({
//        
//		url : "checkPersonCode.do?personCode=" + personCode + "&personId=" + personId,
//		cache : false,
//		type : "post",
//		success : function(conData) {
//		
//			if ("" != conData.message && null != conData.message) {
//				
//				// 提示编码重复
//				$.alertPlus(conData.message, 0, "提示");
//				
//				$("#personCode").focus();
//				flag = false;
//			}
//			else {
//				
//				flag = true;
//			}
//		
//        }
//	});
//	
//	return flag;
//}

//var flag2 = true;
//
////验证用户名重复
//function checkUserName() {
//	
//	var userName = $("#userName").val();
//	var personId = $("#personId").val();
//	
//	if(personId == null || personId == "") {
//		
//		$.ajax({
//	        
//			url : "checkPersonUserName.do?userName=" + userName,
//			cache : false,
//			type : "post",
//			success : function(conData) {
//			
//				if ("" != conData.message && null != conData.message) {
//					
//					// 提示编码重复
//					$.alertPlus(conData.message, 0, "提示");
//					
//					$("#userName").focus();
//					flag2 = false;
//				}
//				else {
//					
//					flag2 = true;
//				}
//	        }
//		});
//	}
//	
//	return flag2;
//}

// 登陆用户名和密码应该同时存在
function addPassword2() {
	
	//if(checkUserName()) {
		
		var userName = $("#userName").val();
		//var password = $("#password").val();
		
		if(userName != null && userName != "") {
			
			$("#password").val("******");

			$(".check").find("input[type ='checkbox']").each(function(){
				
				$(this).removeAttr("disabled");
			});
		}
		else {
			
			$("#password").val("");
			
			$(".check").find("input[type ='checkbox']").each(function(){
				
				$(this).attr("disabled",true);
			});
		}
//	}
//	else {
//		
//		// 提示编码重复
//		$.alertPlus("该用户名已被使用,请重新输入!", 0, "提示");
//	}
	
}

function addPassword() {
	
	$("#password").val("123456");
	addPassword2();
}

$("#identityCode").live("change", function(){
	var identityCode = $(this).val();
	if(identityCode && $(this).valid()){
		var personYear = identityCode.substring(6, 10);
		var personMonth = identityCode.substring(10, 12);
		var personDate = identityCode.substring(12, 14);
		$("#personBirthDate").val(personYear + "-" + personMonth + "-" + personDate).addClass("text_disenable").attr("disabled", "disabled");
	} else{
		$("#personBirthDate").removeClass("text_disenable").removeAttr("disabled");
	}
});

/*
 * 只能处理本网点数据 
 */
//RULE-A1	若所属网点类型为“代理”或“加盟”，则人员“部门级权限”字段默认勾选。
//RULE-A2	若所属网点类型不为“代理”或“加盟”，则人员“部门级权限”字段默认不勾选。
//RULE-A3	若“部门级权限”复选框状态为选中，用户手动将其修改为不勾选时，则弹出询问提示“当前网点性质为”代理/加盟”，确定不进行部门权限控制吗？“。
//若用户点击”是“，则将”部门级权限“复选框对勾去掉，若用户点击”否“，则”部门级权限“复选框对勾保留。
//1    DIRECT  直营  NODE_TYPE  
//2    HOLDINGS  控股  NODE_TYPE
//3    AFFILIATE  加盟  NODE_TYPE 
//4    PROXY  代理  NODE_TYPE 
function changeNode(type){
	var myNodeType = type;

	$("#myNodeType").val(myNodeType);
	if($("#personCode").val()!="000"){
		if(myNodeType=="PROXY" || myNodeType=="AFFILIATE"){
			$("#sectionPower").attr("checked","checked");
		}else{
			$("#sectionPower").removeAttr("checked");
		}
	}
}

function changePower(){
	var myNodeType = $("#myNodeType").val();
	if( (myNodeType=="PROXY" || myNodeType=="AFFILIATE") && !$("#sectionPower").attr("checked") ){
		$.confirmPlus("当前网点性质为“代理/加盟”，确定取消[只能处理本网点数据]的权限控制吗？",function(index){
			$("#sectionPower").removeAttr("checked");
			$.closePlus(index);
		},"提示",function(index){
			$.closePlus(index);
		});
		return false;
	}
	return true;
}








