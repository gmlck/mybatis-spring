$("#domainForm").validate({
	rules: {
		"companyRes.companyName":{
			required: true,
			toFilter: true
		},
		"companyRes.companyDomain":{
			toFilter: true
		}
	},
	messages: {
		"companyRes.companyName":{
			required: "请输入公司名称！",
			toFilter: "请输入正确的公司名称！"
		},
		"companyRes.companyDomain":{
			toFilter: "请输入正确的公司域名！"
		}
	}
});

$("#subDomain").live("click", function(){
	if(!$("#domainForm").valid()){
		return false;
	}
	//修改
    $("#domainForm").ajaxSubmit({
        url : "subDomain.do",
        type : "post",
        dataType : "json",
        beforeSend: function(){
        	$("#companyDomain").addClass("bg_grey").attr("readonly","readonly");
        },
        success: function(data) {
            if (data.msg == "success") {
                $.alertPlus("操作成功", 1, "提示");
            } else {
                $.alertPlus(data.msg, 2, "提示");
            }
           // $("#subDomain").removeClass("btn_forbidden").removeAttr("disabled","disabled");
        },
        error:function(){
        	$.alertPlus("服务忙，请稍后再试", 8, "提示");
        	//$("#subDomain").removeClass("btn_forbidden").removeAttr("disabled","disabled");
        }
    });
});

