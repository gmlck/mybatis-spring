<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://www.asgard.com/tags/page" prefix="p"%>
<html>
<head>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="<%=basePath %>new/css/common/commonNew.css" rel="stylesheet" type="text/css" />
<link href="<%=basePath %>new/css/trade/myMY.css" rel="stylesheet" type="text/css" />
<title>infoUserList.jsp</title>
</head>
<body>
	<div class="right">
				<p:page page="${page}" function="queryTradeInsurance" showPageList="false" cssClass="paging" btnValue="确定"/>
	</div>
</body>
</html>