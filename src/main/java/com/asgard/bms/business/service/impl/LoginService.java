package com.asgard.bms.business.service.impl;

import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asgard.bms.business.dao.ILoginDao;
import com.asgard.bms.business.model.InfoUser;
import com.asgard.bms.business.service.ILoginService;
import com.asgard.bms.business.util.TradeUtil;
@Service
public class LoginService implements ILoginService {
	
	@Resource
	private ILoginDao loginDao;
	@Override
	public InfoUser login(InfoUser user) throws Exception {
		return this.loginDao.login(user);
	}
	
	
	/***
	 * 注册用户
	 */
	@Transactional
	@Override
	public int regirestUser(InfoUser infoUser) {
		// TODO Auto-generated method stub
		infoUser.setCreateDate(TradeUtil.getCurrentDateTime("yyyy-MM-dd HH:mm:ss"));
		infoUser.setId(UUID.randomUUID().toString());
		infoUser.setIsValid(1);
		infoUser.setCreateUser(infoUser.getUserName());
		return this.loginDao.regirestUser(infoUser);
	}

	/***
	 * 测试分页功能
	 */
	@Override
	public List<InfoUser> queryUserList(InfoUser infoUser, int pagenum,
			int pagesize) {
		// TODO Auto-generated method stub
		
		return this.loginDao.queryUserList(infoUser,pagenum,pagesize);
	}


	@Override
	public int queryUserCount(InfoUser infoUser) {
		// TODO Auto-generated method stub
		return this.loginDao.queryUserCount(infoUser);
	}
	
}
