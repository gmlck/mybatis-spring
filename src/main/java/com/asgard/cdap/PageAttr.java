package com.asgard.cdap;


public class PageAttr {
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
		
		public PageAttr() {
			super();
		}

		public PageAttr(Page page, String function, String iframeId,
				String pageList, boolean showPageList, String cssClass, String btnValue) {
			super();
			this.page = page;
			this.function = function;
			this.iframeId = iframeId;
			this.pageList = pageList;
			this.showPageList = showPageList;
			this.cssClass = cssClass;
			this.btnValue = btnValue;
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
