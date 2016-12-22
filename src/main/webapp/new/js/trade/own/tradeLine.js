var paramJson = {};
/** 点击类别进行添加*/
function select(type,value){
	paramJson[type]=value;
	if(!pageNo || pageNo < 1){
		pageNo = 1 ;
	}
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	$("#pageNo").val(pageNo);
	$("#pageSize").val(pageSize);
	//异步提交表单
	$.ajax({
		url: "selectLine.do",
		type:"post",
		dataType:"html",
		data:paramJson,
		success:function(data){
			$("#lineList").html(data);
		},
		error:function(data){
			$.alertPlus("查询记录出错！", 2, "提示");
		}
	})
}
/** 点击城市查询*/
function selectByCity(firstLetter){
	
}

