package com.asgard.cdap;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.lang.StringUtils;

public class PageTag extends TagSupport {

	/***/
	private static final long serialVersionUID = 6445526825589882875L;

	//后台返回的Page对象
		private Page page;
		//回调的JS函数名
		private String function;
		//iframe的ID
		private String iframeId;
		//每页数量List
		private String pageList;
		//是否显示每页数据量
		private boolean showPageList = true;
		//分页标签的class，用于控制样式
		private String cssClass = "page";
		//跳转页数按钮文字
		private String btnValue = "";
		// 生成分页HTML代码接口类
		private IPageHtml pageHtml = new PageHtml();

		@Override
		public int doEndTag() throws JspException {

			JspWriter out = pageContext.getOut();
			try {
				if(StringUtils.isNotEmpty(iframeId)){
					function = "$('iframe:visible')[0].contentWindow." + function;
				}
				PageAttr pa = new PageAttr(page, function, iframeId, pageList, showPageList, cssClass, btnValue);
				out.println(pageHtml.getHtml(pa));

			} catch (IOException e) {
				e.printStackTrace();
			}

			return super.doEndTag();
		}

		public Page getPage() {
			return page;
		}

		public void setPage(Page page) {
			this.page = page;
		}

		public String getFunction() {
			return function;
		}

		public void setFunction(String function) {
			this.function = function;
		}

		public String getIframeId() {
			return iframeId;
		}

		public void setIframeId(String iframeId) {
			this.iframeId = iframeId;
		}

		public String getPageList() {
			return pageList;
		}

		public void setPageList(String pageList) {
			this.pageList = pageList;
		}

		public boolean isShowPageList() {
			return showPageList;
		}

		public void setShowPageList(boolean showPageList) {
			this.showPageList = showPageList;
		}

		public String getCssClass() {
			return cssClass;
		}

		public void setCssClass(String cssClass) {
			this.cssClass = cssClass;
		}

		public String getBtnValue() {
			return btnValue;
		}

		public void setBtnValue(String btnValue) {
			this.btnValue = btnValue;
		}
}
