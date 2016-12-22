$(function() {
	var topBeginAddressName = {
			id : "topBeginAddressName", //要使用弹出层选择省市区功能的input文本框ID
			countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
			isShowProvince : false, //选择省份后是否立即显示到文本框
			isShowCity : true, //选择城市后是否立即显示到文本框
			proId : $("#topBeginProvinceId"),
			proName : $("#topBeginProvinceName"),
			cityId : $("#topBeginCityId"),
			cityName : $("#topBeginCityName"),
			countyId : $("#topBeginCountyId"),
			countyName : $("#topBeginCountyName"),
			hotCityBack: function(data){},
			proBack: function(data){},
			cityBack: function(data){
				//queryDetailList();
			},
			countyBack: function(data){
				//queryDetailList();
			},
			clearBack: function(){
				//queryDetailList();
			}
		};
		new $.district(topBeginAddressName).init();
		var topEndAddressName = {
			id : "topEndAddressName", //要使用弹出层选择省市区功能的input文本框ID
			countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
			isShowProvince : false, //选择省份后是否立即显示到文本框
			isShowCity : true, //选择城市后是否立即显示到文本框
			proId : $("#topEndProvinceId"),
			proName : $("#topEndProvinceName"),
			cityId : $("#topEndCityId"),
			cityName : $("#topEndCityName"),
			countyId : $("#topEndCountyId"),
			countyName : $("#topEndCountyName"),
			hotCityBack: function(data){},
			proBack: function(data){},
			cityBack: function(data){
				//queryDetailList();
			},
			countyBack: function(data){
				//queryDetailList();
			},
			clearBack: function(){
				//queryDetailList();
			}
		};
		new $.district(topEndAddressName).init();
});


$("#searchBtn").live("click", function(){
	$("#topBeginName").val($("#topBeginAddressName").val());	
	$("#topEndName").val($("#topEndAddressName").val());
	var tab = $(".address_select .select .line_car dt").text();
	var hiddenName="";
	if(tab == "回程车"){
		hiddenName = "filter.";
		$("#topSearchFilterForm").attr("action", "common/listTradeTransportReturn.do?mi=3");
	}
	if(tab == "线路"){
		hiddenName = "ttpCondition.tradeTransportPrice.";
		$("#topSearchFilterForm").attr("action", "common/toLineList.do?mi=2");
	}
	
	{
		$("#topBeginProvinceId").attr("name", hiddenName+"beginProvinceId");
		$("#topBeginCityId").attr("name", hiddenName+"beginCityId");
		$("#topBeginCountyId").attr("name", hiddenName+"beginCountyId");	
		$("#topBeginProvinceName").attr("name", hiddenName+"beginProvinceName");	
		$("#topBeginCityName").attr("name", hiddenName+"beginCityName");	
		$("#topBeginCountyName").attr("name", hiddenName+"beginCountyName");	
		$("#topEndProvinceId").attr("name", hiddenName+"endProvinceId");	
		$("#topEndCityId").attr("name", hiddenName+"endCityId");	
		$("#topEndCountyId").attr("name", hiddenName+"endCountyId");	
		$("#topEndProvinceName").attr("name", hiddenName+"endProvinceName");	
		$("#topEndCityName").attr("name", hiddenName+"endCityName");	
		$("#topEndCountyName").attr("name", hiddenName+"endCountyName");	
		$("#topBeginName").attr("name", hiddenName+"beginName");	
		$("#topEndName").attr("name", hiddenName+"endName");	
	}
	
	$("#topSearchFilterForm").submit();
	
});

