$(document).ready(function(){
	$(".spinner").each(function(){
 			var rulesParsing = $(this).attr('class');
 	        var getRules = /default\[(.*)\]/.exec(rulesParsing);
 	        if(getRules){
 	        	var defaultIndex = getRules[1];
 	        	$(this).find(".list li").eq(defaultIndex).trigger("click");
 	        }
		});
	$("#remindForm").validate({
        rules:{ 
        	// 用户名 (更准确说是必须选择用户)
            'remind.remindDate':{required:true},
        	//合约起始时间
            'remind.content':{required:true,maxlength:30}
        },
         messages:{ 
        	//签约用户
            'remind.remindDate':{required:'请选择选择日期'},
        	//合约起始时间
            'remind.content':{required:'内容为空!',maxlength:'最多可输入30个字符'}
        }       
    });
    $('.formElement').change(function(){
    	$('#formSave').removeAttr('disabled');
    	$('#formSave').removeClass('disabled');
		$('#formMsg').html('');
    })
    $('.checkElement').change(function(){
    	$('#checkSave').removeAttr('disabled');
    	$('#checkSave').removeClass('disabled');
		$('#checkMsg').html('')
    })
    weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]; 
	var d = new Date();
	$('#month').text(d.getMonth()+1+'月');
	$('#day').text(d.getDate()+'日');
	$('#week').text(weekDay[d.getDay()]);
})
/** 领取红包*/
function receiveBonus(id){
	sendAjax('receiveBonus.do',id);
}
/** 领取优惠券*/
function receiveCoupon(id){
	sendAjax('receiveCoupon.do',id);
}
/** 删除提醒*/
function deleteRemind(id){
	sendAjax('deleteRemind.do',id);
}
function queryRemind(date){
	var d = new Date(Date.parse(date.replace(/-/ig,'/')));
	$('#month').text(d.getMonth()+1+'月');
	$('#day').text(d.getDate()+'日');
	$('#week').text(weekDay[d.getDay()]);
	$('#remindListDiv').html('');
	$('#remindListDiv').css("left","0px");
	$.ajax({
		url: 'queryRemindList.do',
		type:"post",
		dataType:"html",
		data:{
			"remind.remindDate": date 
		},
		success:function(data){
			$('#remindListDiv').html(data);
			if(d.getDate()==new Date().getDate()){
				$('#remindCount').html($('.li1').length)
			}
			changeUILength();
		},
		error:function(data){
        	$.alertPlus("服务忙，请稍后再试", 8, "提示");
		}
	});
}
/** 保存配置的提醒项*/
function saveRemindItem(){
	var array=[];
	$('[name="remindItem"]').each(function(i,obj){
		if(obj.checked){
			array.push(obj.value)
		}
	});
	var id = array.join();
	delete array;
	$.ajax({
		url: 'saveRemindItem.do',
		type:"post",
		dataType:"json",
		data:{"id": id},
		success:function(data){
			if(data.success){
				$('#checkMsg').html('提醒项设置保存成功');
				$('#checkSave').attr('disabled','disabled');
				setTimeout("$('#checkMsg').html('')",3000);
			}else{
				$.alertPlus("操作失败！", 2, "提示");
			}
		},
		error:function(data){
        	$.alertPlus("服务忙，请稍后再试", 8, "提示");
		}
	});
}
/** 领取红包或优惠券ajax 以及删除*/
function sendAjax(url,id){
	$.ajax({
		url: url,
		type:"post",
		dataType:"json",
		data:{
			"id": id 
		},
		success:function(data){
			if(data.success){
				if($('#'+id).parents('.show').find('#week').text()==weekDay[new Date().getDay()]){
					$('#remindCount').html(Number($('#remindCount').html())-1);
				}
				$('#'+id).parent().remove();
				changeUILength();
			}else{
				$.alertPlus(data.msg||"操作失败！", 2, "提示");
			}
		},
		error:function(data){
        	$.alertPlus("服务忙，请稍后再试", 8, "提示");
		}
	});
}
/** 保存提醒*/
function saveRemind(){
	if(!$("#remindForm").valid()){
		setTimeout("$('.error').html('')",3000);
		return false;
    }
    $("#remindForm").ajaxSubmit({
        url : "saveRemind.do",
        type : "post",
        dataType : "json",
        success : function(data) {
            if (data.success) {
        		$('.tab_btn_list').find('li').eq(0).trigger('click')
				$("#remindForm").find(".spinner ul li").eq(0).show().trigger("click");
        		$('.formElement').val('');
				changeUILength();
            }else {
            	$.alertPlus("操作失败！", 2, "提示");
            }
        },
        error : function(data){
        	$.alertPlus("服务忙，请稍后再试", 8, "提示");
        }
    });
}
function addFocus(){
	$('#add').click();
}
function changeUILength(){
	var oParent=$('.imgRun1_0');
	var oUl= oParent.find(".img_list");
	var oPrev =oParent.find(".prev");
	var oNext =oParent.find(".next");
	var liWidth=oUl.find("li").outerWidth(true);
	oUl.css("width",liWidth*oUl.find("li").length);
}