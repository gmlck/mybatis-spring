$(function(){
	$("html").live("click", function(){
		$('.spinner').find('.list').hide();
		$('.line_car').animate({ height:'28'},100);
	});

	//高级查询的隐藏显示
	$('.select.clear').each(function(){
		var btn = $(this).find('.select_btns').find('a');
		var box = $(this).find('.advanced_select');
		btn.toggle(function(){
			box.animate({ height:'show'}, 100, function(){
				btn.html('普通查询');
				if(parent){
					parent.dyniframesize();
				} else{
					dyniframesize();
				}
			});
		},function(){
			box.animate({ height:'hide'}, 100, function(){
				btn.html('高级查询');
				if(parent){
					parent.dyniframesize();
				} else{
					dyniframesize();
				}
			});
		});
	});
	
	//首页菜单
	/*
	$('.index_menu').find('.title').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	*/
	
	//回到顶部
	 
	var rwidth = $(window).width();
	var mwidth = $('.main').width();
	var twidth = $(".managing_pages").width();
	
	$(".managing_pages").css("right", ((rwidth - mwidth)/2) - twidth -3 +"px");
	
	$(window).scroll(function(){
		var sc = $(window).scrollTop();
   	  	if(sc>0){
			$(".managing_pages").css("display","block");
   	  	}else{
   	  		$(".managing_pages").css("display","none");
   	  	}
	});
			  	
	$(".managing_pages .back_to_top").live("click", function(){
		$('body,html').animate({scrollTop:0},500);
	});
	
	//公用选项卡-划入鼠标触发事件
	$('.tab_move').find('.titles').find('.title').live("hover", function(){
		$(this).parents(".tab_click").find('.tab_son').hide();
		$(this).parents(".tab_click").find('.tab_son').eq($(this).index()).show();
		$(this).parents(".tab_click").find('.title').removeClass("visited");
		$(this).addClass("visited");
		
	});
	//公用选项卡-点击鼠标触发事件	
	$('.tab_click').find('.titles').find('.title').live("click", function(){
		$(this).parents(".tab_click").find('.tab_son').hide();
		$(this).parents(".tab_click").find('.tab_son').eq($(this).index()).show();
		$(this).parents(".tab_click").find('.title').removeClass("visited");
		$(this).addClass("visited");
		try{
			parent.dyniframesize();
		}catch(e){
			
		}
	});
	
	/* 列表排序按钮箭头 */
	$('.sort').find('dd').live('click', function(){
		if($(this).find('span').html() == ''){
			$(this).parents('.sort').find('dd').css('color', '#999').find('span').css('color', '#999');
			$(this).css('color', '#135DBB').find('span').css('color', '#135DBB');
			$(this).parents('.sort').find('dd').find('span').hide();
			$(this).parents('.sort').find('dd').find('span').html('');
			$(this).find('span').show();
			$(this).find('span').html('↑');
		}else if($(this).find('span').html() == '↑'){
			$(this).parents('.sort').find('dd').find('span').html('');
			$(this).find('span').html('↓');
		}else if($(this).find('span').html() == '↓'){
			$(this).parents('.sort').find('dd').find('span').html('');
			$(this).find('span').html('↑');
		}
	});
	
	/* 数据列表鼠标经过变色 */
	$('.data_list').find('.data_box').live('hover',function(){
		$('.data_list').find('.data_box').removeClass('hover');
		$(this).addClass('hover');
	});
	
	$('.line_car').find('dt').live('click', function(event){
		event.stopPropagation()
		if($(this).parents('dl').height() == 28){
			$(this).parents('dl').addClass('show');
			$(this).parents('dl').animate({ height:'56'},100);
		}else if($(this).parent().height() == 56){
			$(this).parents('dl').removeClass('show');
			$(this).parents('dl').animate({ height:'28'},100);
		}
	});
	
	$('.line_car').find('dd').live('click', function(){
		if($(this).text() == '回程车'){
			$(this).text('线路');
			$(this).prev().text('回程车');
			$(this).parents('dl').removeClass('show');
		}else{
			$(this).text('回程车');
			$(this).prev().text('线路');
			$(this).parents('dl').removeClass('show');
		}
	});
	
	//CJ选项卡 
	$(function(){
		$(".tab_btn").find("li").click(function(){
			var This=$(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			 $(".tab_cont").find("li").eq(This).show().siblings().hide();
		});
	});
	//
	(function($){
		$.fn.cjTab = function(){
			var This = this ;
			$(This).find(".tab_btn").click(function(){
				$(This).find(".tab_btn").removeClass("active");
				$(this).addClass("active");
				$(This).find(".tab_cont").eq( $(this).index(".tab_btn") ).show().siblings(".tab_cont").hide();
			});
		};
	})(jQuery);
	$.extend({     
		imgRun: function(parent) {   //无缝滚动 
			var oParent=$(parent);
			var oUl= oParent.find("ul");
			var oPrev =oParent.find(".prev");
			var oNext =oParent.find(".next");
			var Liwidth=oUl.find("li").outerWidth(true);
			oUl.html(oUl.html()+oUl.html()).css("width",Liwidth*oUl.find("li").length);
			var num=oUl.find("li").length/2;
			oPrev.on("click",function(){
				if(oUl.position().left<-Liwidth*(num-1)){
					oUl.css("left","0");				
				}
				oUl.stop().animate({left:oUl.position().left-Liwidth});	
			});
			oNext.on("click",function(){		
				if(oUl.position().left>-Liwidth){						
					oUl.css("left",-num*Liwidth+"px");
				}
				oUl.stop().animate({left:oUl.position().left+Liwidth});	
			});  
		},
		limitRun: function(parent,boxW) { 
			var oParent=$(parent);
			var oUl= oParent.find(".img_list");
			var oPrev =oParent.find(".prev");
			var oNext =oParent.find(".next");
			var Liwidth=oUl.find("li").outerWidth(true);
			oUl.css("width",Liwidth*oUl.find("li").length);
			oPrev.hover(function(){
				if(oUl.position().left<-Liwidth){
					$(this).addClass('hover');
				}
			},function(){
				$(this).removeClass('hover');
			});
			oNext.hover(function(){
				if(oUl.position().left>=-(clientWidth =(oUl.find("li").length-boxW-1)*Liwidth)){
					$(this).addClass('hover');
				}
			},function(){
				$(this).removeClass('hover');
			});
			
			oPrev.on("click",function(){
				if(oUl.position().left>-Liwidth){
					$(this).removeClass('hover');
					return;			
				}else{
					if(oUl.position().left%Liwidth==0){
						oUl.stop().animate({left:oUl.position().left+Liwidth});
					}
				}
			});
			oNext.on("click",function(){
				if(oUl.position().left<-(clientWidth =(oUl.find("li").length-boxW-1)*Liwidth)){
					$(this).removeClass('hover');
					return;
				}else{
					if(oUl.position().left%Liwidth==0){
						oUl.stop().animate({left:oUl.position().left-Liwidth});	
					}
				}
			});  
		},
		pubTab:function(parent){ //公用选项卡 
			var oParent=$(parent);
			var btnWrap=oParent.find(".btn_wrap");
			var contWrap=oParent.find(".cont_wrap");
			btnWrap.find("li").click(function(){
				var This=$(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				contWrap.find(".tab_cont").eq(This).show().siblings().hide();
			});
			
		},
		chageColor:function(parent){//隔行换色
			var oParent=$(parent);
			oParent.find('.data_box').each(function(i){
				 if(i%2==1){
					 $(this).addClass('Double');
				 }
			});
		}
	});
	
	//支持district控件
	$('.text_address').find('span').live('click', function(){
		$(this).parent().find('input:text').trigger('mouseup');
		$(this).parent().find('input:text').trigger('click');
		
	});
	//支持WdatePicker控件
	$('.text_date').find('span').live('click', function(){
		$(this).prev().focus();
	});
	
	//数据列表展开收起
	$('.show_hide').live('click',function(){
		var btn = $(this);
		var data = $(this).parents(".data_box").find('.two_data');
		if(btn.html()=='展开'){
//			alert(123);
			data.animate({ height:'show'},100,function(){
				try{parent.dyniframesize();}catch(e){};
	        });
			btn.html('收起');
		}else if(btn.html()=='收起'){
			data.animate({ height:'hide'},100,function(){
				try{parent.dyniframesize();}catch(e){};
	        });
			btn.html('展开');
		}
	});
	//下拉列表
	$('.spinner').live("click", function(event){
		event.stopPropagation();
		if($(this).hasClass("text_disable")){
			return false;
		}
		
		var width = $(this).width();
		var text = $(this).find('.text');
		var list = $(this).find('.list');
		var li = $(this).find('li');
		
		$('.spinner').find('.list').not(list).hide();
		list.toggle();
		  
		if(width < 80){
			//$(this).addClass('short');
			list.width(width+17);
		}else{
			//$(this).addClass('long');
			list.width(width+25);
		}
		if(list.height() > 150){
			list.height(150);
		}
		list.css('overflow','auto');
	});
	
	$('.spinner').find('.list').find('li').live("click", function(event){
		event.stopPropagation();
		$(this).parents(".spinner").find(".text").html($(this).text());
		var list = $('.spinner').find('.list');
		list.hide();
	});
	
	//全选控制
	$("a.data_check_all").live("click", function(){
		if($(this).text() == '全选'){
			$("body").find("a.data_check_all").text("反选");
			$(this).parents(".data_list").find("input[type='checkbox']").attr("checked", "checked");
		}else{
			var checks = $(this).parents(".data_list").find("input[type='checkbox']");
			$.each(checks, function(i, check){
				if(checks.eq(i).attr("checked")=="checked"){
					checks.eq(i).removeAttr("checked");
				}else{
					checks.eq(i).attr("checked", "checked");
				}
			});
			$("body").find("a.data_check_all").text("全选");
		}
	});
	
	//全选控制  （按钮）
	$("input.data_check_all").live("click", function(){
		if(!$(this).attr('checkAlready')){
			$(this).val("反 选");
			$(this).attr('checkAlready',true);
			$(this).parents(".data_list").find("input[type='checkbox']").attr("checked", "checked");
		}else{
			$(this).removeAttr('checkAlready');
			var checks = $(this).parents(".data_list").find("input[type='checkbox']");
			$.each(checks, function(i, check){
				if(checks.eq(i).attr("checked")=="checked"){
					checks.eq(i).removeAttr("checked");
				}else{
					checks.eq(i).attr("checked", "checked");
				}
			});
			$(this).val("全 选");
		}
	});
	
	//星级评分
	$('.synthesize.live .s_star').live("mousemove", function(e){
		var oNum = 0;
		
		var xx = e.pageX; 
		var ss = parseInt(xx - $(this).offset().left);
		
		if($(this).parents('.synthesize').hasClass('big') &&  $(this).parents('.synthesize').hasClass('live')){
			oNum = 0<=ss && ss<=17 ? 1 : (17<ss && ss<=35 ? 2 : (35<ss && ss<=53 ? 3 : (53<ss && ss<=71 ? 4 : (71<ss && ss<=89 ? 5 : 0))));
		}else if($(this).parents('.synthesize').hasClass('small') && $(this).parents('.synthesize').hasClass('live')){
			oNum = 0<=ss && ss<=12 ? 1 : (12<ss && ss<=23 ? 2 : (23<ss && ss<=34 ? 3 : (34<ss && ss<=45 ? 4 : (45<ss && ss<=56 ? 5 : 0))));
		};
		
		$(this).next('.s_grade').find('span').text(oNum);
		oNum>0 && oNum<=5 ? $(this).attr("class", "s_star grade" + oNum) : $(this).attr("class", "s_star");
	});
	
	$('.synthesize.live .s_star').live("mouseout", function(e){
		var oNum = $(this).attr("id");
		oNum = oNum ? oNum : 0;
		$(this).next('.s_grade').find('span').text(oNum);
		$(this).attr("class", "s_star grade"+oNum);
	});
	
	$('.synthesize.live .s_star').live("click", function(e){
		var oNum = $(this).next('.s_grade').find('span').text();
		$(this).attr("id", oNum);
		$(this).next('.s_grade').removeErrMsg();
	});
	
});

function liClick(eleLi, eleId_iptId, eleName_iptId, eleCode_iptId, eleSName_iptId,eleRemark_iptId){ 
	$(eleLi).parents(".spinner").parent().find("#" + eleId_iptId).attr("value", eleLi.id);
	$(eleLi).parents(".spinner").parent().find("#" + eleName_iptId).attr("value", eleLi.getAttribute('name'));
	$(eleLi).parents(".spinner").parent().find("#" + eleCode_iptId).attr("value", eleLi.getAttribute('code'));
	$(eleLi).parents(".spinner").parent().find("#" + eleSName_iptId).attr("value", eleLi.getAttribute('sName'));
	$(eleLi).parents(".spinner").parent().find("#" + eleRemark_iptId).attr("value", eleLi.getAttribute('remark'));
};

//jquery获取html的方法
jQuery.fn.extend( {
	outerHTML: function( replacement ){
		if (replacement){
			return this.each(function (){ $(this).replaceWith(replacement); });
		}
		var tmp_node = $("<div></div>").append( $(this).clone() );
		var markup = tmp_node.html();
		tmp_node.remove();
		return markup;
	}
});

//未上传图片显示的名字赋值
function uploadFileName(targetId,current){
	var newVal = $(current).val();
	$("#"+targetId).val(newVal.substr(newVal.lastIndexOf('\\')+1));
}

//扩展jquery函数
$.extend({
	//验证重复元素，有重复返回true；否则返回false
	hasRepeat: function(arr){
//	    return /(\x0f[^\x0f]+)\x0f[\s\S]*\1/.test("\x0f"+ arr.join("\x0f\x0f") +"\x0f");
		var k = {};
        for (i = 0; i < arr.length; i++) {
            if (eval("k." + arr[i]) == "1")
                return true;
            else
                eval("k." + arr[i] + "= 1");
        }
        return false;
	}
});

/**
 * 封装layer弹出层
 */
$.extend({
	/**
	 * 弹出一个层，返回该层的索引，设置参见layer的用法，索引用于手动关闭该层
	 * @param setting 设置参数，与layer一致
	 * @returns 弹出层的索引
	 */
	layerPlus: function(setting){
		return parent.layer.layer(setting);
	},
	
	/**
	 * 选择弹出层里的内容
	 * @param selector 选择器，与jquery一致
	 * @returns jquery对象
	 */
	parentDom: function(selector){
		return $(parent.window.document).find("#dialog").find(selector);
	},
	
	/**
	 * 选择iframe外的内容
	 * @param selector 选择器，与jquery一致
	 * @returns jquery对象
	 */
	parentAllDom: function(selector){
		return $(parent.window.document).find(selector);
	},
	
	/**
	 * 获取弹出层DIV
	 * @returns
	 */
	getDialog: function(){
		return $(parent.window.document).find("#dialog");
	},
	
	/** 与layer里的方法一致
	 * @param callback
	 * @returns
	 */
	readyPlus: function(callback){
		var load = '#layerCss';
		return $(load).ready(function(){
			callback();
		});
	}, 
	
	/**
	 * alert弹出信息框，与layer一致
	 * @param alertMsg 信息内容（文本）
	 * @param alertType 提示图标（整数，0-10的选择）
	 * @param alertTit 标题（文本）
	 * @param alertYes 按钮的回调函数
	 * @returns
	 */
	alertPlus: function(alertMsg , alertType, alertTit , alertYes){	//普通对话框，类似系统默认的alert()
		return $.layerPlus({
			dialog : {msg : alertMsg, type : alertType, yes : alertYes},
			title : alertTit,
			area: ['auto', 'auto']
		});
	}, 
	
	/**
	 * 确认信息框
	 * @param conMsg 信息内容（文本）
	 * @param conYes 按钮一回调
	 * @param conTit 标题（文本）
	 * @param conNo 按钮二的回调
	 * @returns
	 */
	confirmPlus: function(conMsg  , conYes , conTit , conNo){ //询问框，类似系统默认的confirm()
		return $.layerPlus({
			dialog : {msg : conMsg, type : 4, btns : 2, yes : conYes, no : conNo},
			title : conTit
		}); 
	}, 
	
	/**
	 * 普通消息框
	 * @param msgText 信息内容（文本）
	 * @param msgTime 自动关闭所需等待秒数（默认2秒）
	 * @param msgType 提示图标（整数，0-10的选择）
	 * @param callback 自动销毁后的回调函数
	 * @returns
	 */
	msgPlus: function(msgText , msgTime , msgType , callback){ //普通消息框，一般用于行为成功后的提醒,默认两秒自动关闭
		(msgText == '' || msgText == undefined) && (msgText = '&nbsp;');
		(msgTime == undefined || msgTime == '') && (msgTime = 2);
		return $.layerPlus({
			dialog : {msg : msgText, type : msgType},
			time : msgTime,
			title : ['', false],
			closeBtn : ['', false], end: function(){callback && callback();}
		});	
	}, 
	
	/**
	 * 对tips层的重新封装
	 * @param html 信息内容（文本）
	 * @param follow 触发事件对应的选择器
	 * @param time 自动关闭所需等待秒数
	 * @param maxWidth 最大宽度
	 * @param guide （上下模式）或者1（左右模式）
	 * @param style  tips样式（参加api表格一中的style属性
	 * @returns
	 */
	tipsPlus: function(html , follow , time , maxWidth, guide, style){
		return $.layerPlus({
			type : 4,
			shade : false,
			time : time,
			maxWidth : maxWidth,
			tips : {msg: html, guide: guide, follow: follow, style: style}	
		});
	}, 
	
	/**
	 * 对加载层的重新封装
	 * @param loadTime 自动关闭所需等待秒数(0时则不自动关闭)
	 * @param loadgif 加载图标（整数，0-3的选择）
	 * @param loadShade 是否遮罩（true 或 false）
	 * @returns
	 */
	loadPlus: function(loadTime , loadgif , loadShade){
		var border = true;
		loadgif === 3 && (border = false);
		return $.layerPlus({
			time : loadTime,
			shade : loadShade,
			loading : {type : loadgif},
			border :[10,0.3,'#000',border],
			type : 3,
			title : ['',false],
			closeBtn : [0 , false]
		}); 
	},
	
	/**
	 * 用于手动关闭层。参数为layer的索引值。索引即通过弹出方法返回的值
	 * @param index 层的索引
	 */
	closePlus: function(index){
		parent.layer.close(index);
	}
});

function refresh(obj) {
	obj = $(obj)[0];
	obj.src = "makeValidateCode.do?mathdata=" + Math.random();
}

//添加错误显示信息
jQuery.fn.extend( {
	//为元素添加错误信息
	addErrMsg: function(errMsg){
		$(this).removeErrMsg();
		var temp_node = "<label class='error' for='" + $(this).attr("name") + "' generated='true'>" + errMsg + "</label>";
		$(this).addClass("error").after(temp_node);
	},
	//为元素移除错误信息
	removeErrMsg: function(){
		$(this).removeClass("error");
		var next_node = $(this).next(".error");
		if(next_node){
			next_node.remove();
		}
	}
});

/*计算器开始*/
var num=0,result=0,numshow="0"; 
var operate=0; //判断输入状态的标志 
var calcul=0; //判断计算状态的标志 
var quit=0; //防止重复按键的标志 
function command(num){ 
	var str=String(document.getElementById('numScreen').value); //获得当前显示数据 
	str=(str!="0") ? ((operate==0) ? str : "") : ""; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回空值; 
	str=str + String(num); //给当前值追加字符 
	document.getElementById('numScreen').value=str; //刷新显示 
	operate=0; //重置输入状态 
	quit=0; //重置防止重复按键的标志 
} 
function dzero(){ 
	var str=String(document.getElementById('numScreen').value); 
	str=(str!="0") ? ((operate==0) ? str + "00" : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当str+"00"，否则返回"0"; 
	document.getElementById('numScreen').value=str; 
	operate=0; 
} 
function dot(){ 
	var str=String(document.getElementById('numScreen').value); 
	str=(str!="0") ? ((operate==0) ? str : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回"0"; 
	for(i=0; i<=str.length;i++){ //判断是否已经有一个点号 
		if(str.substr(i,1)==".") return false; //如果有则不再插入 
	} 
	str=str + "."; 
	document.getElementById('numScreen').value=str; 
	operate=0; 
} 
function del(){ //退格 
	var str=String(document.getElementById('numScreen').value); 
	str=(str!="0") ? str : ""; 
	str=str.substr(0,str.length-1); 
	str=(str!="") ? str : "0"; 
	document.getElementById('numScreen').value=str; 
} 
function clearscreen(){ //清除数据 
	num=0; 
	result=0; 
	numshow="0"; 
	document.getElementById('numScreen').value="0"; 
} 
function plus(){ //加法 
	calculate(); //调用计算函数 
	operate=1; //更改输入状态 
	calcul=1; //更改计算状态为加 
} 
function minus(){ //减法 
	calculate(); 
	operate=1; 
	calcul=2; 
} 
function multip(){ //乘法 
	calculate(); 
	operate=1; 
	calcul=3; 
} 
function divide(){ //除法 
	calculate(); 
	operate=1; 
	calcul=4; 
} 
function persent(){ //求余 
	calculate(); 
	operate=1; 
	calcul=5; 
} 
function equal(){ 
	calculate(); //等于 
	operate=1; 
	num=0; 
	result=0; 
	numshow="0"; 
} 
// 
function calculate(){ 
	numshow=Number(document.getElementById('numScreen').value); 
	if(num!=0 && quit!=1){ //判断前一个运算数是否为零以及防重复按键的状态 
		switch(calcul){ //判断要输入状态 
			case 1:result=num+numshow;break; //计算"+" 
			case 2:result=num-numshow;break; //计算"-" 
			case 3:result=num*numshow;break; 
			case 4:if(numshow!=0){result=num/numshow;}else{document.getElementById("note").innerHTML="被除数不能为零！"; setTimeout(clearnote,4000)} break; 
			case 5:result=num%numshow;break; 
		} 
		quit=1; //避免重复按键 
	} 
	else{ 
		result=numshow; 
	} 
	numshow=String(result); 
	document.getElementById('numScreen').value=numshow; 
	num=result; //存储当前值 
} 
function clearnote(){ //清空提示 
	document.getElementById("note").innerHTML=""; 
} 
/*计算器结束*/


/**
 * 选项集合（num1）是否包含选项（num2）
 * @param num1
 * @param num2
 * @returns {Boolean} true：包含， false:不包含
 */
function isHasOptions(num1,num2){
	return ((num1&num2) == num2);
}

/**
 * 方法描述：把给入的选项整合成选项集合
 * @return 整合结果
 */
function sumOptions(options){
	var result = 0;
	for(var i=0;i<options.length;i++){
		result = result|options[i];
	}
	return result;
}

//公共默认值效果，在需要只用的地方加class  ov
$(".ov").live("focus", function(){
	if($(this).val() == $(this).attr("ov")){
		$(this).val("");
	}
});
$(".ov").live("focusout", function(){
	if(!$(this).val()){
		$(this).val($(this).attr("ov"));
	}
});

function openUrl(domain, url){
	url = url ? url : "";
	
	var ourDomain = window.location.host;
	ourDomain = ourDomain.split(".").length == 2 ? ourDomain : ourDomain.substring(ourDomain.indexOf(".") + 1, ourDomain.length);
	
 	url = "http://" + domain + "." + ourDomain + url;
	window.open(url);
}
//获得当前页面iframe的高度
var getMain = function (){
	return $(".bms_con_right").height();
};