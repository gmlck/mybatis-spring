 function parseISO8601(dateStringInRange) {
   var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
       date = new Date(NaN), month,
       parts = isoExp.exec(dateStringInRange);
   if(parts) {
     month = +parts[2];
     date.setFullYear(parts[1], month - 1, parts[3]);
     if(month != date.getMonth() + 1) {
       date.setTime(NaN);
     }
   }
   return date;
 }


/**
 * jquery.validate相关扩展验证
 * @author Administrator
 */
//验证用户名
jQuery.validator.addMethod("userNameCheck", function(value, element) {
	//return this.optional(element) || /^[a-zA-Z]\w{4,20}$/.test(value);
	value=value.replace(/·/g,'');//名字中可以有“·”字符(王云鹤)
	return this.optional(element) ||/^[a-zA-Z\u4e00-\u9fa5][\w\u4e00-\u9fa5\d]{2,29}$/.test(value);
}, "请输入3-30位以字母或中文开头的字符，不能含有特殊字符!");
//字符验证
jQuery.validator.addMethod("stringCheck", function(value, element) {
	return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
}, "只能包括中文字、英文字母、数字和下划线");
//字符验证
jQuery.validator.addMethod("validateCodeCheck", function(value, element) {
	return this.optional(element) || /^[\w\d]{4}$/.test(value);
}, "只能输入4位英文字母或数字");
//邮政编码验证
jQuery.validator.addMethod("isEmail", function(value, element) {
	var isEmailRegex = /^((([a-z]|[A-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|[A-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|[A-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[A-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|[A-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[A-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[A-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[A-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|[A-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[A-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/.test(value);
	return this.optional(element) || isEmailRegex;
}, "请正确填写邮箱格式");
//手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
	var length = value.length;
	var mobile = /(^(13|14|15|18)\d{9}$)/;
	return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");
//电话号码验证
jQuery.validator.addMethod("isTel", function(value, element) {
	var tel = /^\d{3,4}-\d{7,8}$/; //电话号码格式010-12345678
	return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码");
//联系电话(手机/电话皆可)验证
jQuery.validator.addMethod("isPhone", function(value,element) {
	var length = value.length;
	var mobile = /(^(13|14|15|18)\d{9}$)|(^\d{3,4}-\d{7,8}$)/;
	//var tel = /^\d{3,4}-?\d{7,9}$/;
	return this.optional(element)|| mobile.test(value);
}, "请正确填写您的联系电话");
//联系电话(手机/电话皆可)验证
jQuery.validator.addMethod("isQQ", function(value,element) {
	return this.optional(element) || /^[0-9][0-9]{4,10}$/.test(value);
}, "请正确输入QQ号码(5到11位纯数字)!");
//身份证验证
jQuery.validator.addMethod("isCard", function(value,element) {
	if(value==null || $.trim(value)=='')
		return false;
	var currDate = new Date();
	var currYear = currDate.getFullYear()-1;
	//console.log("currYear="+currYear)
	var currYearFourth = currYear%10;
	//console.log("currYearFourth="+currYearFourth);
	var currYearThird = parseInt((currYear%100)/10);
	//console.log("currYearThird="+currYearThird);
	var currYearSecond = parseInt((currYear%1000)/100);
	//console.log("currYearSecond="+currYearSecond);
	var currYearFrist = parseInt((currYear%10000)/1000);
	//console.log("currYearFrist="+currYearFrist);
	
	var lastCentury = currDate.getFullYear()-100;
	var lastCenturyFourth = lastCentury%10;
	var lastCenturyThird = parseInt((lastCentury%100)/10);
	var lastCenturySecond = parseInt((lastCentury%1000)/100);
	var lastCenturyFrist = parseInt((lastCentury%10000)/1000);
	
	var regexStr1 = "("+lastCenturyFrist+"["+lastCenturySecond+"-9][0-9][0-9])";
	//var regexObj = new RegExp("("+lastCenturyFrist+"["+lastCenturySecond+"-9]["+lastCenturyThird+"-9]["+lastCenturyFourth+"-9])");
	//console.log(regexObj);
	//console.log(regexObj.test("0989"));
	//var regexObj = new RegExp("^[1-9]\\d{5}[]((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([\\d|\\X|\\x])$");
	//console.log(regexObj);
	var regexStr2 = "";
	if(currYearSecond == 0){
		if(currYearThird == 0){
			regexStr2 = "("+currYearFrist+"00[0-"+currYearFourth+"])";
		}else{
			regexStr2 = "("+currYearFrist+"0(([0-"+(currYearThird-1)+"][0-9])|("+currYearThird+"[0-"+currYearFourth+"])))";
		}
	}else{
		regexStr2 = "("+currYearFrist+"([0-"+(currYearSecond-1)+"][0-9][0-9])|("+currYearSecond+"[0-"+currYearThird+"][0-"+currYearFourth+"]))";
	}
	//var regexObj2 = new RegExp("("+currYearFrist+"[0-"+currYearSecond+"][0-"+currYearThird+"][0-"+currYearFourth+"])");
	//console.log(regexObj2);
	//console.log(regexObj2.test("2112"));
	
	var regexAll = "("+regexStr1+"|"+regexStr2+")";
	var regexObj = new RegExp("^[1-9]\\d{5}"+regexAll+"((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([\\d|\\X|\\x])$");
	var cardResult = regexObj.test(value);
	//时间对不对
	try{
		if(cardResult){
			var dateStr = value.substr(6,4)+"-"+value.substr(10,2)+"-"+value.substr(12,2);
			var brithDate;
			var browser=$.browser.msie;
			var b_version=$.browser.version;
			var versionInt = parseInt(b_version);
			if(browser && versionInt <= 8)
			{
				brithDate = parseISO8601(dateStr);
			}else{
				brithDate = new Date(dateStr);
			}
			var brithDateStr = brithDate.getFullYear()+"-"+((brithDate.getMonth()+1)>=10?(brithDate.getMonth()+1):"0"+(brithDate.getMonth()+1))+"-"+(brithDate.getDate()>=10?brithDate.getDate():"0"+brithDate.getDate());
			if(dateStr != brithDateStr){
				cardResult = false;
			}
		}
//		console.log(brithDate);
	}catch(e){
		cardResult = false;
//		console.log(e);
	}
	return this.optional(element) || cardResult;
}, "请正确输入身份证号码!");

//金额为非负数
jQuery.validator.addMethod("isPositiveMoeny",function(value,element){
	var hasPoint = /^[1-9]\d{0,6}\.{1}\d{1,2}$/;
	var noPonint = /^[1-9]\d{0,6}$/;
	var result = false;
	if(value.indexOf(".") ==-1)
		result = noPonint.test(value);
	else 
		result = hasPoint.test(value);
	return this.optional(element) || result;
},"请输入正确的非负数金额,最大金额级别百万,小数位最多为2位!");

//验证上传图片
jQuery.validator.addMethod("isImg",function(value,element){
	var img = /.(jpg|JPG|jpeg|JPEG|png|PNG|bmp|BMP|gif|GIF)$/;
	return this.optional(element) || img.test(value);
},"上传图片格式不正确!")


/*//验证非法输入字符
jQuery.validator.addMethod("isLegalText",function(value,element){
	var reg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/;
	return this.optional(element) || !reg.test(value);
},"输入包含非法字符!")*/
//script安全过滤
//特殊字符和空格校验
var toFilter=new RegExp("\script|#");
jQuery.validator.addMethod("isLegalText", function(value, element) { 
	return this.optional(element) || (!value.match(toFilter)); 
}, "请不要输入特殊字符！");

//验证非法输入字符
jQuery.validator.addMethod("onlyChinese",function(value,element){
	var reg = /^[\u4e00-\u9fa5\uff08\uff09]+$/;
	return this.optional(element) || reg.test(value);
},"只能输入中文!");

//验证非法输入字符
jQuery.validator.addMethod("onlyChineseKH",function(value,element){
	var reg = /^[\u4e00-\u9fa5\uff08\uff09\u0028\u0029]+$/;
	return this.optional(element) || reg.test(value);
},"只能输入中文!");
//验证非法输入字符
jQuery.validator.addMethod("onlyEnglishNumber",function(value,element){
	var reg = /^[\w\d]+$/;
	return this.optional(element) || reg.test(value);
},"只能输入英文或数字!");

//验证军官证
jQuery.validator.addMethod("armyManCard", function(value, element) {
	var reg = /^[\u4e00-\u9fa5]{1,2}[\d]{6,8}$/;
	return this.optional(element) ||reg.test(value);
}, "请输入正确的格式(例:参字73123865)!");

//验证工商注册号
jQuery.validator.addMethod("bsCard", function(value, element) {
	var reg = /^\d{15}$/;
	return this.optional(element) ||reg.test(value);
}, "请输入正确的格式(15位纯数字)!");

//验证数字
jQuery.validator.addMethod("isNumber", function(value, element) {
	return this.optional(element) ||/^\d+$/.test(value);
}, "请输入纯数字!");

//验证金额最小
jQuery.validator.addMethod("minPrice", function(value, element,params) {
	var result = false;
	try{
		var price = parseFloat(value.replace(",",""));
		if(price>params){
			result = true;
		}
	}catch(e){
		result = false;
	}
	return this.optional(element) || result;
}, "输入的金额太小!");

//验证金额最大
jQuery.validator.addMethod("maxPrice", function(value, element,params) {
	var result = false;
	try{
		var price = parseFloat(value.replace(",",""));
		if(price<params){
			result = true;
		}
	}catch(e){
		result = false;
	}
	return this.optional(element) || result;
}, "输入的金额太大!");

//特殊字符和空格校验
jQuery.validator.addMethod("toFilter", function(value, element) {
	var toFilter = new RegExp("[<|>|%|*]");
	return this.optional(element) || (!value.match(toFilter)); 
}, "请不要输入特殊字符！");
/**
 * 校验地址下拉框和后面的文本框
 * @param {Object} value
 * @param {Object} element
 * @param {Object} params
 * @return {TypeName} 
 */
jQuery.validator.addMethod("selectAndTextAddress", function(value ,element ,params) {
	var result = false;
	value = $.trim(value);
	if(value!=undefined && value!="" && value!="undefined"){
		var textAddress = $.trim($(params).val());
		if(textAddress!=undefined && textAddress!="" && textAddress!="undefined"){
			result = true;
		}
	}
	return result;
},"请输入完整详细的地址!");

jQuery.validator.addMethod("userNameRequired", function(value ,element) {
	var result = false;
	value = $.trim(value);
	if(value!=undefined && value!="" && value!="undefined" && value!="请输入用户名或手机号"){
		result = true;
	}
	return result;
},"请输入用户名或手机号!");

jQuery.validator.addMethod("date", function(value ,element) {
	var result = true;
	try{
		var valid_date = new Date(value);
		var valid_dateStr = valid_date.getFullYear()+"-"+((valid_date.getMonth()+1)>=10?(valid_date.getMonth()+1):"0"+(valid_date.getMonth()+1))+"-"+(valid_date.getDate()>=10?valid_date.getDate():"0"+valid_date.getDate());
		if(value != valid_dateStr){
			result = false;
		}
	}catch(e){
		result = false;
	}
	return this.optional(element) || result;
},"请输入正确的日期!");

jQuery.validator.addMethod("organCode", function(value ,element) {
	var result = false;
	value = $.trim(value);
	var regex_organCode = /^[\w\d]{8}-?[\w\d]{1}$/;
	if(regex_organCode.test(value)){
		result = true;
	}
	return result;
},"请输入正确的机构代码,示例12345678-x");

//运输许可证号
jQuery.validator.addMethod("roadCode", function(value ,element) {
	var result = false;
	value = $.trim(value);
	var regex_organCode = /^[\w]{0,1}\d{11}$/;
	if(regex_organCode.test(value)){
		result = true;
	}
	return result;
},"请输入正确的运输许可证号,示例:110113015831");

//其他特殊字符过滤
var otherFilter = new RegExp("[<|>|%|*|$|@|#|^]");
//特殊字符过滤
jQuery.validator.addMethod("otherFilter", function(value, element) { 
	return this.optional(element) || (!value.match(otherFilter)); 
}, "请不要输入特殊字符！");