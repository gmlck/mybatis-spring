$(document).ready(function() {
	//保存
	$("#saveBtn").click(function (){
		
		//角色
		var spreadIds ="";
		$("#roleCheck").find("input[type='checkbox']").each(function(){
			if($(this).attr("checked")){
				spreadIds = spreadIds+ $(this).val()+",";
			}	   
		});
		$("#roleIds").attr("value",spreadIds);
		
//		if(!$("#addForm").valid()){
//			return false;
//		}
		
		//异步提交表单
	  $("#addForm").ajaxSubmit({
		url:"trade/savePerson.do",
		type: "post",
		dataType: "json",
		success: function(data){
		  $("#saveBtn").attr("disabled",false);
		  var msg =data.msg;
		   if(msg=="error"){
				$.alertPlus('网络繁忙,请稍后重试.....', 2, "提示");
			}else {
				$.alertPlus("操作成功", 1, "提示",function(){
					window.self.location="trade/loadPersons.do";
				});
			}
		}
	  });
	});
	
	//返回列表
	$("#listBtn").live('click', function() {
		window.self.location="javascript:window.history.go(-1)";
	});
	
//	// 校验
//	$("#addForm").validate({ 
//		rules:{ 
//			"personDto.code":{
//				required:true,
//				checkPersonCode: true,
//				rangelength: [1, 30],
//				charAndNum: true,
//				toFilter: true
//			}, 
//			"personDto.fullName":{
//				required:true,
//				isChs: true,
//				rangelength: [1, 30],
//				toFilter: true
//			}, 
//			"personDto.nickName": {
//				rangelength: [1, 30],
//				toFilter: true
//			},
//			"personDto.sex": {
//				required: true
//			},			
//			"personDto.nodeName": {
//				required: true,
//			}, 
//			"personDto.identityCode":{
//				toFilter:true,
//				isCard: true
//			},
//			"personDto.birthDate": {
//				toFilter: true
//			},
//			"personDto.identityAddress": {
//				maxlength: 100,
//				toFilter: true
//			},
//			"personDto.mobilePhone":{
//				required:true,
//				mobile: true,
//				checkPhoneEixsts:true,
//				toFilter: true
//			},
//			"personDto.fixedPhone":{
//				tel:true,
//				toFilter: true 
//			},
//			"personDto.email":{
//				email:true,
//				toFilter: true,
//				maxlength: 30
//			},
//			"personDto.qq":{
//				digits:true,
//				rangelength: [5, 11],
//				toFilter: true
//			}, 
//			"personDto.connectionName":{
//				maxlength: 30,
//				isChs: true,
//				toFilter: true
//			},
//			"personDto.connectionPhone":{
//				mobileOrTel: true,
//				toFilter: true 
//			},
//			"addressSelect": {
//				required: true
//			},
//			"personDto.address": {
//				required: true,
//				maxlength: 60,
//				toFilter: true
//			},
//			"personDto.userDto.userName":{
//				maxlength: 30,
//				checkUserName:true,
//				toFilter: true
//			}
//		},
//	    messages:{ 
//	    	"personDto.code":{
//				required: "请输入人员编码！",
//				rangelength: "请输入正确的人员编码，长度为{0}-{1}个字符！",
//				toFilter: "请输入正确的人员编码，请勿输入非法字符！"
//			}, 
//			"personDto.fullName": {
//	    		required: "请输入姓名！",
//	    		rangelength: "请输入正确的姓名，长度为{0}-{1}个字符！",
//	    		toFilter: "请输入正确的姓名，请勿输入非法字符！"
//	    	},
//			"personDto.nickName": {
//	    		rangelength: "请输入的昵称长度为{0}-{1}个字符！",
//				toFilter: "请输入正确的昵称,勿输入非法字符！"
//			},
//			"personDto.sex": {
//				required: "请选择人员性别！"
//			},			
//			"personDto.nodeName": {
//				required: "请选择人员所属部门！"
//			}, 
//			"personDto.identityCode":{
//				toFilter:"请输入正确的身份证号码！"
//			},
//			"personDto.birthDate": {
//				toFilter: "请正确选择人员出生日期！"
//			},
//			"personDto.identityAddress": {
//				maxlength: "请输入正确的人员身份证地址，长度最大为{0}个字符！",
//				toFilter: "请输入正确的人员地址，请勿输入非法字符！"
//			},
//			"personDto.mobilePhone":{
//				required: "请输入人员手机！",
//				mobile: "请输入正确的人员手机！",
//				toFilter: "请输入正确的人员手机，请勿输入非法字符！"
//			},
//			"personDto.fixedPhone":{
//				tel:"请输入正确的人员固定电话！",
//				toFilter: "请输入正确的人员固定电话，请勿输入非法字符！" 
//			},
//			"personDto.email":{
//				email:"请输入正确的邮件地址！",
//				toFilter: "邮件地址请勿输入非法字符！",
//				maxlength: "邮件地址长度最大为{0}个字符！"
//			},
//			"personDto.qq":{
//				digits: "请输入正确的QQ号码！",
//				rangelength: "请输入正确的QQ号码，长度为{0}-{1}个字符！",
//				toFilter: "请输入正确的QQ号码，请勿输入非法字符！"
//			}, 
//			"personDto.connectionName":{
//				maxlength: "请输入正确的联系人姓名，长度最大为{0}个字符！",
//				toFilter: "请输入正确的联系人姓名，请勿输入非法字符！"
//			},
//			"personDto.connectionPhone":{
//				mobileOrTel: "请输入正确的联系人电话！",
//				toFilter: "联系人电话请勿输入非法字符！"
//			},
//			"addressSelect": {
//				required: "请选择人员联系地址！"
//			},
//			"personDto.address": {
//				required: "请输入人员联系详细地址！",
//				maxlength: "请输入人员联系详细地址，长度最大为{0}个字符！",
//				toFilter: "请输入正确的联系详细地址，请勿输入非法字符！"
//			},
//			"personDto.userDto.userName":{
//				maxlength: "请输入正确的用户名，长度最大为{0}个字符！",
//				toFilter: "请输入正确的用户名，请勿输入非法字符！"
//			}
//	    }		
//	}); 
//	
//	// 手机号是否重复验证
//	jQuery.validator.addMethod("checkPhoneEixsts", function(value, element) {
//		var isPass = false;
//		$.ajax({
//			url:"checkPhoneExists.do",
//			type:"post",
//			async:false,
//			data:{"fieldValue":value},
//			success:function(data){
//				isPass = data.exist;
//			},
//			error:function(data){
//				isPass = data.exist;
//			}
//		});
//		return this.optional(element) || isPass;
//	}, "此手机号已被注册,请用其他手机号!");
//	
//	
//	// 人员编码是否重复验证
//	jQuery.validator.addMethod("checkPersonCode", function(value, element) {
//		
//		var personCode = $("#personCode").val();
//		var personId = $("#personId").val();
//		
//		var isPass = false;
//		$.ajax({
//			url:"checkPersonCode.do",
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
//	
//	// 登录名是否重复验证
//	jQuery.validator.addMethod("checkUserName", function(value, element) {
//		
//		var userName = $("#userName").val();
//		
//		var isPass = false;
//		
//		$.ajax({
//			url:"checkPersonUserName.do",
//			type:"post",
//			async:false,
//			data:{"userName":userName},
//			success:function(data){
//				isPass = data.exist;
//			},
//			error:function(data){
//				isPass = data.exist;
//			}
//		});
//		
//		return this.optional(element) || isPass;
//	}, "登录名重复,请重新输入!");
	
});
