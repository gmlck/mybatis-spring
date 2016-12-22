//表单校验
jQuery.validator.addMethod("checkCardID",function(value,element){
	var result = false;
	$.ajax({
		url:"checkCardIdCode.do",
		type:"post",
		data:{"identiyCode":value},
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess=="1"){
				result = false;
			}else{
				result = true;
			}
		}
	});
	return this.optional(element) || result;
}, "身份证已经存在，请重新输入!");
$(document).ready(function(){	
	$.fn.perValid = function(){
	//个人
		$("#personConfrimForm").validate({
			rules:{
				"perConfirmDto.name":{
					required:true,
					maxlength:30,
					onlyChinese:true
				},
				"perConfirmDto.cardId":{
					required:true,
					isCard:true,
					checkCardID:true
				},
				"perConfirmDto.beginDate":{
					required:true
				},
				"perConfirmDto.endDate":{
					required:true
				},
				"cardImgShow":{
					required:true,
					isImg:true
				},
				"cardImgOtherShow":{
					required:true,
					isImg:true
				},
				"validateCode":{
					required:true,
					validateCodeCheck:true
				}
			},
			messages:{
				"perConfirmDto.name":{
					required:"请输入真实姓名!",
					maxlength:"最大30个字符!"
				},
				"perConfirmDto.cardId":{
					required:"请输入证件号码!",
					isCard:"请输入正确的证件号码!"
				},
				"perConfirmDto.beginDate":{
					required:"请输入有效期!"
				},
				"perConfirmDto.endDate":{
					required:"请输入有效期!"
				},
				"cardImgShow":{
					required:"请选择证件正面的图片!"
				},
				"cardImgOtherShow":{
					required:"请选择证件反面的图片!"
				},
				"validateCode":{
					required:"请输入验证码!"
				}
			},
			submitHandler: function(form) {  //通过之后回调
				if($("#isLeaf").val()=="3"){
					if(!confirm("原认证已审核通过,是否重新认证?")){
						return;
					}
				}
				$(form).ajaxSubmit({
					url:"../info/savePersonnelConfirm.do",
					type:"post",
					data:{"fileType":function(){
							var fileUrl = $("#cardImg").val();
							return fileUrl.substring(fileUrl.indexOf(".")+1);
						},
						"imgName":function(){
							var fileUrl = $("#cardImg").val();
							return fileUrl.substring(fileUrl.indexOf("/")+1);
						},
						"fileTypeOther":function(){
							var fileUrl = $("#cardImgOther").val();
							return fileUrl.substring(fileUrl.indexOf(".")+1);
						},
						"imgNameOther":function(){
							var fileUrl = $("#cardImgOther").val();
							return fileUrl.substring(fileUrl.indexOf("/")+1);
						}
					},
					cache:false,
					async:false,
					success:function(data){
						if(typeof(data)=="string"){
							try{
								data = JSON.parse(data);
							}catch(e){
								$.alertPlus("操作失败!请注意检查图片大小是否超过限制!",2,"提示");
								$("#validateCode").val("");
								$("#valdiateImg_per").click();
								return;
							}
						}
						if(data.isSuccess=="1"){
							$.alertPlus(data.msg,1,"提示");
							window.location.href="basicInfo.do?tabId=2";
							$("#isLeaf").val("1");
							$("#lblIsLeaf").text("已认证未审核");
							$("#all_status").text("已认证未审核");
						}else{
							$.alertPlus(data.msg,2,"提示");
						}
						$("#validateCode").val("");
						$("#valdiateImg_per").click();
					},
					error:function(data){
						$.alertPlus("操作失败!请注意检查图片大小是否超过限制!",2,"提示");
					}
				});
			}
			
		});
	};
	
	$.fn.perValid();
});

function refresh(obj) {
	obj = $(obj)[0];
	obj.src = "makeValidateCode.do?mathdata=" + Math.random();
}

function auth_li_click(srcStr){
	$("#valdiateImg_"+srcStr).click();
	$("#all_status").html($("[validstatus='status_"+srcStr+"']").html());
}

function reset_click(pre){
	window.location.href="selectNavMess.do";
}
//返回首页
function goback(){
	parent.document.getElementById("toIndex").click();
}

function changeRulesCode(currLi){
	var currCodes = $("#identity_codes").val();
	$("#identityCodeRule").rules("remove");
	if(currCodes == "identity_Type_003"){
		$("#identityCodeRule").rules("add", { required: true,armyManCard: true,checkIdentityCode:true, messages: { required: "请正确输入您的证件号码"} });
	}else{
         $("#identityCodeRule").rules("add", { required: true,isCard: true,checkIdentityCode:true, messages: { required: "请正确输入您的证件号码"} });
	}
}
window.onload=changeRulesCode;
/********************************************************/


