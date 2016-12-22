//表单校验
jQuery.validator.addMethod("mustSelect",function(value,element){
    var phoneValue=$("#connMobilePhone").val();
    var fixedValue=$("#connFixedPhone").val();
    if(phoneValue==""&&fixedValue=="")
    	{
    	 return false;
    	}else{return true;}
    
}, "手机号码和固定电话至少要填写一个！");

//验证用户名
jQuery.validator.addMethod("nameCheck", function(value, element) {
	//return this.optional(element) || /^[a-zA-Z]\w{4,20}$/.test(value);
	value=value.replace(/·/g,'');//名字中可以有“·”字符(王云鹤)
	return this.optional(element) ||/^[a-zA-Z\u4e00-\u9fa5][\w\u4e00-\u9fa5\d]{1,29}$/.test(value);
}, "请输入2-30位以字母或中文开头的字符，不能含有特殊字符!");

//城市控件 
$(document).ready(function(){
	var companyAddress = {
		id : "district", // 要使用弹出层选择省市区功能的input文本框ID
		countySync : true, // true:根据城市ID查询区县; false: 一次性查询所有区县
		isShowProvince : true, // 选择省份后是否立即显示到文本框
		isShowCity : true, // 选择城市后是否立即显示到文本框
		proUrl : "../common/queryProvince.action",
		cityUrl : "../common/queryCities.action",
		countyUrl : "../common/queryCounties.action",
		countyByCityUrl : "../common/queryCountyByCity.action",
		proId :$("#proId"),
		proName :$("#proName"),
		cityId :$("#cityId"),
		cityName :$("#cityName"),
		countyId :$("#countyId"),
		countyName :$("#countyName")
	};
	new $.district(companyAddress).init(); 
	/*//查询信息验证
	$("#querySelectAddress").validate({
		rules:{
			"selectName":{
				maxlength:30,
				onlyChinese:true
			},
			
			"selectMobilePhone":{
				isMobile: true
			}
		},
		messages:{
			"selectName":{
				maxlength:"输入的最大长度为30个字符!",
				onlyChinese:"只能输入中文"
			},
			"selectMobilePhone":{
				isTel:"请输入正确的手机号!",
			}
		  }
		});
	*/
	//个人信息验证
	$("#tradeConnectionAddressForm").validate({
		rules:{
			"tradeConnection.name":{
				required:true,
				maxlength:30,
				nameCheck:true
			},
			"tradeConnection.companyName":{
				//required:true,
				maxlength:30,
				isLegalText:true
			},
			"tradeConnection.fixedPhone":{
				isTel: true
			},
			"tradeConnection.mobilePhone":{
				isMobile: true,
				mustSelect:true
			},
			"district":{
				required: true
			},
			"tradeConnection.address":{
				required:true,
				selectAndTextAddress:"#connAddress",
				maxlength:60,
				minlength:2,
				isLegalText:true
			}
		},
		messages:{
			"tradeConnection.name":{
				required:"请输入用户真实姓名!",
				maxlength:"输入的最大长度为30个字符!",
			},
			"tradeConnection.companyName":{
				//required:"请输入公司完整名称!",
				maxlength:"输入的最大长度为30个字符!"
			},
			"tradeConnection.fixedPhone":{
				isTel:"请输入正确的固定电话!",
			},
			"tradeConnection.mobilePhone":{
				isTel:"请输入正确的手机号!",
			},
			"district":{
				required: "请选择城市！"
			},
			"tradeConnection.address":{
				required:"请输入详细地址!",
				maxlength:"输入的最大长度为60个字符!",
				minlength:"输入的最小长度为2个字符！"
			}
		 }
		});
});

//全选按钮
var check=true;
$(".data_check_all").live("click",function(){
	if(check){
	$(".checkbox").attr("checked",true);
	check=false;
	}else{
		//$(".checkbox").attr("checked",false);
		$(".checkbox").each(function(){
			$(this).attr("checked",!this.checked);              
	     });
		check=true;
	}
});
//添加联系人弹出框
var tradeAddress;
$(".edit_btn").live("click",function(){
	tradeAddress = $.layer({
		type : 1,
		title : '添加新联系人',
		fix : false,
		offset:['100px' , '50%'],
		area : ['auto','auto'],
		shadeClose : false,
		page : {dom : '#tradeAddress'}
	});
});
//关闭添加联系人框
$("#freeButton").live("click",function(){
	layer.close(tradeAddress);
	//$.closePlus(tradeAddress);
});


