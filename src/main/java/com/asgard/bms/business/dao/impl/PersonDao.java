package com.asgard.bms.business.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.asgard.bms.business.base.BaseDAO;
import com.asgard.bms.business.dao.IPersonDao;
import com.asgard.bms.business.model.Person;
@Repository
public class PersonDao implements  IPersonDao{

	private static final String MAPPER_NAMESAPCE_PERSON = "com.asgard.bms.business.mapper.person.";
	@Resource
	private BaseDAO baseDAO;
	@Override
	public int updatePerson(Person person) {
		return this.baseDAO.update(MAPPER_NAMESAPCE_PERSON+"updatePerson", person);
	}
	@Override
	public int deletePeronByPhone(Person person) {
		// TODO Auto-generated method stub
		return this.baseDAO.delete(MAPPER_NAMESAPCE_PERSON +"deletePeronByPhone", person);
	}
	@Override
	public int insertPerson(Person person) {
		// TODO Auto-generated method stub
		System.out.println(">>>:"+person);
		return baseDAO.insert(MAPPER_NAMESAPCE_PERSON+"insert", person);
	}

	@Override
	public List<Person> queryPerson(Person person) {
		// TODO Auto-generated method stub
		List<Person> personList = this.baseDAO.selectList(MAPPER_NAMESAPCE_PERSON+"queryPerson", person);
		if(personList != null && personList.size() > 0 && !personList.isEmpty()){
			return personList;
		}
		return null;
	}

}
