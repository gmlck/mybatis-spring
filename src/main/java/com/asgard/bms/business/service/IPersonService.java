package com.asgard.bms.business.service;

import java.util.List;

import com.asgard.bms.business.model.Person;

public interface IPersonService {
	
	int updatePerson(Person person);
	
	int deletePeronByPhone(Person person);
	
	int insertPerson(Person person);
	
	List<Person> queryPerson(Person person);
}
