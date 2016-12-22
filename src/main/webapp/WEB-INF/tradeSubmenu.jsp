<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<link href="<%=basePath %>new/css/trade/loPrCenter.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath %>new/css/trade/myMY.css" rel="stylesheet" type="text/css" />
<%--<script type="text/javascript">
try{
	window.menuJsonStr = eval(${menuJsonStr});
	window.menuType = ${menuType};
}catch(e){
	alert(e);
}
</script>
--%><div class="submenu">
	<h2>我的交易</h2>
	<ul class="one_menu" id="one_menu">
		<ul class="one_menu" id="one_menu">

			<li><div class="one_menu_title">
					<span></span><a href="javascript:void(0);"
						target="mainIFrame">我的短信</a>
				</div>
				<ul id="6ef07c88-6261-41de-b10c-5de8f9102a5a">
					<li class="two_menu"><a href="<%=basePath %>toCmsIndexPage.do"
						target="mainIFrame">短信平台,,,</a>
					</li>
				</ul>
			</li>
		</ul>
	</ul>
</div>
