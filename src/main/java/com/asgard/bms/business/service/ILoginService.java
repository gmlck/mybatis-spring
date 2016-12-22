package com.asgard.bms.business.service;

import java.util.List;

import com.asgard.bms.business.model.InfoUser;

public interface ILoginService {
	
	public InfoUser login(InfoUser user)throws Exception;

	public int regirestUser(InfoUser infoUser);
	
	public List<InfoUser> queryUserList(InfoUser infoUser, int pagenum,
										int pagesize);

	public int queryUserCount(InfoUser infoUser);
}
