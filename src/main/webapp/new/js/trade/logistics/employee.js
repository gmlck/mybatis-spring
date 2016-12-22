

$(document).ready(function(){ 
	
	// 提示信息设置
	var message = $("#h_message").val();
	
	if (message != null && message != "") {
		
		//alert(message);
		
		//$("#h_message").val("");
		
		$.alertPlus(message, 1, "提示");
	}
})


//查询物流公司人员信息列表
$("#searchBtn").live('click', function() {
	
	 // 重置页码为1
	  $("#pageNum").val(1);
	  $("#pageSize").val(10);

	  $("#listForm").attr("action","../shang/selectPerson.do");
	  $("#listForm").attr("methond","post");
	  $("#listForm").submit();
});

//清除查询条件
$("#clearSearch").live('click', function() {
	
	$("#myNodeName").val("");
	$("#nameSearch").val("");
	$("#telSearch").val("");
//	$(".spLiFirst").click();
//	$("#eduLevelSearch").val("");
//	$("#sexSearch").val("");
});

// 初始加载新增修改页面物流公司人员信息
$("#addBtn").live('click', function() {
	
	 $("#listForm").attr("action","shang/initUpdatePerson.do");
     $("#listForm").attr("methond","post");
	 $("#listForm").submit();
});

//上页下页刷新页面
function queryEmloyee(pageNum,pageSize){

	if(!pageNum || pageNum < 1){
		
		pageNum = 1 ;
	}
	if(!pageSize || pageSize < 1){
		
		pageSize = $("#pageSize").val();
	}
	
	
	$("#pageNum").val(pageNum);
	$("#pageSize").val(pageSize);
	$("#listForm").attr("action", '../shang/selectPerson.do');
	$("#listForm").attr("methond", 'post');
	$("#listForm").submit();
}


function deletePerson(id) {
	
	$.confirmPlus("是否确定删除?", function(index){
		
	       $.closePlus(index);
	       
	       var oldId = id;

			var options = { 
			
		        url:'../shang/deletePerson.do?personId=' + oldId, //提交给哪个执行
		        type:'POST', 
		        success:function(json){

					//alert("删除成功!");
					$.alertPlus("删除成功!", 1, "提示");

				  $("#listForm").attr("action","shang/selectPerson.do");
				  $("#listForm").attr("methond","post");
				  $("#listForm").submit();
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					location.replace()
					
					//alert("删除失败!");
					$.alertPlus("删除失败!", 2, "提示");
				}
		    }; 
		    
			$('#listForm').ajaxSubmit(options);	
	       
	}, "确认删除", function(index){
		
	        $.closePlus(index);
	});
}

//批量删除
$("#deletePer").live('click', function() {
    
	// 定义个数组存id
	var arry = new Array();
	
	// 判断是否选中(1:选中，0：未选中)
	var flag = 0;
	var id;
	var objName = document.getElementsByName("checkboxPer");
	
	for (i = 0; i < objName.length; i++) {
		if (objName[i].name == "checkboxPer" && objName[i].checked) {
			arry.push(objName[i].value);

			flag = 1;
		}
	}
	
	//处理删除数据
	handeDel(flag,arry);
});	

//处理删除数据
function handeDel(flag,arry){  

	if (flag == 0) {
		$.alertPlus("至少选择一条数据", 2, "提示", function(index){
               $.closePlus(index);
        });
		return true;
	}
	
	$.confirmPlus("是否确定删除?", function(index){
		
       //window.self.location = 'deletePerson.do?array=' + arry;
       
       var options = { 
   			
	        url:'../shang/deletePerson.do?array=' + arry, //提交给哪个执行
	        type:'get', 
	        success:function(json){

				//alert("删除成功!");
				$.alertPlus("删除成功!", 1, "提示");

			  $("#listForm").attr("action","shang/selectPerson.do");
			  $("#listForm").attr("methond","post");
			  $("#listForm").submit();
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				location.replace()
				
				//alert("删除失败!");
				$.alertPlus("删除失败!", 2, "提示");
			}
	    }; 
	    
		$('#listForm').ajaxSubmit(options);	

       $.closePlus(index);
    }, "确认删除", function(index){
        $.closePlus(index);
    });
}

$(".personModify").live("click",function(){
	 
	var id = $(this).prev().val();
	window.self.location="../shang/initUpdatePerson.do?personId=" + id;
})


