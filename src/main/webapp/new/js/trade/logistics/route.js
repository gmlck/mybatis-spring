$(document).ready(function(){
	
	/**
	 * 线路编辑校验
	 */
	$("#upListForm").validate({ 
	   
	    rules:{ 
	        "route.name":{
	            required: true,
	            rangelength: [1, 20],
				toFilter: true
	        },
	       /* "route.code":{
	            required: true,
	            rangelength: [1, 30],
	            charAndNum: true,
				toFilter: true,
	            routeCode:true 
	        },*/
	        "route.remake":{
	            rangelength: [1, 100],
	        	toFilter: true
	        }
	    },
	    messages:{ 
	        "route.name":{
	    	
		    	required: "请输入线路名称！",
				rangelength: "请输入正确的线路名称，长度为{0}-{1}个字符！",
				toFilter: "请输入正确的线路名称，请勿输入非法字符！"
	        },
	         "route.code":{
	        	
	        	required: "请输入线路编码！",
				rangelength: "请输入正确的线路编码，长度为{0}-{1}个字符！",
				charAndNum: "请输入正确的线路编码，格式为英文或数字！",
				toFilter: "请输入正确的线路编码，请勿输入非法字符！"
	        },
	         "route.remake":{
				rangelength: "请输入正确的线路备注，长度为{0}-{1}个字符！",
				toFilter: "请输入正确的线路备注，请勿输入非法字符！"
	        }
	    }
	    
	});

    
    /**
     *  线路管理页面enter健触发查询 
     */
    $(':input').bind('keyup', function(event){
        
       if (event.keyCode=="13"){
           /* $("#listForm").attr("action", "selectRouteAll.do");
            $("#listForm").attr("method", "post");
            $("#listForm").submit();*/
           queryinS();
       }
       
    });
    
//    if($("#lineId").val()) {	
//
//		$("#code").attr("class","text width150 text_disenable");
//		$("#code").attr("readonly","readonly");
//	}
//	else {
//		
//		$("#code").attr("class","text width150");
//		$("#code").removeAttr("readonly");
//	}

})

/**
 *  线路管理页面查询按钮 
 */
$("#seleRou").live('click', function() {
	
	/*$("#listForm").attr("action", "selectRouteAll.do");
    $("#listForm").attr("method", "post");
    $("#listForm").submit();*/
   queryinS();
	
});

/**
 *  线路管理页面清除按钮 
 */
$("#qReset").live('click', function(event) {
	
	$("#code").val("");
	$("#name").val("");
	$(".spLiFirst").click();
	$("#route.carriageWay").val("");
	$("#beginNodeName").val("");
	$("#endNodeName").val("");
	$("#beginNodeId").val("");
	$("#endNodeId").val("");
});

/**
 * 收获管理页面提货单的互斥选择
 */
$("table#neRou").find('tr').live('click', function() {
    
        var puCode = $(this).find("input").val();
        $("input:checkbox").attr("checked",false);
        var span = $('.checkbox');
        span.removeClass("checkbox_true");
        $(this).find("input[name='selectOne']").attr("checked",true);
        $(this).has("td").not('tr:last').find("span").addClass("checkbox_true");
        stops(puCode);
});

/**
 * 查询线路相关停靠点
 */
function stops(obj){

    $("#wid").val($(obj).next().val());

    $.ajax({
        
        url:"../shang/selectRouteCode.do?route.id="+$(obj).next().val(),
        type:"post",
        cache : false,
        dataType:"json",
        async:true,
         
        success:function(data){
      
            var list = data.routeList;
            
            //$("div.two_data_data").remove();
            $(obj).parent().parent().find("div.data_box").remove();
           
            $.each(list,function(i,item){
            
                var isBegin = "";
                var isEnd = "";
                
                if (item.isEnd == "1") {
                    
                    isEnd="终点站";
                }
                else {
                    
                    isEnd="&nbsp;&nbsp;&nbsp;";
                    
                }
                
                if (item.isBegin == "1") {
                    
                    isBegin="始发站";
                }
                else {
                    
                    isBegin="&nbsp;&nbsp;&nbsp;";
                }
                
                var districtName = item.proName;
                if(item.cityName && item.cityName != "null"){
                	districtName += "-" + item.cityName;
                }
                if(item.countyName && item.countyName != "null"){
                	districtName += "-" + item.countyName;
                }
                var order = i +1;
                var apd = "<div class='data_box'>" +
	                "<span class='data1'>"+ order +"</span>" +
					"<span class='data2' title='"+item.nodeName+"'>"+item.nodeName+"</span>" +
					"<span class='data3' title='"+districtName+"'>"+districtName+"</span>" +
					"<span class='data4'>"+isBegin + "</span>" +
					"<span class='data5'>"+isEnd + "</span>" +
				"</div>";
//                alert( $(obj).parent().parent().next().find(".two_data_list").html());
                
                $(obj).parent().parent().find(".data_title").append(apd);
                parent.dyniframesize();
            });
           
        },
        error:function()
        {
             $.alertPlus("服务忙，请稍后再试,error", 2, "提示");
        } 
        
    })
}


