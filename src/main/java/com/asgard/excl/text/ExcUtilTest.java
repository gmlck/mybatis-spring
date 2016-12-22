package com.asgard.excl.text;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import com.asgard.bms.business.model.InfoUser;
import com.asgard.bms.business.service.ILoginService;
import com.asgard.bms.business.service.IPersonService;

@ContextConfiguration("classpath:ApplicationContext.xml")
public class ExcUtilTest extends AbstractJUnit4SpringContextTests{
	@Resource
	private IPersonService personService;
	@Resource
	private ILoginService loginService;
	@Test
	public void testQuery(){
		InfoUser infoUser = new InfoUser();
		infoUser.setUserName("apsliyuan");
		List s = this.loginService.queryUserList(infoUser,1,8);
		int count = this.loginService.queryUserCount(infoUser);
		System.out.println(count);
		System.out.println(s.size());
	}
}
