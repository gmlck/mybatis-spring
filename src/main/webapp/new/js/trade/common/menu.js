$(function(){
	$('.one_menu').find('.one_menu_title').live('click', function(){
		if($(this).find('span').hasClass('fewer')){
			$(this).find('span').removeClass('fewer');
			$(this).siblings('ul').animate({height:'show'},300);
		}else{
			$(this).find('span').addClass('fewer');
			$(this).siblings('ul').animate({height:'hide'},300);
		}
	});
});
var myBasePath = $("#basePath").val();
$.fn.initMenu = function(){
	if(!window.menuJsonStr){
		return false;
	}
	$.each(menuJsonStr,function(idx,menu){
		//一级菜单 
		if(menu.levelNum === "1" && menu.menuType == menuType){
			var menuli = "<li><div class=\"one_menu_title\"><span></span><a href='"+myBasePath+menu.className+"' target='mainIFrame'>"+menu.menuName+"</a></div><ul id="+menu.menuId+">";
			menuli += "</ul></li>";
			$("#one_menu").append(menuli);
		}
	});

	$.each(menuJsonStr,function(idx,menu){
		//二级菜单
		if(menu.levelNum == "2" && menu.menuType == menuType){
			var menuli = "<li class=\"two_menu\"><a href='"+myBasePath+menu.className+"' target='mainIFrame'>"+menu.menuName+"</a></li>";
			$("#"+menu.chrId2).append(menuli);
		}
	});
}
$.fn.initMenu();

$.fn.initMenuV = function(){
	if(!window.menuJsonStr){
		return false;
	}
	$.each(menuJsonStr,function(idx,menu){
		//一级菜单 
		if(menu.levelNum === "1" && menu.menuType == window.menuTypeV){
			//var menuli = "<li><div class=\"one_menu_title\"><span></span><a href='"+menu.className+"' target='mainIFrame'>"+menu.menuName+"</a></div><ul id="+menu.menuId+">";
			var menuli = "<span class=\"title\"><a href='"+myBasePath+menu.className+"'>"+menu.menuName+"</a></span>";
			$("#menuV").append(menuli);
		}
	});
}

$.fn.initMenuV();

/**
 * 商铺网站链接如果没有则给出提示
 */
$(".noDomain").live("click", function(){
	layer.alert("您尚未开通商铺网站！",9,"提示");
})