/**
 *  线路管理页面上页下页刷新页面
 */
function queryinS(pageNum, pageSize) {
    
    if (!pageNum || pageNum < 1) {
        pageNum = 1;
    }
    if (!pageSize || pageSize < 1) {
        pageSize = $("#pageSize").val();
    }
    $("#pageNum").val(pageNum);
    $("#pageSize").val(pageSize);
    $("#listForm").attr("action", "selectRouteAll.do");
    $("#listForm").attr("method", "post");
    $("#listForm").submit();
}

/**
 * 线路管理新增线路按钮
 */
var NewLine;
$("#insertOne").live("click", function(){
    window.self.location="insert.do";
    /*$("#kcode").val("");
    $("#kname").val("");
    $("#remake").val("");
    $(".spLiFirst").click();
    $("#route_carriageWay").val("");
    
    $.getDialog().html($('#newLineList').html());
    
    NewLine = $.layerPlus({
        type : 1,
        title : ['线路编辑'],
        fix : false,
        offset:['210px' , ''],
        area : ['600px','80px'],
        shadeClose : false,
        page : {dom : '#dialog'}
    });
    jiaoyan();*/
});

/**
 *  新增线路弹层的返回按钮 
 */
$.parentDom("#back").live('click', function() {
    
	$.closePlus(NewLine);
});

/**
 *  新增线路弹层的保存按钮
 */
$.parentDom("#innsert").live("click", function(){
    
    if(!$.parentDom("#newLineForm").valid()){
          return false;
      }
    
    var options = {

        url:"insertRouteOne.do",
        type:"post",
        cache : false,
        async:true,
        
        success:function(data){
           
           $.alertPlus(data.message, 1, "提示");
           $.closePlus(NewLine);
           window.self.location = "selectRouteAll.do";
               
        },
        
        error:function(data) {
            
             $.alertPlus(data.message, 2, "提示");
        }   
    };

    $.parentDom("#newLineForm").ajaxSubmit(options);

            
});

/**
 *  获取修改信息
 */
$(".upRoute").live('click', function(event) {
	var id = $(this).prev().val();
    event.stopPropagation();
    window.self.location = 'insert.do?route.id='+ id;
});
/*function UUt(i){
    
    var param = $("#id" + i).val();
    $('#newLineForm').clearForm();
    
    $.ajax({
        
        url : "insert.do?route.id=" + param,
        cache : false,
        type : "post",
        dataType : "json",
        success : function(data) {
            
            $("#newLineList").find("#rid").attr("value",data.route.id),
            $("#newLineList").find("#kcode").attr("value",data.route.code),
            $("#newLineList").find("#kname").attr("value", data.route.name),
            $("#newLineList").find("#remake").text(data.route.remake),
            $(".carria").find("li[code='"+data.route.carriageWay+"']").trigger("click");
            
            $.getDialog().html($('#newLineList').html());
            NewLine = $.layerPlus({
                type : 1,
                title : ['线路编辑'],
                fix : false,
                offset:['50px' , ''],
                area : ['auto','100px'],
                shadeClose : false,
                page : {dom : '#dialog'}
            });
            jiaoyan();
        },
        error : function(data){
             $.alertPlus(data.message, 2, "提示");
        }
    });
    
}*/
//新增线路弹层重置按钮
$.parentDom("#clear").live('click', function() {
    
    $.parentDom("#kcode").attr("value","");
    $.parentDom("#kname").attr("value","");
    $.parentDom(".carria").find("li").eq(0).trigger("click");
    $.parentDom("#remake").text("");
    
});


