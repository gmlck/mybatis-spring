package com.asgard.bms.business.base;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;

import com.opensymphony.xwork2.ActionSupport;

/***
 * 类描述： strtus2 的积类
 * <p>
 * Copyright 2014 by mytd Software corporation All rights reserved.
 * <p>
 * 版权所有：满意通达（北京）软件责任有限公司
 * <p>
 * 未经本公司许可，不得以任何方式复制或使用本程序任何部分，侵权者将受到法律追究。
 * </p>
 * 
 * @author 安普尚
 * @date 2014年8月5日 上午10:16:02
 * @version 1.0
 */
public class BaseAction extends ActionSupport implements SessionAware,
		ServletRequestAware, ServletResponseAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5107613025405006229L;

	protected Map<String, Object> session;
	protected HttpServletRequest request;
	protected HttpServletResponse response;

	protected HttpSession sessionsSession;

	protected static final String SUCCESS = "success";
	protected static final String FAIL = "fail";
	protected static final String ERROR = "error";
	// 每页数量大小
	public static final int pageSize = 8;
	// 要查询的页数
	public static final int pageNum = 1;

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}

	@Override
	public String execute() throws Exception {
		return SUCCESS;
	}

	public HttpSession getSessionsSession() {
		return sessionsSession;
	}

	public void setSessionsSession(HttpSession sessionsSession) {
		this.sessionsSession = sessionsSession;
	}

	public static int getPagesize() {
		return pageSize;
	}

	public static int getPagenum() {
		return pageNum;
	}
	
}