//点击编辑联系人
function  editConnectionInfo(connId){
	//alert(connId);
	//先清空表单
	$(':input','#tradeConnectionAddressForm')  
	.not(':button, :submit, :reset')  
	.val('');  
	
		$.ajax({   
              url:"queryContact.do",
              type:"post",
				data: {
					"tradeConnection.id":connId
				},   
				//dataType: "html",
              success: function(data){
					//alert(data.tradeConnection.isFrist);
					$("#connName").val(data.tradeConnection.name);
					$("#connCompanyName").val(data.tradeConnection.companyName);
					$("#connMobilePhone").val(data.tradeConnection.mobilePhone);
					$("#connFixedPhone").val(data.tradeConnection.fixedPhone);
					$("#connIsFrist").val(data.tradeConnection.isFrist);
					if(data.tradeConnection.cityName==null||data.tradeConnection.cityName==""){
						$("#district").val(data.tradeConnection.proName);
					}
					else if((data.tradeConnection.cityName!=null||data.tradeConnection.cityName!="")&&(data.tradeConnection.countyName==null||data.tradeConnection.countyName=="")){
						$("#district").val(data.tradeConnection.proName+"-"+data.tradeConnection.cityName);
					}else{
						$("#district").val(data.tradeConnection.proName+"-"+data.tradeConnection.cityName+"-"+data.tradeConnection.countyName);
					}
					$("#userId").val(data.tradeConnection.userId);
					$("#proId").val(data.tradeConnection.proId);
					$("#proName").val(data.tradeConnection.proName);
					$("#cityId").val(data.tradeConnection.cityId);
					$("#cityName").val(data.tradeConnection.cityName);
					$("#countyId").val(data.tradeConnection.countyId);
					$("#countyName").val(data.tradeConnection.countyName);
					$("#code").val(data.tradeConnection.code);
					$("#isValid").val(data.tradeConnection.isValid);
					$("#connAddress").val(data.tradeConnection.address);
					$("#tradeConnectionId").val(data.tradeConnection.id);
					
					//初始化联系人是否为默认联系人
					if(data.tradeConnection.isFrist=='2'){
						//alert(data.tradeConnection.isFrist);
						$("#connIsFrist").attr("checked","checked");
					}else{
						$("#connIsFrist").removeAttr("checked");
					}
					
					//初始化联系人类型
					if(data.tradeConnection.connectType=='1'){
						$("#radio2").removeAttr("checked");
						$("#radio1").attr("checked","checked");
						$("#radio1").val('1');
						$("#radio2").val('2');
					}
					if(data.tradeConnection.connectType=='2'){
						$("#radio1").removeAttr("checked");
						$("#radio2").attr("checked","checked");
						$("#radio1").val('1');
						$("#radio2").val('2');
					}
				}
			 });
		
			$("#saveButton").unbind("click");
		//编辑交易地址后保存
		$("#saveButton").click(function(){
			$("#tradeConnectionAddressForm").attr("action","editContact.do");
			var isFrist=$("#connIsFrist").val();
			$("#connIsFrist2").val(isFrist);
			if ($("#tradeConnectionAddressForm").valid()) {
				//关闭弹出层
				layer.close(tradeAddress);
				$("#tradeConnectionAddressForm").ajaxSubmit(function(data){
				if(data.msg=="success"){
					  $.alertPlus("编辑联系人成功！", 1, "提示");
					  $("#saveButton").unbind("click");
					  selectAddressList();
					 // window.location.href='initConnection.do';
					}else{
						$.alertPlus("服务器忙，编辑联系人失败！", 2, "提示");
					}
			  });
			}
		});
}

