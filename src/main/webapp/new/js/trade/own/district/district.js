/**
 * 城市数据源对象
 * 数据结构如下：
 * province={
 *   "id": "",
 *   "provinceName": ""
 *	}
 * area={
 *   "id": "",
 *   "cityId": "",
 *   "provinceId": "",
 *   "cityName": "",
 *   "areaName": "",
 *   "pinYin": "",
 *   "pinYinChar": ""
 *  }
 * city = {
 *   "name": "",
 *   "id": "",
 *   "provinceId": "",
 *   "cityPinyin": "",
 *   "hotCity":"",   //是否热门城市标示
 *   "cityShortPY": ""
 *	}
 * 该对象的使用说明：配置dpcity 控件使用的数据源。
 *
 */
var City_ds = function(options) {
    var city_ds = this;
    /*数据对象*/
    city_ds.data = {
//        provinces:false,
//        cities:false,
//        areas:false,
//        hotcity:false
    };

    /*合并对象，将obj中的属性替换成为 maper中配置的属性;maper{a:b} a为控件中的使用的字段名称，b为用户数据中的字段名称*/
    var combine = function(obj,map){
        var _obj = obj;
        for(var k in map){
            var obj_k = map[k];
            if(_obj[obj_k]){ //存在
                var tv = _obj[obj_k];
                delete _obj[obj_k] ;
                _obj[k] = tv;
            }
        }
        return _obj;
    }

    /*数据源默认配置*/
    var setting = {
            autoinit:false,
            host_path :'',
            provinces_url : '../common/queryProvince.do',
            cities_url : '../common/queryCities.do',
            areas_url : '',
            areabycity_url : '../common/queryCountyByCity.do?cityId=',
            property_mapper:{
                province:{},
                area:{},
                city:{}
            }, /*字段映射，可以把自定义的字段和城市控件中需要的字段做映射，可以不用改变使用者的数据结构*/
            dpcity_ds:0/*city类型，全部的城市信息:1 默认的;*/

    };

    city_ds.opt = $.extend(setting,options); //选项

    /*设置数据源数据*/
    city_ds.setProvinces = function(data){
        /*设置省份的数据源*/
        if(typeof(data)=='string') city_ds.opt.provinces_url = data;
        if(typeof(data)=='object') {
            if(city_ds.opt.property_mapper && city_ds.opt.property_mapper.province){
                /*如果配置了省份字段映射关系*/
                var p = new Array();
                for(var i in data){
                    p.push(combine(data[i],city_ds.opt.property_mapper.province))
                }
                city_ds.data.provinces = p;
            }else
                city_ds.data.provinces = data;
        }
    };
    city_ds.setCities = function(data){
        /*设置城市的数据源*/
        if(typeof(data)=='string') city_ds.opt.cities_url = data;
        if(typeof(data)=='object'){
            if(city_ds.opt.property_mapper && city_ds.opt.property_mapper.city){
                /*如果配置了省份字段映射关系*/
                var p = new Array();
                for(var i in data){
                    p.push(combine(data[i],city_ds.opt.property_mapper.city))
                }
                city_ds.data['cities'] = p;
            }else
                city_ds.data['cities'] = data;

            if(city_ds.data.hotcity) return;
            /*初始化热门城市*/
            var hotcity = new Array();
            for(var hot in data)
            {
                if(data[hot].hotCity) hotcity.push(data[hot]);
            }
            city_ds.data.hotcity = hotcity;
        }
    };
    city_ds.setArea = function(data){
        /*设置区县的数据源*/
        if(typeof(data)=='string') city_ds.opt.areas_url = data;
        if(typeof(data)=='object'){
            if(city_ds.opt.property_mapper && city_ds.opt.property_mapper.area){
                /*如果配置了省份字段映射关系*/
                var p = new Array();
                for(var i in data){
                    p.push(combine(data[i],city_ds.opt.property_mapper.area))
                }
                city_ds.data['counties'] = p;
            }else
                city_ds.data['counties'] = data;
        }
    };

    /*通过城市id查询下面所有的区县*/
    city_ds.areaByCity = function(cid){
        var areaArr = [];
        if(city_ds.data['counties'])/*数据源已经存在了所有的区县信息，则直接从中匹配；减少网络开支和服务器开支*/
        {
            for(var area in city_ds.data['counties']){
                if(city_ds.data['counties'][area].cityId == cid)areaArr.push(city_ds.data['counties'][area]);
            }
            if(areaArr.length < 1){
            	$(".dpcity").hide();
            }
            return areaArr;
        }else{
            if(city_ds.opt.areabycity_url)/*通过ajax方式来获取数据，必须先配置url*/
            {
            	 var p = new Array();
                $.ajax({
                    type:"get",
                    url:city_ds.opt.host_path+city_ds.opt.areabycity_url + "?cityId=" + cid,
                    dataType:"json",
                    async:false,
                    success:function(data){
                    	 if(city_ds.opt.property_mapper && city_ds.opt.property_mapper.area){
                             /*如果配置了省份字段映射关系*/
                            
                             for(var i in data['counties']){
                                 p.push(combine(data['counties'][i],city_ds.opt.property_mapper.area))
                             }
                           
                         }else
                        	 p= data['counties']; /*默认ajax的返回结果中属性是area*/
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){ alert(textStatus);}
                });
               
                if(!p || p.length < 1){
                	$(".dpcity").hide();
                }
                return p;
            }
        }

    };
    /*通过省份id获取所有的城市*/
    city_ds.cityByProvince = function(pid){
        var cityArr = [];
        if(!city_ds.data['cities'])/**/{alert("城市数据源未初始化");return false;}
        for(var i in city_ds.data['cities']){
            if(city_ds.data['cities'][i].provinceId == pid) cityArr.push(city_ds.data['cities'][i]);
        }
        if(cityArr.length < 1){
        	$(".dpcity").hide();
        }
        return cityArr;
    };
    /*通过省份id 查找省份信息*/
    city_ds.provinceById = function(pid){
        if(!city_ds.data.provinces)/**/{alert("省份数据源未初始化");return false;}
        for(var i in city_ds.data.provinces){
            if(city_ds.data.provinces[i].id == pid) return city_ds.data.provinces[i];
        }

    };
    
    city_ds.query_data = function(url, pro, callback, is_async){
    	fetch_data(url,pro,callback, is_async);
    }
    
    /*填充数据的方法;如果ajax返回的数据格式变更，只需要修改该函数即可*/
    var fetch_data = function(url, pro, callback, is_async){
    	if(city_ds.data[pro]){
    		return false;
    	}
        $.ajax({
            type:"get",
            url:city_ds.opt.host_path+url,
            dataType:"json",
            async: is_async,
            success:function(data){ callback.call(city_ds,data[pro]);},
            error:function(XMLHttpRequest, textStatus, errorThrown){alert(textStatus);}
        });
    };

    var auto_init = function(){ /*初始化数据源*/
        /*有网点的城市信息的默认配置
        if(city_ds.opt.dpcity_ds == 2){
            city_ds.opt.provinces_url = "common/queryProvincesExistsBusinessDept.action";
            city_ds.opt.cities_url = "common/queryAllCities.action";
            city_ds.opt.areas_url = "common/queryAreasExistsBusinessDept.action";
            city_ds.opt.areabycity_url = "common/queryAreasExistsBusinessDeptByCityId.action?cityId=";
        }*/
        /*初始化数据*/
        if(!city_ds.data.provinces) fetch_data(city_ds.opt.provinces_url, "provinces", city_ds.setProvinces, false);
        if(!city_ds.data['cities']) fetch_data(city_ds.opt.cities_url, "cities", city_ds.setCities, false);
//        if(!city_ds.data['counties'] && city_ds.opt.areas_url) fetch_data(city_ds.opt.areas_url,"counties",city_ds.setArea, true);

    };
    /*初始化*/
    if(this.opt.autoinit) auto_init();

};

