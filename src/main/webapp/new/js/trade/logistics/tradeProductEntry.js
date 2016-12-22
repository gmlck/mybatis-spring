var productEditor;
KindEditor.options.cssData = 'body { font-size: 12px; font-family: "微软雅黑"; color: #666666; font-style:normal; }';
KindEditor.ready(function(K) {
	productEditor = K.create('textarea[name="tradeProduct.presents"]', {
		//字体
		fontname: '微软雅黑',
		fontsize: '12px',
		forecolor: '#999999',
		//true时显示浏览远程服务器按钮。默认值: false
		allowFileManager : false,
//		noDisableItems: true,
//		designMode: false,
		allowPreviewEmoticons: false,
		//true时显示图片上传按钮。默认值: true
		allowImageUpload: false,
		//true时显示Flash上传按钮。默认值: true
		allowFlashUpload: false,
		//true时显示视音频上传按钮。默认值: true
		allowMediaUpload: false,
		//true时显示文件上传按钮。默认值: true
		allowFileUpload: false,
		//2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。默认值: 2
		resizeType: 0,
		//true时显示网络图片标签，false时不显示。默认值: true
		allowImageRemote: false,
		/*配置编辑器的工具栏，其中”/”表示换行，”|”表示分隔符。默认值:
    	[
	        'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
	        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
	        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
	        'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
	        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
	        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
	        'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
	        'anchor', 'link', 'unlink', '|', 'about'
    	]*/

		items:
			[
		        'source', '|', 'justifyleft', 'justifycenter', 'justifyright',
		        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		        'superscript', 'selectall', '|',
		        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
		        'italic', 'underline', 'strikethrough', 'removeformat', '|',
		        'hr', 'pagebreak'
	    	]
	});
});

//校验规则
$("#tradeProductForm").validate({ 
    rules:{ 
		"tradeProduct.name":{
			required:true,
			maxlength:6,
			toFilter:true
		},
		"tradeProduct.features":{
			required:true,
			maxlength:50,
			toFilter:true
		}
    },
    
     messages:{ 
    	"tradeProduct.name":{
			required:"请填写运输方式名称！",
			maxlength:"运输方式名称不能超过6个字！",
			toFilter:"运输方式名称不能包含特殊字符！"
		},
		"tradeProduct.features":{
			required:"请填写运输方式特质！",
			maxlength:"运输方式特质不能超过50个字！",
			toFilter:"运输方式特质不能包含特殊字符！"
		}
    }       
}); 


/**
 *  产品编辑页面保存按钮 
 */
$("#saveProduct").live('click', function() {
    
    if(!$("#tradeProductForm").valid()){
    	return false;
    }
    
    if(!productEditor.html()){
		$.alertPlus("请填写运输方式！", 9, "提示");
		return false;
	}
//	if(toFilter.test(productEditor.html())){
//		$.alertPlus("请填写正确的运输方式，勿包含特殊字符！", 9, "提示");
//		return false;
//	}
    
	//空格处理
    $("#tradeProductForm").find("input").each(function() {
        $(this).val($.trim($(this).val()));
    });
    //如果ID有值就修改，没有则新增
    var tradeProductId = $("#tradeProductId").val();
    var url = tradeProductId ? "updateTradeProduct.do" : "addTradeProduct.do";

    $("#tradeProductPresents").val(productEditor.html());
    //修改
    $("#tradeProductForm").ajaxSubmit({
        url : url,
        type : "post",
        dataType : "json",
        beforeSend: function(){
        	$("#saveProduct").addClass("btn_forbidden").attr("disabled","disabled");
        },
        success: function(data) {
            if (data.msg == "success") {
                $.alertPlus("操作成功", 1, "提示");
                window.self.location = 'toTradeProductIndex.do';
            } else {
                $.alertPlus(data.msg, 2, "提示");
                $("#saveProduct").removeClass("btn_forbidden").removeAttr("disabled","disabled");
            }
        },
        error:function(){
        	$.alertPlus("服务忙，请稍后再试", 8, "提示");
        	$("#saveProduct").removeClass("btn_forbidden").removeAttr("disabled","disabled");
        }
    });
});

