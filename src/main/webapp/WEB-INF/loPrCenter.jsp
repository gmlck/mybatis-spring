<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>短信平台</title>
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<meta http-equiv="keywords" content="0" />
<meta http-equiv="description" content="0" />
<link rel="shortcut icon" type="image/x-icon" href="<%=basePath %>favicon.ico" media="screen" />
<link href="<%=basePath %>new/css/common/commonNew.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath %>new/css/trade/myMY.css" rel="stylesheet" type="text/css" />
</head>
<body class="tariff_manage">
	
	<jsp:include page="tradeSubmenu.jsp"></jsp:include>
	<div class="main clear">
		<iframe id="pages" name="mainIFrame" width="1072px" scrolling="no" src="toCmsIndexPage.do"
			frameborder="0" allowtransparency="true" onload="dyniframesize();"
			IFRAME.contentWindow.documnet.body.backgroundColor="transparent"></iframe>
	</div>
	
	    <script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-form.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery.validate.min.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/layer/layer.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/commonNew.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/iframe.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/trade/common/menu.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/trade/common/tradeNavBars.js"></script>  
	    <script type="text/javascript" src="<%=basePath %>new/js/info/infoValidate_expand.js"></script>
</body>
</html>
