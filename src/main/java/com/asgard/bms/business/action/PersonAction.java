package com.asgard.bms.business.action;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.asgard.bms.business.base.CmsBaseAction;
import com.asgard.bms.business.model.Person;
import com.asgard.bms.business.service.IPersonService;

/***
 * 类描述 :测试 action
 * <p>
 * Copyright 2014 by asgardGame Software corporation All rights reserved.
 * <p>
 * 版权所有：北京仙境乐网科技有限公司
 * <p>
 * 未经本公司许可，不得以任何方式复制或使用本程序任何部分，侵权者将受到法律追究。
 * </p>
 * 
 * @author 安普尚
 * @date 2014年8月5日 上午10:22:13
 * @version 1.0
 */
@Controller
@Scope("prototype")
public class PersonAction extends CmsBaseAction {

	private static final Logger logger = Logger.getLogger(PersonAction.class);
	/***/
	private static final long serialVersionUID = -4040191641599734600L;
	@Resource
	private IPersonService personService;

	private Person person;
	
	private String message;

	private List<Person> personList;

	/***
	 * 方法描述： by phone query user
	 * 
	 * @return
	 * @author 安普尚
	 * @date 2014年8月5日 上午10:43:47
	 */
	public String queryPersonByPhone() {
		Person p = (Person) isNullObject(person);
		p.setPhone("13261213177");
		personList = this.personService.queryPerson(p);
		
		return SUCCESS;
	}

	/***
	 * 方法描述： entity is null
	 * 
	 * @return
	 * @author 安普尚
	 * @date 2014年8月5日 上午10:31:58
	 */
	public Object isNullObject(Object entityClass) {
		if (entityClass == null) {
			try {
				return new Person();
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
		} else {
			return entityClass;
		}
		return entityClass;
	}

	@Test
	public void testObj() {
		Person p = new Person();
		p.setAddress("dfjk");
		System.out.println(isNullObject(p));
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	public List<Person> getPersonList() {
		return personList;
	}

	public void setPersonList(List<Person> personList) {
		this.personList = personList;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
