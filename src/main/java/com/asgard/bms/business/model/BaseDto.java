package com.asgard.bms.business.model;
/**
 * 类描述：基础DTO
 * <p> Copyright 2013 by mytd Software corporation,
 * <p>All rights reserved.
 * <p>版权所有：满意通达（北京）软件责任有限公司
 * <p>未经本公司许可，不得以任何方式复制或使用本程序任何部分，<p>
 * 侵权者将受到法律追究。
 * @author 吴青岭
 * @date 2013-4-2 下午05:51:53
 * @comment
 * @version 1.0
 */
public class BaseDto implements java.io.Serializable{
	//序列化
	private static final long serialVersionUID = 1L;
	//是否有效
	private int isValid;
	// 创建时间
	private String createDate;
	// 创建人
	private String createUser;
	// 最后操作时间
	private String latestOpDate;
	// 最后操作人
	private String latestOpUser;
	
	public int getIsValid() {
		return isValid;
	}
	public void setIsValid(int isValid) {
		this.isValid = isValid;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getLatestOpDate() {
		return latestOpDate;
	}
	public void setLatestOpDate(String latestOpDate) {
		this.latestOpDate = latestOpDate;
	}
	public String getLatestOpUser() {
		return latestOpUser;
	}
	public void setLatestOpUser(String latestOpUser) {
		this.latestOpUser = latestOpUser;
	}
	
	
}
