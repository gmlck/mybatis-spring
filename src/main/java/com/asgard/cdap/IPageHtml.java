package com.asgard.cdap;


public interface IPageHtml {
	/**
	 * 获取分页信息的HTML代码
	 * @param page
	 * @param function
	 * @return
	 */
	public String getHtml(PageAttr pa);
}