/**格式化字符串*/
var format=function(str, obj){
    for (var key in obj) {
        if(obj[key]!=undefined){
            var reg = new RegExp("({" + key + "})", "g");
            str = str.replace(reg, obj[key]);
        }
    }
    return str;
};

/**
 *description: dpcity.js 
 *author:mujun
 * version:2013-04-25
 */
/* 城市控件核心类 */
(function($) {

    /**键盘输入提示；模糊匹配*/
   var Key_input  = function(opt){
        var _default ={
            ds:false,/*使用的数据*/
            inhtml:[],
            show_size:10,
            click:function(){
				//alert("im key input click:"+$(this).html());
				},
            key:'',/*查询的key*/
            before_key:'',
            top:0,
            left : 0,
            height:0,
            ispage:false, /*是否分页显示*/
            page:1,
            target:"dd",
            /*清空*/
            clear:function(){
                this.page = 1;
                this.inhtml = [];
            },
            totalcount:function(){
                return this.inhtml.length;
            },
            totalpage:function(){
              return Math.ceil(this.totalcount()/this.show_size);
            },
            getpage:function(){
                return this.page <1 ? 1:( this.page > this.totalpage() ? this.totalpage() : this.page);
            },
            starNo:function(){
                return (this.getpage() -1)*this.show_size;
            },
            endNo:function(){
                return this.getpage()*this.show_size;
            },
            pagehtml:function(){
                if(this.totalpage() == 1) return '';
                var html = '';
                var star , end ;
//                if(this.page ==1 ){
//                    star = 1;
//                    end = 4;
//                }else if(this.page == this.totalpage()){
//                    star =this.totalpage()-3 ;
//                    end = this.totalpage();
//                }else if(this.page > this.totalpage() -3){
//                    star = this.totalpage() -2;
//                    end = this.totalpage();
//                }else{
//                    star = this.page;
//                    end = parseInt(this.page) +2;
//                }

                star = 1;
                end = this.totalpage();
                
                if(this.page > 1){
                    html +="<a href='javascript:void(0);' value='"+(this.getpage()-1)+"'><-</a>";
                }

//                alert("endpage:"+endpage +",total"+this.totalpage()+"current"+this.page);
                for(var i=star;i<=end;i++){
                    if(this.page == i) html +="<a href='javascript:void(0);' class='current' value='"+i+"'>"+i+"</a>";
                    else
                        html +="<a href='javascript:void(0);' value='"+i+"'>"+i+"</a>";
                }
                if(this.page < this.totalpage()){
                    html +="<a href='javascript:void(0);' value='"+(parseInt(this.getpage())+1)+"'>-></a>";
                }
                return html;
            },
            topage:function(p){
                this.page = p<1?1:(p>this.totalpage()?this.totalpage():p);
                this.init_div();
            },
            pagebind:function(){
                var _this = this;
                $("#dimCityQuery .page a").unbind().click(function(event){
                    var p = $(this).attr("value");
                    _this.topage(p);
                    _this.target.focus();
                    event.stopPropagation();
                });
            },
            /*把 inhtml中的li的html拼接成完整需要显示的html代码*/
            inhtmler:function(){
                if(!this.inhtml ||this.inhtml.length<1 ){
                    $("#dimCityQuery ul").html("<li class='none'>对不起,没有找到该城市</li>");
                    if(this.ispage) $("#dimCityQuery .page").html('');
                }else{/*把 inhtml 中的字符并接成html ,加入到面板结果中 */
                    var _html = '';
                    for(var i = this.starNo();i<this.endNo();i++){
                        if(this.inhtml[i])
                            _html += this.inhtml[i];
                    }
                    $("#dimCityQuery ul").html(_html).find("li:first").addClass("current");

                    if(this.ispage){
                        $("#dimCityQuery .page").html(this.pagehtml());
                        this.pagebind();
                    }else{$("#dimCityQuery .page").html('');}
                }
            },
            /*初始化*/
            init_div :function(){
                if(!$("#dimCityQuery").attr("id")){ /*/div　已经存在 todo:ie 兼容需要添加 iframe*/
                    $("body").append("<div id='dimCityQuery'><ul></ul><span class='page'></span></div>");
                    $("#dimCityQuery").css("top", this.target.offset().top+ this.target.height()).css("left", this.target.offset().left).show();
                }else
                    $("#dimCityQuery").css("top", this.target.offset().top+ this.target.height()).css("left", this.target.offset().left).show();

                this.inhtmler();

                /*鼠标移上效果*/
                $("#dimCityQuery li").hover(function(){
                    $(this).addClass("current").siblings().removeClass("current");
                });

                /*点击事件*/
                $("#dimCityQuery li a").unbind("click").bind("click",this.click);

                return $("#dimCityQuery");
            },
            /**/
            fill :function(dataArr){
                /*填充数据;*/
                for(var i in dataArr)
                {
                	if(this.inhtml.length >= 50){
                    	return false;
                    }
                    var obj = dataArr[i];
                    var li = this.creat_li(obj);
                    if(li) {
                        li = this.highlight(li, this.key);
                        this.inhtml.push(li);
                    }
                }

            },
            highlight:function(str,key){
                /*高亮搜索关键字*/
                var strArr = str.split("-");
                var reg;
                if(strArr.length>1){
                    reg = new RegExp("("+key+")", "i");
                    return strArr[0]+'-'+strArr[1].replace(reg,"<span style='color:red'>$1</span>");
                }
                else{
                    reg = new RegExp("(<a.*>.*?)("+key+")(.*<\/a>)", "i");
                    return str.replace(reg,"$1<span style='color:red'>$2</span>$3");
                }
            },
            fill_area:function(pdata){
                /*填充区县的搜索结果*/
                var ldata = pdata?pdata:this.ds.data['counties'];
                this.fill(ldata);
            },
            fill_city:function(pdata){
                /*填充城市的搜索结果*/
                var ldata = pdata?pdata:this.ds.data['cities'];
                this.fill(ldata);
            },
            creat_li:function(obj,q){
                /*根据搜索结果生成li的html代码*/
                var q = q || this.key;
                var piny = obj.pinYin||obj.cityPinyin;
                var pychar = obj.pinYinChar || obj.cityShortPY;
                var name = obj.areaName || obj.name;
//                if(!piny || !pychar) return false;
                /*简拼*/
                if(pychar &&( q.toUpperCase() == pychar.substring(0,q.length).toUpperCase())){
                    if(obj.areaName)/*区县*/
                        return format("<li><a class='allcityClass' href='javascript:' provinceid='{provinceId}' cityid='{cityId}' countyid='{id}' cityname='{cityName}' countyname='{areaName}'>{cityName}-{areaName}({pinYinChar})</a></li>",obj);
                    else/*城市*/
                        return format("<li><a class='allcityClass' href='javascript:' provinceid='{provinceId}' cityname='{name}' cityid='{id}' >{name}({cityShortPY})</a></li>",obj);
                }
                /*全拼*/
                if(piny && (q.toLowerCase() == piny.substring(0,q.length).toLowerCase())) {
                    if(obj.areaName)/*区县*/
                        return format("<li><a class='allcityClass' href='javascript:' provinceid='{provinceId}' cityid='{cityId}' countyid='{id}' cityname='{cityName}' countyname='{areaName}'>{cityName}-{areaName}({pinYin})</a></li>",obj);
                    else/*城市*/
                        return format("<li><a class='allcityClass' href='javascript:' provinceid='{provinceId}' cityname='{name}' cityid='{id}' >{name}({cityPinyin})</a></li>",obj);
                }
                /*汉字*/
                if(q == name.substring(0,q.length)) {
                    if(obj.areaName)/*区县*/
                        return format("<li><a class='allcityClass' href='javascript:' provinceid='{provinceId}' cityid='{cityId}' countyid='{id}' cityname='{cityName}' countyname='{areaName}'>{cityName}-{areaName}({pinYinChar})</a></li>",obj);
                    else/*城市*/
                        return format("<li><a class='allcityClass' href='javascript:' provinceid='{provinceId}' cityname='{name}' cityid='{id}' >{name}({cityShortPY})</a></li>",obj);
                }
                return false;
            }

        };

        this.opt = $.extend(_default,opt);

        /*设置查询key;对象入口，自动触发对象*/
        this.setKey = function(q){
            if (!this.opt.ds) {alert("模糊匹配数据源未初始化");return false;};
            if(this.opt.ds && this.opt.ds.opt.areas_url){
            	this.opt.ds.query_data(this.opt.ds.opt.areas_url, "counties", this.opt.ds.setArea, false);
            }
            this.opt.key = q;
            if (!this.opt.key) return false;
            if (this.opt.before_key == this.opt.key) {this.opt.init_div(); return false;} /*如果查询关键字没有改动，则结束*/
            this.opt.clear();
            this.opt.fill_area();
            this.opt.fill_city();
            this.opt.init_div();
            this.opt.before_key = this.opt.key; /*记录上一次的key*/
        };

        /*向上按键*/
        this.keyup = function(){
            var prev=$("#dimCityQuery li.current").prev();
            if(prev.size()>0)  { prev.addClass("current").siblings().removeClass("current"); }
            else{ $("#dimCityQuery li").removeClass("current").last().addClass("current");};
        };
        /*向下按键*/
        this.keydown = function(){
            var next=$("#dimCityQuery li.current").next();
            if(next.size()>0)  {
                next.addClass("current").siblings().removeClass("current");
            }
            else{
                $("#dimCityQuery li").removeClass("current").first().addClass("current");
            }
        };
        /*回车按键*/
        this.keyenter = function(){
            $("#dimCityQuery li.current a").triggerHandler("click");
        };
        this.close = function(){$("#dimCityQuery").hide();}
        /*上一页*/
        this.prepage = function(){ this.opt.topage(parseInt(this.opt.page)-1);}
        /*下一页*/
        this.nextpage = function(){this.opt.topage(parseInt(this.opt.page)+1);}
        return this;
    };

    /**城市控件选项卡对象*/
    var City_tab_control = function(setting) {
        var _this = this;
        /*城市选项卡配置*/
        var def={
            page:1,
            psize:12,
            data:[],/*数据源默认为控件的ds*/
            tab:'',/*当前tab class*/
            select_li:'',/*选中的元素*/
            tidy_data:function(data_src){
                /*数据过滤函数，在数据操作展示前调用;默认没有做任何处理。使用是可以用参数的方式传入，做数据展示的处理格式化等等*/
                if(!data_src) return data_src;
                var data = $.extend({},data_src);
                if(data['provinceName']) {/*/省份名称处理*/
                    if(data.provinceName.indexOf('内蒙古') == 0 )
                        data.provinceName = '内蒙古';
                    else if(data.provinceName.indexOf('黑龙江') == 0)
                        data.provinceName = '黑龙江';
                    else
                        data.provinceName = data.provinceName.substr(0,2);
                }
                else if(data['name']){ /*//城市名称处理*/
                	data.showName = data.name.substr(0,4);
                    //data.name = data.name.substr(0,4);
                }

                else if(data['areaName']){ /*//区县名称处理*/
                	data.showName = data.areaName.substr(0,4);
                    //data.areaName = 
                }

                return data;
            },
            size:function(){
                return this.data.length?this.data.length:0;
            },
            hasnext:function(){
                return this.getpage()>=this.totalpage()?false:true;
            },
            nextpage:function(){
                this.page ++;
                return this.getpage();
            },
            haspre:function(){
                return this.getpage()>1?true:false;
            },
            prepage:function(){
                this.page --;
                return this.getpage();
            },
            totalpage:function(){
                return Math.ceil(this.size()/this.psize);
            },
            getpage:function(){
                return this.page<1?1:(this.page>this.totalpage()?this.totalpage():this.page);
            },
            lihtml:'',/*该字符串在运行时回自动替换调当中的变量格式 {name}*/
            click:function()
            {/*绑定生成的li元素中的a的点击事件*/
                //alert($(this).html());
            },
            getstarno:function(){
                return (this.getpage()-1)*this.psize;
            },
            getendno:function(){
                return this.getstarno()+this.psize >this.size()?this.size():(this.getstarno()+this.psize);

            }
        };

        _this.opt = $.extend(def,setting);

        if(!_this.opt.data || _this.opt.data.length<1){
//        alert("数据源未初始化");
            return false;
        }

        var show_tab = function(arg){
            var tb = arg?arg:_this.opt.tab;
            /*tab 栏的样式切换*/
            $(".tabs li a").each(function(){
                if($(this).attr('tb') == tb) $(this).addClass("current");
                else $(this).removeClass("current");
            });
            /*con 的展示*/
            $(".con .invis").each(function(){
                if($(this).attr('class') == tb+" invis") $(this).show();
                else $(this).hide();
            });
        };

        var tab_switch = function(tb){
            tb = tb?tb:_this.opt.tab;

            show_tab(tb);

            /*清空*/
            var clear = function(){
                $("."+tb+" .list ul").empty();
                $("."+tb+" .pre a").unbind();
                $("."+tb+" .next a").unbind();
            };

            /*添加数据*/
            var fill_html=function(tb){
                clear();
                if(_this.opt.hasnext()){
                    $("."+tb+" .next a").addClass("can");
                    $("."+tb+" .next a").click(_this.next_page);
                }
                else{ $("."+tb+" .next a").removeClass("can"); }

                if(_this.opt.haspre())
                {
                    $("."+tb+" .pre a").addClass("can");
                    $("."+tb+" .pre a").click(_this.pre_page);
                }
                else{ $("."+tb+" .pre a").removeClass("can");}

                if(!_this.opt.lihtml) {
                    alert("cityWidget error!not found li html option"); return false;
                }

                /*loop data*/
                for(var i=_this.opt.getstarno();i<_this.opt.getendno();i++)
                {
                    var obj = _this.opt.data[i];
                    obj = _this.opt.tidy_data(obj);/*整理对象中的数据格式等等*/
                    var li = format(_this.opt.lihtml,obj);
                    $("."+tb+" .list ul").append($(li));
                }
                /*bind the click event,*/
                $("."+tb+" .list ul a").each(function(){
                    if(_this.opt.select_li == $(this).attr("id")) {$(this).addClass("current");};
                    $(this).click(_this.opt.click);
                })
            };

            fill_html(tb);
        };
        /*下一页*/
        _this.next_page = function(){
            _this.opt.page = _this.opt.nextpage();
            tab_switch();
        };
        /*上一页*/
        _this.pre_page = function(){
            _this.opt.page = _this.opt.prepage();
            tab_switch();
        };

        tab_switch(_this.opt.tab);

//    return _this;

    };

    /**城市控件对象*/
    var City_ctrl = function(option){
        var _default = {
            init_panel:function(){
                /*初始化面板;todo:ie 兼容需要添加 iframe*/
                if(!$(".dpcity").attr("class")){
                    $("body").append('<div class="dpcity" style="display:none; -moz-user-select: none;" onselectstart="return false"><div class="tabs clearfix"><ul class=""><li><a href="javascript:" class="current" tb="hotCity">热门城市</a></li><li><a href="javascript:" tb="province">省份</a></li><li><a href="javascript:" tb="city" id="city">城市</a></li><li><a href="javascript:" tb="county" id="county">区县</a></li></ul></div><div class="con"><div class="hotCity invis"><div class="pre"><a></a></div><div class="list"><ul></ul></div><div class="next"><a class="can"></a></div></div><div class="province invis" style="display:none;"><div class="pre"><a></a></div><div class="list"><ul></ul></div><div class="next"><a class="can"></a></div></div><div class="city invis" style="display:none;"><div class="pre"><a></a></div><div class="list"><ul></ul></div><div class="next"><a class="can"></a></div></div><div class="county invis" style="display:none;"><div class="pre"><a></a></div><div class="list"><ul></ul></div><div class="next"><a class="can"></a></div></div></div></div>');
                }
                this.init_ctrl();
            },
            init_ctrl:function(){
                /*初始化控件，绑定事件*/
                $("a[tb='hotCity']").unbind().click(this.hotcity_tb_click);
                $("a[tb='province']").unbind().click(this.province_tb_click);
                $("a[tb='city']").unbind().click(this.city_tb_click);
                $("a[tb='county']").unbind().click(this.county_tb_click);
                $("a[tb='hotCity']").trigger("click");
            },
            show_city_ctrl:function(postion){$(".dpcity").css(postion).show();},
            hide_city_ctrl:function(){$(".dpcity").hide()},
            hotcity_tb_click:function(){},
            province_tb_click:function(){},
            city_tb_click:function(){},
            county_tb_click:function(){}
        }
        return $.extend(_default,option);
    };

    /**jquery 插件*/
    $.fn.dpcity = function(options){

        var $this = $(this);
        var _this = this;
        _this.l=$this.offset().left;
        _this.t=$this.offset().top;
        _this.h=$this.height();
        _this.ID = $this.attr('id');
        /**缓存功能*/
        _this.cache = {
            data:new Array(),
            add : function(key,value){
                var f = false;
                for(var c in this.data){
                    if(this.data[c].k == key){ this.data[c].v = value; f = true;}
                }
                if(!f) { this.data.push({k:key,v:value}); f = true; }
                return f;
            },
            remove : function(key){
                for(var c in this.data){
                    if(this.data[c].k== key){ this.data.splice(c,1);return; }
                }
            },
            get : function(key){
                for(var c in this.data){
                    if(this.data[c].k == key){ return this.data[c].v;}
                }
                return false;
            }
        };
        /**默认配置*/
        var dpcity_setting={
            ds:false,
            tab_ctrl:true,
            key_ctrl:true,
            key_page:false,
            province_back: function(selected){
            	/*选中省份级别后的回调，可以由参数配置*/
//                $this.val(selected.provinceName);
            },
            city_back:function(selected){
                /*选中城市级别后的回调，可以由参数配置*/
                $this.val(selected.provinceName +" - "+selected.cityName);
            },
            finshed:function(){},/*离开时的操作 即 onblur 事件*/
            callback:function(selected){}
        };

        _this.option = $.extend(dpcity_setting,options);

        if(!_this.option.ds){
            alert("city_tab 数据源未绑定，无法初始化控件");
            return false;
        }
        /**构造回调的参数，选择城市区县后，回传给调用者的数据*/
        var create_back_data = function(elem){
           var provinceName = _this.option.ds.provinceById(elem.attr('provinceid')) .provinceName;
          
            return {
                provinceId:elem.attr('provinceid'),
                cityId:elem.attr('cityid'),
                cityName:elem.attr('cityname'),
                countyId:elem.attr('countyid'),
                countyName:elem.attr("countyname"),
                provinceName:provinceName
            };
        }

        /*根据配置是否需要显示选项卡式控件*/
        if(_this.option.tab_ctrl){
            /**切换城市选项卡到对应的tab标签页*/
            _this.to_tab=function(tab,opt){
                var cache_sel = _this.cache.get(tab+"_selected");
                if(!opt) opt = _this.cache.get(tab+"_opt")
                if(!opt) return false;
                opt.select_li = cache_sel;
                City_tab_control(opt);
                _this.cache.add(tab+"_opt",opt);
            };
            /**城市选项卡切换到区县tab*/
            _this.switch_area_tab = function(ds){
                var areaID = "county";
                /*跳转到区县tab*/
                _this.to_tab(areaID,{
                    data:ds,
                    tab:areaID,
                    lihtml:'<li><a href="javascript:void(0);" id="{id}" provinceid="{provinceId}" cityid="{cityId}" countyid="{id}" cityname="{cityName}"  countyname="{areaName}" title="{areaName}">{showName}</a></li>',
                    psize:12,
                    page:1,
                    click:function(event){
                        _this.cache.add(areaID+"_selected",$(this).attr('id'));
                        var back_data = create_back_data($(this));
                        $this.val(back_data.provinceName +" - "+back_data.cityName +" - "+back_data.countyName);
                        _this.option.callback(back_data);/*回调用户处理函数*/
                        _this.city_ctrl.hide_city_ctrl();
                        event.stopPropagation();
                    }
                });
            };
            /**城市选项卡切换到城市tab*/
            _this.switch_city_tab =function(ds){
                var cityID = "city"
                /*跳转到城市tab*/
                _this.to_tab(cityID,{
                    data:ds,
                    tab:cityID,
                    lihtml:'<li><a href="javascript:void(0);" id="{id}" provinceid="{provinceId}" cityid="{id}" cityname="{name}" title="{name}">{showName}</a></li>',
                    psize:12,
                    page:1,
                    click:function(event){
                        _this.cache.add(cityID+"_selected",$(this).attr('id'));
                        _this.cache.add("hotCity_selected",$(this).attr('id'));

                        var provinceName = _this.option.ds.provinceById($(this).attr('provinceid')).provinceName;

                        _this.option.city_back({provinceid:$(this).attr('provinceid'),
                            provinceName:provinceName,
                            cityId : $(this).attr('cityid'),
                            cityName:$(this).attr('cityname')
                        });
                        _this.switch_area_tab(_this.option.ds.areaByCity($(this).attr('cityId')));
                        event.stopPropagation();
                    }
                });
            };

            /**实例化城市控件*/
            _this.city_ctrl = new City_ctrl({
                hotcity_tb_click:function(event){/*热门城市选项卡点击事件*/
                    var hotcityID="hotCity";
                    _this.to_tab(hotcityID,{
                        data:_this.option.ds.data.hotcity,
                        tab:hotcityID,
                        lihtml:"<li><a style='background:none;border:0px;cursor: pointer;' id='{id}' provinceid='{provinceId}' cityname='{name}'  title='{name}' >{name}</a></li>",
                        psize:16,
                        page:1,
                        click:function(){
                            /*缓存选中的*/
//                        _this.cache.add("city_selected",$(this).attr("id"));
                            _this.cache.remove("city_opt");
                            _this.cache.remove("county_selected");
                            var provinceName = _this.option.ds.provinceById($(this).attr('provinceid')).provinceName;
                            _this.option.city_back({provinceid:$(this).attr('provinceid'),
                                provinceName:provinceName,
                                cityId : $(this).attr('id'),
                                cityName:$(this).attr('cityname')
                            });
                            var ds = _this.option.ds.areaByCity($(this).attr("id"));
                            _this.switch_area_tab(ds);
                        }
                    });
                    event.stopPropagation();
                },
                /*省份选项卡点击事件*/
                province_tb_click:function(event){
                    var provinceID = "province";
                    _this.to_tab(provinceID,{
                        data:_this.option.ds.data.provinces,
                        tab:provinceID,
                        lihtml:'<li><a href="javascript:void(0);" id="{id}" provinceid="{id}" title="{provinceName}" >{provinceName}</a></li>',
                        psize:12,
                        page:1,
                        click:function(){
                            _this.cache.add(provinceID+"_selected",$(this).attr("id"));
                            _this.cache.remove("county_opt");
                            
                            var provinceName = _this.option.ds.provinceById($(this).attr("id")).provinceName;
                            _this.option.province_back({provinceid:$(this).attr('id'),
                                provinceName:provinceName
                            });
                            
                            _this.switch_city_tab(_this.option.ds.cityByProvince($(this).attr('provinceId')))
                        }});
                    event.stopPropagation();
                },
                city_tb_click:function(event){ _this.to_tab("city",null);event.stopPropagation();},
                county_tb_click:function(event){ _this.to_tab("county",null);event.stopPropagation();}
            });

            /**控件点击事件，显示城市面板*/
            $this.click(function(event){
            	
            	//点击的时候获取文本框的位置
            	var thisIpt = $(this);
//                var _this = this;
                _this.l=thisIpt.offset().left;
                _this.t=thisIpt.offset().top;
                _this.h=thisIpt.height();
            	
                if(_this.key_input)_this.key_input.close();
                $this.select();
                _this.city_ctrl.init_panel();
                _this.city_ctrl.show_city_ctrl({left:_this.l,top:_this.t+_this.h+5});
                event.stopPropagation();
            });

        };
        /*根据配置是否需要显示键盘模糊匹配控件*/
        if(_this.option.key_ctrl){
            /**实例化模糊匹配控件*/
            _this.key_input = new Key_input({target:$this,top:_this.t+_this.h+5,left:_this.l,ds:_this.option.ds,ispage:_this.option.key_page,click:function(event){
                var back_data = create_back_data($(this));
                /*选择的是城市　-> 选择区县选项卡*/
                if(!back_data.countyId){
                    _this.city_ctrl.show_city_ctrl({left:_this.l,top:_this.t+_this.h+5});
                    _this.option.city_back(back_data);
                    _this.switch_area_tab(_this.option.ds.areaByCity(back_data.cityId));
                }else{
                    $this.val(back_data.provinceName +" - "+back_data.cityName +" - "+back_data.countyName);
                    _this.option.callback(back_data);
                }
                _this.key_input.close();
                event.stopPropagation(); //阻止事件冒泡
            }});

            /**绑定模糊匹配功能*/
            $this.keyup(function(event){
            	
            	//点击的时候获取文本框的位置
            	var thisIpt = $(this);
//                var _this = this;
                _this.l=thisIpt.offset().left;
                _this.t=thisIpt.offset().top;
                _this.h=thisIpt.height();
            	
                if(_this.city_ctrl) _this.city_ctrl.hide_city_ctrl();
                var lastKeyPressCode = event.keyCode;//获取键盘值
                switch(lastKeyPressCode) {
                    case 40:  //方向键下
                        _this.key_input.keydown();
                        return false;
                    case 38: //方向键上
                        _this.key_input.keyup();
                        return false;
                    case 13: //确定键
                        _this.key_input.keyenter();
                        return false;
                    case 39:// 向右 下一页
                       if(_this.option.key_page) _this.key_input.nextpage();
                        return false;
                    case 37: // 向左 上一页
                        if(_this.option.key_page) _this.key_input.prepage();
                        return false;
                }
                /*设置查询关键字*/
                _this.key_input.setKey($this.val());
                event.stopPropagation();
            });
        };

        $this.blur(_this.option.finshed);

    };

})($);

