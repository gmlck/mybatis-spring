package com.asgard.bms.business.interceptor;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.asgard.bms.business.model.InfoUser;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;

public class LoginedCheckInterceptor extends MethodFilterInterceptor  {

	/***/
	private static final long serialVersionUID = 9205768599855340010L;

	@Override
	public String doIntercept(ActionInvocation ai) throws Exception {
		//取得请求的URL  
        HttpServletResponse response=ServletActionContext.getResponse();  
        response.setHeader("Pragma","No-cache");            
        response.setHeader("Cache-Control","no-cache");     
        response.setHeader("Cache-Control", "no-store");     
        response.setDateHeader("Expires",0);
        InfoUser infoUser = null;
      //对登录与注销请求直接放行,不予拦截  
       
        	//验证Session是否过期  
            if(!ServletActionContext.getRequest().isRequestedSessionIdValid()){  
                //session过期,转向session过期提示页,最终跳转至登录页面  
                return "tologin";  
            }else{
            	infoUser = (InfoUser)ServletActionContext.getRequest().getSession().getAttribute("SeesionloginName");
            	if(infoUser == null){
            		return "tologin";
            	}else{
            		ai.invoke();
            	}
            }  
        
		return null;
	}
		
		
}
