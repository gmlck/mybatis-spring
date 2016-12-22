var newsEditor;
KindEditor.options.cssData = 'body { font-size: 12px; font-family: "微软雅黑"; color: #666666; font-style:normal; }';
KindEditor.ready(function(K) {
	newsEditor = K.create('textarea[name="news.newsContent"]', {
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

/**
 * 异步发布文章，并如果成功则跳转页面
 */
$("#addNews #newsSubmit").live("click", function(){
	var action = 'addCmsNews.do';
	submitCmsNews(action);
});

$("#addNews #newsUpdate").live("click", function(){
	var action = "updateCmsNews.do";
	submitCmsNews(action);
});

function submitCmsNews(action){
	if(!$("#newsTitle").val()){
		$.alertPlus("请填写文章标题！", 9, "提示");
		return false;
	}
	if(toFilter.test($("#newsTitle").val())){
		$.alertPlus("请填写正确的文章标题，勿包含特殊字符！", 9, "提示");
		return false;
	}
	if($("#newsTitle").val().length > 60){
		$.alertPlus("请填写正确的文章标题，长度最大为60个字符！", 9, "提示");
		return false;
	}
	if(!$("#newsType").val()){
		$.alertPlus("请选择文章类型！", 9, "提示");
		return false;
	}
	if(!newsEditor.html()){
		$.alertPlus("请填写文章内容！", 9, "提示");
		return false;
	}
	if(toFilter.test(newsEditor.html())){
		$.alertPlus("请填写正确的文章内容，勿包含特殊字符！", 9, "提示");
		return false;
	}
	$("#newsContent").val(newsEditor.html());
	//异步提交表单数据
	var options = { 
        url:action, //提交给哪个执行
        type:'POST', 
        success: function(data){
        	if(data.msg == "success"){
        		$.alertPlus("操作成功！", 1, "提示", function(index){
        			location.href="renjia/toNewsIndex.do";
        			$.closePlus(index);
        		});
        	}else{
        		$.alertPlus(data.msg, 2, "提示");
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("操作失败！", 2, "提示");
		}
    }; 
    $('#addNews').ajaxSubmit(options); 
}