/**点击页面其他地方隐藏掉城市控件*/
$("html").click(function(event){
    var mint,maxt,minx,maxx;
    var is_range =function(){
        return event.pageX >= minx && event.pageX <= maxx && event.pageY >= mint && event.pageY <= maxt;
    }
    if($(".dpcity").is(":visible")){
        mint = $(".dpcity").position().top;
        minx = $(".dpcity").position().left;
        maxt = mint + $(".dpcity").height();
        maxx = minx + $(".dpcity").width();
        if(!is_range()) $(".dpcity").hide();
    }else if($("#dimCityQuery").is(":visible")){
        mint = $("#dimCityQuery").position().top;
        minx = $("#dimCityQuery").position().left;
        maxt = mint + $("#dimCityQuery").height();
        maxx = minx + $("#dimCityQuery").width();
//        alert("("+event.pageX+","+event.pageY+") >? ("+ maxx+","+maxt+")");
        if(!is_range()) $("#dimCityQuery").hide();
    }
});

/**
 * 类描述：弹出层省市控件
 * <p> Copyright 2013 by mytd Software corporation,
 * <p>All rights reserved.
 * <p>版权所有：满意通达（北京）软件责任有限公司
 * <p>未经本公司许可，不得以任何方式复制或使用本程序任何部分，<p>
 * 侵权者将受到法律追究。
 *
 * @author 邓夫伟
 * @date 2013-4-1 上午9:33:35
 * @comment 封装了省市区选择插件，用法不变，但是实际上是使用的jquery插件了。
 * @version 1.0
 */
