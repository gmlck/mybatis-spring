package com.asgard.cdap;



public class PageHtml implements IPageHtml{
	/**
	 * 方法描述：拼装页数显示部分
	 * @param pageSize
	 * @return
	 * @author anps
	 * @date 2013-3-21 下午2:51:24
	 * @comment
	 */
	@Override
	public String getHtml(PageAttr pa) {
		if(pa.getPage() == null){
			pa.setPage(new Page(0, 0, 0));
		}
		StringBuffer pageHtml = new StringBuffer();
		pageHtml.append("<div class='").append(pa.getCssClass()).append(" clear pageDiv'><span class='all' >总共").append(pa.getPage().getTotalCount()).append("条&nbsp;</span>");
		if(pa.isShowPageList()){
			pageHtml.append("<span>每页</span>")
				.append(getPageSizeOption(pa.getPage().getPageSize(), pa.getFunction(), pa.getPageList()))
				.append("<span>条&nbsp;</span>");
			
		}
		pageHtml.append("<span><a onclick=\"if(")
			.append(!pa.getPage().hasPrevPage()).append("){return false;}")
			.append(pa.getFunction()).append("(").append(pa.getPage().getPrevPage()).append(",").append(pa.getPage().getPageSize()).append(", this)\"");
		if(pa.getPage().hasPrevPage()){
			pageHtml.append(" class='can'");
		}
		pageHtml.append(">上一页</a> ").append("<span>").append(pa.getPage().getPageNo()).append("/").append(pa.getPage().getTotalPage()).append("</span>")
			.append(" <a onclick=\"if(")
			.append(!pa.getPage().hasNextPage()).append("){return false;}")
			.append(pa.getFunction()).append("(").append(pa.getPage().getNextPage()).append(",")
			.append(pa.getPage().getPageSize()).append(", this)\"");
		if(pa.getPage().hasNextPage()){
			pageHtml.append(" class='can'");
		}
		pageHtml.append(">下一页</a> 转到第</span><span><input onkeydown=\"javascript:if(event.keyCode == 13){$(this).blur();$(this).parents('.pageDiv').find('.go').trigger('click')}\" onblur=\"javascript:this.value=this.value.replace(/\\D/g,'');if(this.value<1){this.value=1};if(this.value>")
			.append(pa.getPage().getTotalPage()).append("){this.value=").append(pa.getPage().getTotalPage())
			.append("}\" type=\"text\" class=\"ipt_page\" value=\"")
			.append(pa.getPage().getPageNo()).append("\" size=\"3\" /></span></span><span>页 ")
			.append("<input class=\"go btn_gray\" type=\"button\" value=\"").append(pa.getBtnValue()).append("\" onclick=\"")
			.append(pa.getFunction()).append("(parseInt($(this).parents('.pageDiv').find('.ipt_page').val()),")
			.append(pa.getPage().getPageSize()).append(", this)\"");
		
		if(pa.getPage().getTotalPage() == 1){
			pageHtml.append(" disabled='disabled'");
		}
		pageHtml.append("/></span></div>");
			
		return pageHtml.toString();
		//if(event.keyCode == 13)$(this).parent().next().find( '.go').trigger('click')
	}

	/**
	 * 方法描述：拼装每页显示数量的下拉框
	 * @param pageSize
	 * @return
	 * @author anps
	 * @date 2013-3-21 下午2:51:24
	 * @comment
	 */
	private String getPageSizeOption(int pageSize, String function, String pageList) {
		int[] pageSizeArray = { 5, 10, 15, 20 };
		if(null != pageList && !"".equals(pageList)){
			String[] strs = pageList.split(",");
			pageSizeArray = new int[strs.length];
			for(int i=0; i<strs.length; i++){
				pageSizeArray[i] = Integer.parseInt(strs[i]);
			}
		}
		
		StringBuffer options = new StringBuffer();
		
		options.append("<span class=\"spinner_page\"><span class=\"text\">").append(pageSize).append("</span><div class=\"list\"><div class=\"list_top\"></div><ul>");
		
		for (int i = 0; i < pageSizeArray.length; i++) {
			int item = pageSizeArray[i];
			options.append("<li onclick=\"").append(function).append("(1, ")
				.append(item)
				.append(", this)\">")
				.append(item)
				.append("</li>");
		}
		
		options.append("</ul><div class=\"list_bottom\"></div></div></span>");
		
		
		
//		options.append("<select name='pageSize' id='pageSize' onchange=\"")
//			.append(function)
//			.append("(1,this.value)\">");
//			
//		for (int i = 0; i < pageSizeArray.length; i++) {
//			int item = pageSizeArray[i];
//			options.append("<option value=\"").append(item).append("\" ");
//			if (item == pageSize) {
//				options.append("selected=\"selected\"");
//			}
//			options.append(">").append(item).append("</option>");
//		}
//		options.append("</select>");
		return options.toString();
	}
}
