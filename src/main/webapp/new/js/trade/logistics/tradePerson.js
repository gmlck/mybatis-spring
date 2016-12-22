$(document).ready(function() {
	//提示信息
	if($("#msg").val()!=null&&$("#msg").val()!=""){
		alert($("#msg").val());
	}

});

//初始加载新增修改页面物流公司人员信息
$("#addBtn").live('click', function() {
	// 跳转至action
    window.self.location = 'trade/loadAddPerson.do';
});

//查询人员信息
$("#searchBtn").live('click',function (){
	queryPer();
	
});

// 清除
$("#clearSearch").live('click',function() {

	$("#nameSearch").attr("value","");
	$("#telSearch").attr("value","");
	$("#myNodeName").attr("value","");
	$("#myNodeId").attr("value","");
	
});

//删除
function delectOne(id){
	$.confirmPlus("您确定要删除这名人员的信息吗?",function(index){
	   $.ajax( {
		url : "trade/delectPerson.do?id="+id,
		cache : false,
		type : "post",
		success : function(data) {
			var msg =data.msg;
			if(msg =='error'){
				$.alertPlus('网络繁忙,请稍后重试.....', 2, "提示");
			}else{
				queryPer();
			}
			$.closePlus(index);
		}
	  });
  	 },"提示信息",function(index){
		$.closePlus(index);
  	});   
}

// 上页下页刷新页面
function queryPer(pageNum){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	//空格处理
	$("#perForm").find("input").each(function(){
		$(this).val($.trim($(this).val()));
	});
	$("#pageNum").val(pageNum);
	  //异步提交表单
	  $("#perForm").ajaxSubmit({
		url:"trade/selectPersons.do",
		type: "post",
		dataType: "html",
		success: function(data){
		  if(data.msg =="error"){
			  $.alertPlus('网络繁忙,请稍后重试.....', 2, "提示");
		  }else{
			  $("#perData").html(data);
			  parent.dyniframesize();
		  }
		}
	 });
}
//编辑初始化页面
function editPerson(id){
	window.self.location = 'trade/selectOnePer.do?id='+id;
}