/**
 * 线路管理新增停靠点按钮
 */
var stop;
$("#nSto").live("click", function(){

    var checks = "";  
    //判断是否有选择线路
    $(".selectOne:checkbox:checked").each(function(){
       //选中
        checks = "is";
    }); 
    
    //如果未选'提示选择'
  /*  if  (checks == "is")   {*/

        $.getDialog().html($('#stopList').html());
        
        stop = $.layerPlus({
            type : 1,
            title : ['途经网点'],
            fix : false,
            offset:['50px' , '50%'],
    	    area : ['auto','600px'],
            shadeClose : false,
            page : {dom : '#dialog'}
        });
         
        //如果有内容就不用查询
        if($.trim($.parentDom("#stopResult").html())){
            return false;
        }
        queryStops();
        
  /*  }   else    {
        
        $.alertPlus("请选择要添加网点的线路！", 2, "提示");
        return false;
    }*/


});

/**
 *  途经网点弹层查询按钮 
 */
$.parentDom("#select").live('click', function() {
	
	queryStops();
});

/** 查询停靠点
 * @param pageNum
 * @param pageSize
 */
function queryStops(pageNum, pageSize){   
    
     if (!pageNum || pageNum < 1) {
         pageNum = 1;
     }
     if (!pageSize || pageSize < 1) {
         pageSize = 10;
        	 //$("#pageSize").val();
     }
     
     $.parentDom("#ak").find("#pageSize").val(pageSize);
     $.parentDom("#ak").find("#pageNum").val(pageNum);
    
     var options = {
        
        url:"../shang/stopsCC.do",
        type:"post",
        cache : false,
        dataType:"html",
        async:true,
        
        success:function(data){
             
           $.parentDom("#stopResult").html(data);
           //tableControl(true);
        
        },
        error:function() {
            
            $.alertPlus("服务忙，请稍后再试,error", 2, "提示");
        }   
    };

    $.parentDom("#ak").ajaxSubmit(options);
}



/**
 * 线路停靠点确定按钮事件，选择后把选中的停靠点添加到列表中
 */
$.parentDom("#confirmStops").live("click", function(){
    
    var checks =[];  

    $.parentDom("#stopResult input[type='checkbox']:checked").each(function(){

        checks.push($(this).parent().find(".stopJson").html());
    }); 
    
    if(checks.length < 1){
        
        $.alertPlus("请选择至少一个停靠点", 2, "提示");
        return false;
    }
    
    $.each(checks, function(i, obj){
        
       
        var waybill = JSON.parse(obj);
       
	   	var proName = waybill.proName;
		var cityName = waybill.cityName;
		var countryName = waybill.countyName;
		
		var allAddress = "";
		
		if (proName !=null && proName != "") {
			
			allAddress = proName;
		}
		
		if (cityName !=null && cityName != "") {
			
			allAddress = allAddress + "-" + cityName;
		}
		
		if (countryName !=null && countryName != "") {
			
			allAddress = allAddress + "-" + countryName;
		}
       
        if($("." + waybill.nodeId).length < 1){
            
            index = $(".data_box").length;                
 
            var apd =
            	"<div class='data_box " + waybill.nodeId + "'>" +
                "<span class='data1'>" + (index) + " </span>" + 
    			"<span class='data2'><input type='checkbox' class='ch' value='" + waybill.nodeId + "' name='checkbox'/></span>" + 
    			"<span class='data3'><a class='delNodes'>删除</a>|<a class='movePrev'>上移</a> | <a class='moveNext'>下移</a></span>" + 
    			"<span class='data4' title='" + waybill.nodeName + "'>" + waybill.nodeName + "</span>" + 
    			"<span class='data5' title='" + allAddress + "'>" + allAddress + "</span>" + 
    			"<span class='data6'></span>" + 
    			"<span class='data7'></span>"+
	            "<input type='hidden' class='nodeId' name='routeListNew["+ index +"].nodeId' value='" + waybill.nodeId + "' />" +
	            "<input type='hidden' class='proId' name='routeListNew["+ index +"].proId' value='" + waybill.proId + "' /> " +
	            "<input type='hidden' class='cityId' name='routeListNew["+ index +"].cityId' value='" + waybill.cityId + "'/> " +
	            "<input type='hidden' class='countyId' name='routeListNew["+ index +"].countyId' value='" + waybill.countyId + "'/> " +
	            "<input type='hidden' class='proName' name='routeListNew["+ index +"].proName' value='" + waybill.proName + "'/> " +
	            "<input type='hidden' class='cityName' name='routeListNew["+ index +"].cityName' value='" + waybill.cityName + "'/> " +
	            "<input type='hidden' class='countyName' name='routeListNew["+ index +"].countyName' value='" + waybill.countyName + "'/></div> ";

            //apd = "<div class='data_box " + waybill.nodeId + "'>" + apd + "</div>";
      
			$("div.nodeInfos").append(apd);
             
            index = index + 1;
            parent.dyniframesize();
                   // tableControl();
        }
    });
    
    //关闭弹出层
    $.closePlus(stop);
    
    seNum();
});

