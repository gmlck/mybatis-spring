
/**
 * 出发网点框点击事件，点击后弹出网点选择层
 */
var nodeLayer;
var nodeOpt;
$(".selectNode").live("click", function(){
	nodeOpt = $(this).attr("id");

	$.getDialog().html($('#sysNodeList').html());
	nodeLayer = $.layerPlus({
		type : 1,
		title : ['选择部门'],
		fix : false,
		offset:['50px' , '50%'],
	    area : ['auto','600px'],
		shadeClose : false,
		page : {dom : '#dialog'}
	});
	
	querySysNodeList();
});

/**
 * 网点弹出层查询事件
 */
$.parentDom("#querySysNodeList").live("click",function(){

	querySysNodeList();
});

/**
 * 网点弹出层清除事件
 */
$.parentDom("#clearSysNodeList").live("click",function(){

	$.parentDom("#noCode").val("");
	$.parentDom("#noName").val("");
});

/**
 * 查询网点信息，列表显示
 */
function querySysNodeList(pageNum, pageSize){
	
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	
	var branchType = "";
	
	if(nodeOpt == "beginNode" || nodeOpt == "endNode"){
		
		branchType = "01";
	}
	
	var noCode = $.parentDom("#noCode").val();
	var noName = $.parentDom("#noName").val();

	$.ajax({
		type:"post",
		url:"../shang/selectDeparts.do",
		dataType:"html",
		data:{
			"pageSize": pageSize, 
			"pageNum": pageNum,
			"departDto.code":noCode,
			"departDto.name":noName,
			"departDto.branchType":branchType
		},
		success:function(data){
			
			$.parentDom("#sysNodeResult").html(data);
		},
		error:function(data){
			//alert("查询网点出错！");
		}
	});
}

//确定网点
function sureNode(id,name,levelNum,type){
	
	if(nodeOpt == "mynode"){
		$("#myNodeId").attr("value",id);
		$("#myNodeName").attr("value",name);
		//$("#myLevelNum").attr("value",levelNum);

		//回调函数
	    try{
	        if(typeof(eval(changeNode)) == "function"){
	        	changeNode(type);
	        }
	    }catch(e){
	        //alert(e);
	    }
	}
	else if(nodeOpt == "beginNode"){
		
		$("#beginNodeId").val(id);
		$("#beginNodeName").attr("value", name);
	} 
	else if(nodeOpt == "endNode"){
		
		$("#endNodeId").val(id);
		$("#endNodeName").attr("value", name);
	} 
	else if(nodeOpt == "myParentnode"){
		
		var nodeId = $("#nodeId").val();

		if(nodeId != null && nodeId == id){
			
			$.alertPlus("部门的上级部门不能为自身！", 2, "提示");
		}else{
			
			$("#myNodeId").attr("value",id);
			$("#myNodeName").attr("value",name);
			$("#myLevelNum").attr("value",levelNum);
		}
	}
	
	
	$.closePlus(nodeLayer);
	
}