(function($) {
	
	$.district = function(setting){
		//数据集合
		var provinces = [];
		var cities = [];
		var counties = [];
		var hotCities = [];
		var currentObj = null;
		var proCurPage = 1;
		var cityCurPage = 1;
		var countyCurPage = 1;
		var pageSize = 12;
		//选中的省市区
		var selectedPro;
		var selectedCity;
		var selectedCounty;
		var selectedProId;
		var selectedCityId;
		var selectedCountyId;
		//省市区访问地址
		var proUrl;
		var cityUrl;
		var countyUrl;
		var countyByCityUrl;
		
		//仿时间控件获取CSS路径
		var districtX = window,
		districtM = "document",
		districtC = "getElementsByTagName";
		var districtK = function(A, $, B) {
	        var districtD = districtX[districtM][districtC]("HEAD").item(0),
	        _ = districtX[districtM].createElement("link");
	        if (districtD) {
	            _.href = A;
	            _.rel = "stylesheet";
	            _.type = "text/css";
	            districtD.appendChild(_)
	        }
	    }
		
		/**
		 * 初始化
		 */
		this.init = function(isTriggerClick){
			
			$("script").each(function(){
				var flag = false;
				var path = $(this).attr("src");
				if(path && path.indexOf("district.js") > -1){
					$("link").each(function(){
						var cssPath = $(this).attr("href");
						if(cssPath.indexOf("master.css") > -1){
							flag = true;
							return false;
						}
					});
					if(!flag){
						path = path.substring(0, path.lastIndexOf("/"));
						districtK(path + "/theme/master.css");
						return false;
					}
				}
			});
			
//			ds.provinces_url = setting.proUrl ? setting.proUrl : "../common/queryProvince.do";
//			ds.cities_url = setting.cityUrl ? setting.cityUrl : "../common/queryCities.do";
//			ds.areas_url = setting.countyUrl ? setting.countyUrl : "../common/queryCounties.do";
//			ds.areabycity_url = setting.countyByCityUrl ? setting.countyByCityUrl : "../common/queryCountyByCity.do";
			 
			var ds = new City_ds({
				autoinit:true,
			    provinces_url : setting.proUrl ? setting.proUrl : "../common/queryProvince.do",
			    cities_url : setting.cityUrl ? setting.cityUrl : "../common/queryCities.do",
			    areas_url : setting.countyUrl ? setting.countyUrl : "../common/queryCounties.do",
			    areabycity_url : setting.countyByCityUrl ? setting.countyByCityUrl : "../common/queryCountyByCity.do",
			    property_mapper:{
			        province:{
			        	"id": "proId", 
			        	"provinceName": "name"
			        },
			        area:{
			        	"id": "id",
			        	"cityId": "cityId",
			        	"provinceId": "proId",
			        	"cityName": "cityName",
			        	"areaName": "name",
			        	"pinYin": "pinYin",
			        	"pinYinChar": "pinYinAbbr"
			        },
			        city:{
			        	"id": "id",
			        	"name": "name",
			        	"provinceId": "proId",
			        	"cityPinyin": "pinYin",
			        	"hotCity":"isHotCity",   
			        	"cityShortPY": "pinYinAbbr"
			        }
			    } /*字段映射，可以把自定义的字段和城市控件中需要的字段做映射，可以不用改变使用者的数据结构*/
			});
			
			
			$("#" + setting.id).dpcity({
				ds: ds,
		        key_page: true,/*模糊搜索启用分页*/
			    callback: function(data){
			        //选中了区县后的业务代码
			    	if(setting.proId){
						setting.proId.val(data.provinceId);
					}
					if(setting.proName){
						setting.proName.val(data.provinceName);
					}
					if(setting.cityId){
						setting.cityId.val(data.cityId);
					}
					if(setting.cityName){
						setting.cityName.val(data.cityName);
					}
					if(setting.countyId){
						setting.countyId.val(data.countyId);
					}
					if(setting.countyName){
						setting.countyName.val(data.countyName);
					}
					
					$("#" + setting.id).attr("value", data.provinceName + "-" + data.cityName + "-" + data.countyName);
					$("#" + setting.id).attr("title", data.provinceName + "-" + data.cityName + "-" + data.countyName);
					
					//区县选择回调函数
					if(setting.countyBack){
						setting.countyBack({
							proId : data.provinceid,
							proName : data.provinceName,
							cityId : data.cityId,
							cityName : data.cityName,
							countyId : data.countyId,
							countyName : data.countyName
						});
					}
					
					try{
						$("#" + setting.id).valid();
					} catch(e){
						
					}
			    },
			    province_back: function(data){
			    	if(setting.proId){
						setting.proId.val(data.provinceid);
					}
					if(setting.proName){
						setting.proName.val(data.provinceName);
					}
					
					//清楚城市和区县的数据
					if(setting.cityId){
						setting.cityId.val("");
					}
					if(setting.cityName){
						setting.cityName.val("");
					}
					if(setting.countyId){
						setting.countyId.val("");
					}
					if(setting.countyName){
						setting.countyName.val("");
					}
					
					if(setting.isShowProvince){
						$("#" + setting.id).attr("value", data.provinceName);
						$("#" + setting.id).attr("title", data.provinceName);
					}
					//省份选择回调函数
					if(setting.proBack){
						setting.proBack({
							proId : data.provinceid,
							proName : data.provinceName
						});
					}
					
					try{
						$("#" + setting.id).valid();
					} catch(e){
						
					}
			    },
			    city_back:function(data){
			        //选中城市后的操作代码
			    	if(setting.proId){
						setting.proId.val(data.provinceid);
					}
					if(setting.proName){
						setting.proName.val(data.provinceName);
					}
					if(setting.cityId){
						setting.cityId.val(data.cityId);
					}
					if(setting.cityName){
						setting.cityName.val(data.cityName);
					}
					
					//清除区县的数据
					if(setting.countyId){
						setting.countyId.val("");
					}
					if(setting.countyName){
						setting.countyName.val("");
					}
					
					if(setting.isShowCity){
						$("#" + setting.id).attr("value", data.provinceName + "-" + data.cityName);
						$("#" + setting.id).attr("title", data.provinceName + "-" + data.cityName);
					}
					
					//城市选择回调函数
					if(setting.cityBack){
						setting.cityBack({
							proId : data.provinceid,
							proName : data.provinceName,
							cityId : data.cityId,
							cityName : data.cityName
						});
					}
					
					try{
						$("#" + setting.id).valid();
					} catch(e){
						
					}
			    },
			    finshed:function(data){
			        //alert($(this).val());
			    }
			});
			
			if(isTriggerClick){
				$("#" + setting.id).trigger("click");
			}
			
			//文本框失去焦点时如果内容为空则清除隐藏文本框的内容
			$("#" + setting.id).live("blur", function(event){
				if(!$.trim($("#" + setting.id).val())){
					if(setting.proId){
						setting.proId.val("");
					}
					if(setting.proName){
						setting.proName.val("");
					}
					if(setting.cityId){
						setting.cityId.val("");
					}
					if(setting.cityName){
						setting.cityName.val("");
					}
					if(setting.countyId){
						setting.countyId.val("");
					}
					if(setting.countyName){
						setting.countyName.val("");
					}
				}
				
				event.stopPropagation();
			});
		};
	};
	
})(jQuery);

//window.onload = function(){
//	ds.query_data(ds.opt.areas_url, "counties", ds.setArea, true);
//}