/**
 * 上移
 */
$(".movePrev").live('click',function(event){
    var $this= $(this).parent().parent();
    var pre=$this.prev(".data_box");
    if($(pre).length < 1){
        return false;
    }
    $(pre).before($this);
    //event.stopPropagation();
            // tableControl();
                    seNum();
});

/**
 * 下移
 */
$(".moveNext").live('click',function(event){
    var $this= $(this).parent().parent();
    var next=$this.next(".data_box");
    if($(next).length < 1){
        return false;
    }
    $(next).after($this);
    //event.stopPropagation();
            // tableControl();
                    seNum();
}); 


// 删除
$(".delNodes").live('click',function(event){

	  $(this).parent().parent().remove();
	  seNum();
});

/**
 *  修改移动后的序列号和始终点显示 
 */
function seNum(){
    var mxLength = $(".data_box").length;

    $(".data_box").each(function(index,element) {
        
    	$(element).find(".data1").first().text(index+1);
    	var order = $(element).find(".data1").first().text();
    	
    	if (order == 1) {
	  
    		$(element).find(".data6").html("始发站");
    		$(element).find(".data7").html("");
    	};
              
        if (order != 1 & order != mxLength) {
           
            $(element).find(".data6").html("");
            $(element).find(".data7").html("");
        };      
       
        if ((index+1) == mxLength) {
            $(element).find(".data6").html("");
            $(element).find(".data7").html("终点站");
        };
        
        if ((index+1) == mxLength && order == 1) {
            
            $(element).find(".data6").html("始发站");
            $(element).find(".data7").html("终点站");
        };
       
    });
}

/**
 *  线路管理页面删除停靠点按钮
 */
$("#dele").live("click",function(){

    
    if($(".data2 input[type='checkbox']:checked").length < 1){
        
          $.alertPlus("至少选择一个停靠点", 2, "提示");
    }
      
    
     $(".data2 input[type='checkbox']:checked").each(function(){
           
            $(this).parent().parent().remove();
     }); 
    
    seNum();
});


/**
 *  线路编辑页面保存按钮
 */

$("#stopSub").live('click', function() {
        
       if(!$("#upListForm").valid()){
            return false;
        } 
       
        changeRounteNa();
        
      //判断是否有要添加的停靠点
        var stopNum = $(".data_box").length;
        
        if  (stopNum > 2 || stopNum == 2)  {
        	
            //网点id
            var ary = new Array();  
    
             $(".newRow").each(function(index,element) {
                 
                 ary[index] = $(element).children().find("input").val(); 
                 
             });
             
            //最大行数
            var maxLength = $("#showNode").find('tr').find('.order').length;
              
            //存顺序号
            var arrNum = new Array();
            
            //获得停靠点的顺序
            objName = $(".linNum");
            
            //将停靠点的顺序加到数组
            for (var i=0; i < objName.length; i++) {
                
                 arrNum.push($(objName[i]).val()); 
            }
            
            //保存
             var options = {

                    //url:"insertRouteOne.do?array=" + ary ,
                    url:"../shang/insertRouteOne.do",
                    type:"post",
                    cache : false,
                    async : true,
                    
                    success:function(data){
                     
                        $.alertPlus(data.message, 1, "提示", function(index){
                            $.closePlus(index);
                            window.self.location = "../shang/selectRouteAll.do";
                        });
                     
                    },
                    error:function(data) {
                        
                         $.alertPlus(data.message, 2, "提示");
                    }   
                };
            
                $("#upListForm").ajaxSubmit(options);
                    
        }   else    {
            
            $.alertPlus("请添加最少两个停靠点", 2, "提示");
            return false;
        }
           
});


