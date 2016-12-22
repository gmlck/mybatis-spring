package com.asgard.bms.business.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asgard.bms.business.dao.IPersonDao;
import com.asgard.bms.business.model.Person;
import com.asgard.bms.business.service.IPersonService;
@Service
public class PersonService implements IPersonService{

	@Resource
	private IPersonDao personDao;
	
	@Transactional
	@Override
	public int updatePerson(Person person) {
		// TODO Auto-generated method stub
		return this.personDao.updatePerson(person);
	}

	@Transactional
	@Override
	public int deletePeronByPhone(Person person) {
		// TODO Auto-generated method stub
		return this.personDao.deletePeronByPhone(person);
	}

	@Transactional
	@Override
	public int insertPerson(Person person) {
		// TODO Auto-generated method stub
		return this.personDao.insertPerson(person);
	}

	
	@Override
	public List<Person> queryPerson(Person person) {
		// TODO Auto-generated method stub
		return this.personDao.queryPerson(person);
	}

}
