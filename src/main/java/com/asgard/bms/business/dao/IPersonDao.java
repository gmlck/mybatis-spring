package com.asgard.bms.business.dao;

import java.util.List;

import com.asgard.bms.business.model.Person;

public interface IPersonDao {
	
	int updatePerson(Person person);
	
	int deletePeronByPhone(Person person);
	
	int insertPerson(Person person);
	
	List<Person> queryPerson(Person person);
}
