
function applyForFreight(){
	$.ajax({
		type:"post",
		url:"doApplyForFreight.do",
		async:false,
		success:function(data){
			if(data.isSuccess == "Y"){
				$("#apply_btn_div").html("<span>您的申请正在审核中...</span>");
				$.alertPlus("操作成功！", 1, "提示");
			}else{
				$.alertPlus(data.msg, 2, "提示");
			}
		},
		error:function(data){
			$.alertPlus("服务器正忙,请稍后再试!", 2, "提示");
		}
	})
}