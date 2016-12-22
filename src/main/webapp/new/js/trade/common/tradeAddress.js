$(document).ready(function() {

   // 选择起始地址
   $("#beginAddressName").live("click",function(){
	   addressSelect("beginAddressName","#beginProvinceId",
		   "#beginProvinceName","#beginCityId","#beginCityName","#beginCountyId","#beginCountyName");
   });
   //选择终止地址
   $("#endAddressName").live("click",function(){
	   if($(this).hasClass("text_disenable")){
		   return false;
	   }
	   addressSelect("endAddressName","#endProvinceId",
		   "#endProvinceName","#endCityId","#endCityName","#endCountyId","#endCountyName");
   });
   //选择卸货地址(只保存，省，市，县一个值)
   $("#loadAdressName").live("click",function(){
	   addressOne("loadAdressName","#unloadAdressId","#unloadAdressName");
   });
})
//地址选择
function addressSelect(flagName,proId,proName,cityId,cityName,countyId,countyName) {
	var setting1 = {
		id : flagName, // 要使用弹出层选择省市区功能的input文本框ID
		countySync : true, // true:根据城市ID查询区县; false: 一次性查询所有区县
		isShowProvince : true, // 选择省份后是否立即显示到文本框
		isShowCity : true, // 选择城市后是否立即显示到文本框
		proUrl : "common/queryProvince.action",
		cityUrl : "common/queryCities.action",
		countyUrl : "common/queryCounties.action",
		countyByCityUrl : "common/queryCountyByCity.action",
		proId : $(proId),
		proName : $(proName),
		cityId : $(cityId),
		cityName : $(cityName),
		countyId : $(countyId),
		countyName : $(countyName)
		
	}
	new $.district(setting1).init(true);
}
//地址选择（保存省，市，县的一个）
function addressOne(flagName,loadId,loadName) {

	var setting2 = {
		id : flagName, // 要使用弹出层选择省市区功能的input文本框ID
		countySync : true, // true:根据城市ID查询区县; false: 一次性查询所有区县
		isShowProvince : true, // 选择省份后是否立即显示到文本框
		isShowCity : true, // 选择城市后是否立即显示到文本框
		proUrl : "common/queryProvince.action",
		cityUrl : "common/queryCities.action",
		countyUrl : "common/queryCounties.action",
		countyByCityUrl : "common/queryCountyByCity.action",
		hotCityBack : function(data){
		    $(loadId).val(data.cityId);
		    $(loadName).val(data.cityName);
		},
		proBack : function(data){
			$(loadId).val(data.proId);
			$(loadName).val(data.proName);
		},
		cityBack : function(data){
			$(loadId).val(data.cityId);
			$(loadName).val(data.cityName);
		},
		countyBack : function(data){
			$(loadId).val(data.countyId);
			$(loadName).val(data.countyName);
		}
	}
	new $.district(setting2).init(true);
}