//设置为默认联系人
function defaultContact(connId){
		//先清空表单
		$(':input','#tradeConnectionAddressForm')  
		.not(':button, :submit, :reset,:radio')  
		.val('');
	
		$("#tradeConnectionAddressForm").attr("action","defaultContact.do");
		var isFrist=$("#connIsFrist").val();
		$("#connIsFrist2").val(isFrist);
		$.ajax({   
            url:"queryContact.do",
            type:"post",
			data: {
				"tradeConnection.id":connId
			},   
            success: function(data){
				$("#userId").val(data.tradeConnection.userId);
				$("#tradeConnectionId").val(data.tradeConnection.id);
				$("#connIsFrist").val(data.tradeConnection.isFrist);
				//初始化联系人类型
				if(data.tradeConnection.connectType=='1'){
					$("#radio2").removeAttr("checked");
					$("#radio1").attr("checked","checked");
					$("#radio1").val('1');
					$("#radio2").val('2');
				}
				if(data.tradeConnection.connectType=='2'){
					$("#radio1").removeAttr("checked");
					$("#radio2").attr("checked","checked");
					$("#radio1").val('1');
					$("#radio2").val('2');
				}
				$("#tradeConnectionAddressForm").ajaxSubmit(function(data){
					if(data.msg=="success"){
						  $.alertPlus("设置默认联系人成功！", 1, "提示");
						  selectAddressList();
						 // window.location.href='initConnection.do';
						}else{
							$.alertPlus("服务器忙，设置默认联系人失败！", 2, "提示");
						}
		        });
			}
		 });
}

//新增联系人
$(".data_add").live("click",function(){
	//清空表单
	$("#connName").val("");
	$("#connCompanyName").val("");
	$("#connMobilePhone").val("");
	$("#connFixedPhone").val("");
	$("#connAddress").val("");
	$("#district").val("");
	
	$("#saveButton").unbind("click");
	  $("#saveButton").click(function(){
			$("#tradeConnectionAddressForm").attr("action","addContact.do");
			var isFrist=$("#connIsFrist").val();
			$("#connIsFrist2").val(isFrist);
			$("#isValid").val("1");
			if ($("#tradeConnectionAddressForm").valid()) {
				//关闭弹出层
				layer.close(tradeAddress);
				$("#tradeConnectionAddressForm").ajaxSubmit(function(data){
				if(data.msg=="success"){
					  $.alertPlus("添加联系人成功！", 1, "提示");
					  $("#saveButton").unbind("click");
					  selectAddressList();
					  //window.location.href='initConnection.do';
					}else{
						$.alertPlus("服务器忙，添加联系人失败！", 2, "提示");
					}
			  });
			}
		});
});

//批量删除联系人
$(".data_delete").live("click",function(){
	var deleteString="";
	$(".checkbox").each(function(){
		if($(this).attr("checked")){
			deleteString+=$(this).val()+",";
		}
     });
	deleteString=deleteString.substring(0, deleteString.length - 1);
	//alert(deleteString);
	if(deleteString==null||deleteString=="")
		{
		  $.alertPlus("请至少选择一个要删除的联系人！", 2, "提示");
		 return false;
		}
	layer.confirm('确认要删除联系人？',function(index){
		layer.close(index);
		$.ajax({   
            url:"deleteSelectContact.do",
            type:"post",
			data: {
				"deleteIds":deleteString
			},
			success: function(data){
				if(data.msg=="success"){
				  $.alertPlus("联系人信息删除成功！", 1, "提示");
				  selectAddressList();
				 // window.location.href='initConnection.do';
				}else{
					$.alertPlus("服务器忙，删除联系人失败！", 2, "提示");
				}
			}
	   });
	});
});

//删除联系人
function deleteConn(connId){
	layer.confirm('确认要删除联系人？',function(index){
	layer.close(index);
    $.ajax({   
                url:"deleteContact.do",
                type:"post",
				data: {
					"tradeConnection.id":connId
				},
				success: function(data){
					if(data.msg=="success"){
					  $.alertPlus("联系人信息删除成功！", 1, "提示");
					  selectAddressList();
					 // window.location.href='initConnection.do';
					}else{
						$.alertPlus("服务器忙，删除联系人失败！", 2, "提示");
					}
				}
		   });
   });
}

//根据条件查询交易地址
$("#queryButton").live("click",function(){
	var name=$("#selectName").val();
	var phone=$("#selectMobilePhone").val();
	$.ajax({   
        url:"queryConnection.do",
        type:"post",
		data: {
			"tradeConnection.name":name,
			"tradeConnection.mobilePhone":phone
		},
		async: false,
		success: function(data){
			$(".addressList").html(data);
		  },
		error:function(XMLHttpRequest, textStatus, errorThrown) {
				layer.alert("查询操作出错！", 2, "提示");
			 }
        });
    });


//查询交易地址
function selectAddressList(pageNum, pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	
	$.ajax({
		url: "queryConnection.do",
		type: "post",
		dataType: "html",
		data: {"condition.pageNum": pageNum, "condition.pageSize": pageSize},
		async: false,
		success: function(data){
			$(".addressList").html(data);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			layer.alert("查询操作出错！", 2, "提示");
		}
	});
}