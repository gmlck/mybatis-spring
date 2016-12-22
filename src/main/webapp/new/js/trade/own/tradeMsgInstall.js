$(".btn_gray").live("click", function(){
	$.confirmPlus("是否确定恢复默认提醒设置！", function(index){
		$("#form").attr("action","my/goDefault.do");
		$("#form").submit();
		$.closePlus(index);
	}, "确认恢复！", function(index){
		$.closePlus(index);
	});
	
});
$(".btn_yellow").live("click", function(){
	$.confirmPlus("是否确定保存当前提醒设置！", function(index){
		$("#form").attr("action","my/updateInstall.do");
		$("#form").submit();
		$.closePlus(index);
	}, "确认保存！", function(index){
		$.closePlus(index);
	});
	
});
//$("input").live("click",function(){
//	if($(this).val()==1){
//		$(this).attr("value",0);
//	}else{
//		$(this).attr("value",1);
//	}
//});
