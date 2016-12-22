package com.asgard.excl.text;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;

import com.asgard.bms.business.service.ILoginService;
import com.asgard.bms.business.service.IPersonService;

/**
 * Servlet implementation class ExcuServlet
 */
@Controller
public class ExcuServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	@Resource
	private IPersonService personService;
	@Resource
	private ILoginService loginService;
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("dfdff");
	}
}
