package com.asgard.bms.business.dao.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.asgard.bms.business.base.BaseDAO;
import com.asgard.bms.business.dao.ILoginDao;
import com.asgard.bms.business.model.InfoUser;

@Repository
public class LoginDao implements ILoginDao{

	private static final String NAMESPACE_INFOUSER = "com.asgard.bms.business.mapper.InfoUser.";
	@Resource
	private BaseDAO baseDAO;
	
	@Override
	public InfoUser login(InfoUser user) throws Exception {
		// TODO Auto-generated method stub
		return this.baseDAO.selectOne(NAMESPACE_INFOUSER+"queryByUserName",user);
	}

	/***
	 * 注册用户
	 */
	@Override
	public int regirestUser(InfoUser infoUser) {
		// TODO Auto-generated method stub
		return baseDAO.insert(NAMESPACE_INFOUSER+"insertUser", infoUser);
	}
	/***
	 * 测试分页功能
	 */
	@Override
	public List<InfoUser> queryUserList(InfoUser infoUser, int pagenum,
			int pagesize) {
		RowBounds rowBounds = new RowBounds((pagenum-1)*pagesize, pagesize);
		return baseDAO.selectList(NAMESPACE_INFOUSER+"queryByUserName", infoUser,rowBounds);
	}

	@Override
	public int queryUserCount(InfoUser infoUser) {
		// TODO Auto-generated method stub
		return baseDAO.selectOne(NAMESPACE_INFOUSER+"queryUserCount", infoUser);
	}
	
}
