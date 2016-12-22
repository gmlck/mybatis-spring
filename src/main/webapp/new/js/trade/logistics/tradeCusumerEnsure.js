
/**
 * 消费者保障启用和取消按钮点击事件
 */
$("input.subBtn").live("click", function(){
	var url = $(this).attr("id") + ".do";
	var tip = $(this).attr("tip");
	$.confirmPlus("是否确定" + tip + "！", function(index){
		$.ajax({
			url: url,
			type: "post",
			dataType: "json",
			success: function(data){
				if(data.msg == "success"){
					$.alertPlus(tip + "申请已提交！", 1, "提示");
					location.reload();
				} else{
					$.alertPlus(data.msg, 2, "提示");
				}
			},
			error: function(err){
				$.alertPlus(tip + "操作出错！", 2, "提示");
			}
		});
		
		$.closePlus(index);
	}, "确认" + tip + "?", function(index){
		$.closePlus(index);
	});
});

$(".toPrice").live("click",function(){
	location.href="../shang/toPrice.do";
});

$(".prompt_close").live("click", function(){
	$(this).parent().remove();
});
