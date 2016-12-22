<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<div class="operation_top">
	<a class="data_check_all">全选</a> <a class="data_add"
		href="toAddNews.do">发布文章</a> <a class="data_delete" id="delNews"
		href="javascript:void(0);">删除选中</a>
</div>
<div class="data_title">
	<span class="data1">选择</span> <span class="data2">操作</span> <span
		class="data3 txt_apostrophe">文章标题</span> <span class="data4">文章类型</span>
	<span class="data5">发布人</span> <span class="data6">发布时间</span>
</div>

<div class="data_box">
	<span class="data1"><input type="checkbox" value="${item.id }" /></span>
	<span class="data2"><a href="toEditNews.do?news.id=${item.id }">编辑</a><a
		href="toViewNews.do?news.id=${item.id }">查看</a></span> <span
		class="data3 txt_apostrophe">${item.newsTitle }</span> <span
		class="data4">${item.newsTypeName }</span> <span
		class="data5 txt_apostrophe">${item.createUser }</span> <span
		class="data6">${item.createTime }</span>
</div>




			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>
			<div class="data_box">
				<div class="nodata height60"></div>
			</div>

<div class="operation_bottom">
	<p:page function="queryNews" page="${page }" cssClass="paging"
		showPageList="false" btnValue="确定" />
</div>
