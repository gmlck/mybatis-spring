package com.asgard.bms.business.test;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;

import com.asgard.bms.business.model.InfoUser;
import com.asgard.bms.business.model.Person;
import com.asgard.bms.business.service.ILoginService;
import com.asgard.bms.business.service.IPersonService;
import com.asgard.bms.business.util.TradeUtil;
@ContextConfiguration("classpath:ApplicationContext.xml")
public class proTest extends AbstractJUnit4SpringContextTests {
	@Resource
	private IPersonService personService;
	@Resource
	private ILoginService loginService;
	public static void main(String[] args) {
		
		
		ApplicationContext ctx = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		
		System.out.println(ctx);
		
		System.out.println(ctx.getBean("sqlSessionFactory"));
		
		
		System.out.println(UUID.randomUUID().toString().replace("-","").length());
//		Person person = new Person();
//		person.setId(UUID.randomUUID().toString().replace("-",""));
//		person.setAddress("中国北京 ");
//		person.setBieth("aps");
//		person.setEmail("apsliyuan@163.com");
//		person.setPhone("13261213177");
//		person.setUserName("anps");
	}
	
	@Test
	public void testInsertPerson(){
		///person/delete/2
		logger.info("单元测试开始 ............");
		Person person = new Person();
		person.setId("8283");
		person.setAddress("中国北京 ");
		person.setEmail("apsliyuan@163.com");
		person.setPhone("13261213177");
		person.setUserName("anps");
		int count = this.personService.insertPerson(person);
		
		System.out.println(count);
	}
	
	@Test
	public void testQueryPerson(){
		logger.info("单元测试开始 ............");
		Person person = new Person();
		person.setPhone("13261213177");
		List<Person> listPerson = this.personService.queryPerson(person);
		for(Person p : listPerson){
			System.out.println(p.getUserName());
		}
	}
	
	@Test
	public void testInsertUser(){
		InfoUser infoUser = new InfoUser();
		infoUser.setCreateDate(TradeUtil.getCurrentDateTime("yyyy-MM-dd HH:mm:ss"));
		infoUser.setCreateUser("anps");
		infoUser.setId(UUID.randomUUID().toString());
		infoUser.setIsValid(1);
		infoUser.setPassword("123456");
		infoUser.setUserName("apsliyuan");
		
		int count = this.loginService.regirestUser(infoUser);
	}
	
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
