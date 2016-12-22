//倒计时
function count_down(o){
	var obj = o.attr("value");
    var www_qsyz_net=/^[\d]{4}-[\d]{1,2}-[\d]{1,2}( [\d]{1,2}:[\d]{1,2}(:[\d]{1,2})?)?$/ig,str='',conn,s;
    if(!obj.match(www_qsyz_net)){
            //alert('参数格式为2012-01-01[ 01:01[:01]].\r其中[]内的内容可省略');
            return false;
    }
    var sec=(new Date(Date.parse(obj.replace(/-/ig,'/'))).getTime()
    			- new Date().getTime())/1000 + 24*60*60;
    if(sec > 0){
            conn='还有';
    }else{
            conn='已';
            sec*=-1;
    }
    if(conn=="已"){
    	str = conn;
    }else{        	
    	s={'天':sec/24/3600,'小时':sec/3600%24,'分':sec/60%60,'秒':sec%60};
    	for(var i in s){
    		if(Math.floor(s[i])>0 ) str += '<span class="color_orange">'+Math.floor(s[i])+'</span>' + i;
    	}
    	if(Math.floor(sec)==0){ str='0秒'; }
    }
    o.html(str + '&nbsp;&nbsp;结束');  
    setTimeout(function(){count_down(o)},1000);
}

function refreshTimer(){
	var $allCountdown = $(".count_down");
	for (var i = 0; i < $allCountdown.length; i++) {	
		count_down($allCountdown.eq(i));
	}
}

refreshTimer();