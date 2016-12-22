/**
 * 修改车辆信息
 */
$("#updateVehicle").live("click",function(){
	var vehicleId = $("#vehicleId").val();
	 window.self.location="shang/toUpdateVehicle.do?vehicle.id=" + vehicleId;
});