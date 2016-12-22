package com.asgard.bms.business.action;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.asgard.bms.business.base.BaseAction;
import com.asgard.bms.business.util.RandomValidateCodeUtil;
/***
 * 类描述： 注册用户
 * <p> Copyright 2014 by asgardGame Software corporation All rights reserved.
 * <p>版权所有：北京仙境乐网科技有限公司
 * <p>未经本公司许可，不得以任何方式复制或使用本程序任何部分，侵权者将受到法律追究。</p>
 * @author 安普尚
 * @date 2014年8月5日 下午8:52:39
 * @version 1.0
 */
@Controller
@Scope("prototype")
public class InfoRegisterAction extends BaseAction{

	/***/
	private static final long serialVersionUID = -4817185539240717908L;

	
	
	
	
	public void makeValidateCode(){
		RandomValidateCodeUtil rvcu = new RandomValidateCodeUtil();
		rvcu.getRandcode(request, response);
	}
	
}
