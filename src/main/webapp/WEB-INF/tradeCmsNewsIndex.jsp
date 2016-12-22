<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>新闻公告</title>
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="keywords" content="0" />
		<meta http-equiv="description" content="0" />
		<link href="<%=basePath %>new/css/common/commonNew.css" rel="stylesheet" type="text/css" />
		<link href="<%=basePath %>new/css/trade/freightFamily.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="fP_news">
		<div class="fP_cont_right">
			<div class="box_1">
				<div class="box1_title"><a href="<%=basePath %>renjia/toFreightIndex.do">我的商铺  </a>&nbsp;>&nbsp;商铺管理&nbsp;>&nbsp;新闻公告</div>
				<form class="select clear" id="conditionForm">
					<div class="info_box">
						<div class="box332">
							<div class="box_title">电话本地人：</div>
							<div class="box_text">
								<input type="text" class="text width195" name="news.newsTitle" />
							</div>
						</div>
						<div class="box332">
							<div class="box_title">电话号码：</div>
							<input type="text" class="text width195" name="news.newsTitle" />
						</div>
						<div class="box332">
							<div class="box_title">发布时间：</div>
							<div class="box_text">
								<div class="text_date width70">
									<input type="text" class="text width70 datePickers" id="startDate" name="condition.startDate" onfocus="WdatePicker({el:this,onpicked:function(){endDate.focus();},startDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'endDate\')}'})" />
									<span></span>
								</div>
								<span class="line">&nbsp;-&nbsp;</span>
								<div class="text_date width70">
									<input type="text" class="text width70 datePickers" id="endDate" name="condition.endDate" onfocus="WdatePicker({el:this,minDate:'#F{$dp.$D(\'startDate\')||\'%y-%M-%d\'}',startDate:'%y-%M-%d'})" />
									<span></span>
								</div>
							</div>
						</div>
					</div>
					
					<input name="pageSize" type="hidden" id="pageSize" />
					<input name="pageNum" type="hidden" id="pageNum" />
				
					<div class="select_btns">
						<input type="button" class="btn_yellow" value="查&nbsp;&nbsp;询" id="queryCmsNewsBtn" />
						<input type="reset" class="btn_gray" value="重&nbsp;&nbsp;置" />
					</div>
				</form>
				<div class="data_list" id="tradeCmsNewsListDiv">
					<s:include value="tradeCmsNewsList.jsp"></s:include>
				</div>
			</div>
		</div>
		
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-form.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery.validate.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-Validate_expand.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/commonNew.js"></script>
	</body>
</html>