jQuery.validator.addMethod("routeCode", function(value, element) {  
       
       result = false;
        $.ajax({
            url:"../shang/repeatLineCode.do",
            type:"post",
            data:{"routeId":value,"id":function(){return $("#wid").val();}},
            async:false,
            success:function(data){
                result = data.exist;
            },
            error:function(data){
                result = data.exist;
            }
        })
        return this.optional(element) || result;
    },"线路编码重复");
    
/**
 *  修改下标 
 */
function changeRounteNa(){
    var detaii = $("div.nodeInfos .data_box");
    
    for(var i = 0; i < detaii.length; i++){
        
        detaii.eq(i).find(".nodeId").attr("name", "routeListNew[" + i + "].nodeId");
        detaii.eq(i).find(".proId").attr("name", "routeListNew[" + i + "].proId");
        detaii.eq(i).find(".cityId").attr("name", "routeListNew[" + i + "].cityId");
        detaii.eq(i).find(".countyId").attr("name", "routeListNew[" + i + "].countyId");
        detaii.eq(i).find(".proName").attr("name", "routeListNew[" + i + "].proName");
        detaii.eq(i).find(".cityName").attr("name", "routeListNew[" + i + "].cityName");
        detaii.eq(i).find(".countyName").attr("name", "routeListNew[" + i + "].countyName");
       
    }
    
} 

//批量删除
$("#deleteLine").live('click', function() {
  
	// 定义个数组存id
	var arry = new Array();
	
	// 判断是否选中(1:选中，0：未选中)
	var flag = 0;
	var id;
	var objName = document.getElementsByName("checkboxLine");
	
	for (i = 0; i < objName.length; i++) {
		if (objName[i].name == "checkboxLine" && objName[i].checked) {
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
		$.alertPlus("至少选择一条线路", 2, "提示", function(index){
             $.closePlus(index);
      });
		return true;
	}
	
	$.confirmPlus("是否确定删除?", function(index){
		
     //window.self.location = 'deletePerson.do?array=' + arry;
     
     var options = { 
 			
	        url:'../shang/deleLines.do?array=' + arry, //提交给哪个执行
	        type:'get', 
	        success:function(json){

				//alert("删除成功!");
				$.alertPlus("删除成功!", 1, "提示");

				queryinS();
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

function deleteLine(id) {
	
	$.confirmPlus("是否确定删除?", function(index){
		
	       $.closePlus(index);
	       
	        var oldId = id;

			var options = { 
			
		        url:'../shang/deleLines.do?routeId=' + oldId, //提交给哪个执行
		        type:'POST', 
		        success:function(json){

					$.alertPlus("删除成功!", 1, "提示");

					queryinS();
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					location.replace()

					$.alertPlus("删除失败!", 2, "提示");
				}
		    }; 
		    
			$('#listForm').ajaxSubmit(options);	
	       
	}, "确认删除", function(index){
		
	        $.closePlus(index);
	});
}


////全选
//$parentDom("#allid").live("click", function() {
//	
//	$(".checkSingle").attr("checked", this.checked);
//});

//$(".ch").live("click", function() {
//	
//	// 分别获取选择框个数和选中的选择框个数，如果相同则把全选框选中，否则不选中
//	var checkboxs = $(".ch").length;
//	var checkeds = $(".ch:checked").length;
//	if (checkboxs != checkeds) {
//		$("#allid").removeAttr("checked");
//	} else {
//		$("#allid").attr("checked", true);
//	}
//})


// 全选控制 （按钮）
$.parentDom("input.btn_gray").live(
	"click",
	function() {
		
		if ($(this).val() == '全 选') {
			$(this).val("反 选");
			
			$(this).parents(".box_1").find("input[type='checkbox']").attr("checked", "checked");
		} else {
			
			var checks = $(this).parents(".box_1").find(
					"input[type='checkbox']");
			
			$.each(checks, function(i, check) {
				
				if (checks.eq(i).attr("checked") == "checked") {
					
					checks.eq(i).removeAttr("checked");
				} else {
					checks.eq(i).attr("checked", "checked");
				}
			});
			
			$(this).val("全 选");
		}
	}); 














