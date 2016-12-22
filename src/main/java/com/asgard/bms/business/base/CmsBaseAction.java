package com.asgard.bms.business.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

public class CmsBaseAction extends BaseAction implements ServletRequestAware,ServletResponseAware{
	
	private static final long serialVersionUID = 4255071290368829275L;
	protected HttpSession session;
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	
	
	//总数量
	protected int totalCount;
	//提示信息
	protected String msg;

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
		session = request.getSession();
	}
	
	@Override
	public String execute() throws Exception {
		return SUCCESS;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}



	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}
