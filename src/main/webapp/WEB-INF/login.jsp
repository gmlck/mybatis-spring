<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>登录</title>
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="keywords" content="0" />
		<meta http-equiv="description" content="0" />
		<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" media="screen" />
		<link href="<%=basePath %>new/css/common/commonNew.css" rel="stylesheet" type="text/css" />
		<link href="<%=basePath %>new/css/trade/trade.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="login">
	<input id="basePath" value="<%=basePath %>" type="hidden"/>
	<input type="hidden" value="toIndexPage.do" id="nextUrl"/>
	<input type="hidden" id="loginCount" value="${session.loginCount}"/>
	<input type="hidden" value="${msg}"/> 
	<form id="loginForm">
		<div class="login_top">
			
		</div>
		<div class="main clear">
			<img class="login_img" src="<%=basePath %>new/images/cms/img/login_img.gif" />
			<div class="content">
				<div class="con_title">用户名/手机号：</div>
				<div class="con_text"><input type="text" class="text width245" name="user.userName" id="userName" tabindex="1" value="请输入用户名或手机号" /></div>
				<div class="con_title">登录密码：</div>
				<div class="con_text"><input type="password" class="text width245"  name="user.password" tabindex="2" id="pwd" /></div>
				 
				<div class="code">
					<span>验证码：</span> 
					<input type="text" class="text width55"  id="validateCode" name="validateCode" tabindex="3" />
					<img class="key" alt="验证码" title="点击更换" id="valdiateImgSelect" onclick="javascript:refresh(this);" src="makeValidateCode.do" />
					<a href="javascript:void(0);" id="valdiateImg">点击更换验证码</a>
				</div>
				
				<div class="remember clear">
					<span><input type="checkbox" name="remember" tabindex="25" value="on" onclick="remember1(this)" id="autoLoginChk" />两周内自动登录</span>
					<span><input type="checkbox" tabindex="26" value="on" name="remeberName" id="remeberName" />记住用户名</span>
					<a tabindex="30" href="javascript:backpwd();">忘记密码</a>
				</div>
				<input type="submit" class="btn_yellow" value="登&nbsp;&nbsp;&nbsp;&nbsp;录" id="loginBtn"/>
				<div class="forget clear">
					<a href="<%=basePath %>">返回首页</a>
					<span>没有账号？<a  tabindex="28" onclick="javascript:location.href='registerPersonal.do'" href="javascript:void(0)">立即注册</a></span>
				</div>
				<%-- <div class="third">
					<span>第三方账户：</span>
					<a class="qq">QQ</a>
					<a class="weibo">微博</a>
					<a class="taobao">淘宝</a>
				</div> --%>
			</div>
		</div>
	</form>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-form.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery.validate.min.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/layer/layer.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/commonNew.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/iframe.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/trade/common/menu.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/trade/common/tradeNavBars.js"></script>  
	    <script type="text/javascript" src="<%=basePath %>new/js/info/infoValidate_expand.js"></script>
        <script type="text/javascript" src="<%=basePath %>new/js/cms/login.js"></script>
    
     
</body>
</html>