var demandEditor;
KindEditor.options.cssData = 'body { font-size: 12px; font-family: "微软雅黑"; color: #666666; font-style:normal; }';
KindEditor.ready(function(K) {
	demandEditor = K.create('textarea[name="tradeCustomDemand.demandContent"]', {
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
$("#demandForm").validate({ 
    rules:{ 
		"tradeCustomDemand.demandTitle":{
			required:true,
			maxlength:60,
			toFilter:true
		}
    },
    
     messages:{ 
    	"tradeCustomDemand.demandTitle":{
			required:"请填写需求标题！",
			maxlength:"需求标题最多可输入{0}个字符！",
			toFilter:"请输入正确的需求标题！"
		}
    }       
}); 


/**
 *  产品编辑页面保存按钮 
 */
$("#subDemand").live('click', function() {
	if(!$("#demandForm").valid()){
    	return false;
    }
	
    if(!demandEditor.html()){
		$.alertPlus("请填写需求内容！", 9, "提示");
		return false;
	}
	if(toFilter.test(demandEditor.html())){
		$.alertPlus("请填写正确的需求标题，勿包含特殊字符！", 9, "提示");
		return false;
	}
    
	//空格处理
    $("#demandForm").find("input").each(function() {
        $(this).val($.trim($(this).val()));
    });
    
    $("#demandContent").val(demandEditor.html());
    
    //提交
    $("#demandForm").ajaxSubmit({
        url : "addDemand.do",
        type : "post",
        dataType : "json",
        beforeSend: function(){
        	$("#subDemand").addClass("btn_forbidden").attr("disabled","disabled");
        },
        success: function(data) {
            if (data.msg == "success") {
                $.alertPlus("我们已经收到您的需求，并会及时和您联系！谢谢反馈！", 1, "提示");
                location.href = "toServices.do";
            } else {
                $.alertPlus(data.msg, 2, "提示");
                $("#subDemand").removeClass("btn_forbidden").removeAttr("disabled","disabled");
            }
        },
        error:function(){
        	$.alertPlus("服务忙，请稍后再试！", 8, "提示");
        	$("#subDemand").removeClass("btn_forbidden").removeAttr("disabled","disabled");
        }
    });
});