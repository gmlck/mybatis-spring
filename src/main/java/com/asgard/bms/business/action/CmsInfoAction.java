package com.asgard.bms.business.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.asgard.bms.business.base.BaseAction;
import com.asgard.bms.business.model.InfoUser;
@Controller
@Scope("prototype")
public class CmsInfoAction extends BaseAction {

	/***/
	private static final long serialVersionUID = 1705256342039570921L;

	private InfoUser user;
	/***
	* 方法描述:到达短信平台列表页面
	* @return
	* @author 安普尚
	* @date 2014年8月7日 上午10:10:22
	 */
	public String toCmsIndexPage(){
		System.out.println("apsliundf");
		queryCmsAdminNewsInfo();
		return SUCCESS;
	}
	
	
	public String queryCmsAdminNewsInfo(){
		//TODO 在这里去调用查询短信的方法
		return SUCCESS;
	}
	
	
	
}
