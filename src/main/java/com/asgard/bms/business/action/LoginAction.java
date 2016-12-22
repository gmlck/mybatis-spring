package com.asgard.bms.business.action;

import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.asgard.bms.business.base.BaseAction;
import com.asgard.bms.business.model.InfoUser;
import com.asgard.bms.business.service.ILoginService;
import com.asgard.bms.business.util.CmsUtil;
import com.asgard.bms.business.util.EncryptUtil;
import com.asgard.bms.business.util.RandomValidateCodeUtil;
import com.asgard.cdap.Page;
import com.opensymphony.xwork2.ActionContext;
@Controller
@Scope("prototype")
public class LoginAction extends BaseAction {

	@Resource
	private ILoginService loginService;
	/***/
	private static final long serialVersionUID = -4498340918277116138L;
	private String isLogin = "0";
	private String validateCode;
	// 0:代表不需要输入验证码 1:请输入验证码 2:验证码错误
	private int needValidateCode = 0;
	private Map<String, Object> attibutes;
	private InfoUser user;
	private String msg;
	//表示查找结果是否存在
	private boolean exist = false;
	
	List<InfoUser> infoUserList;
	//用户名值
    private String fieldValue;
	
    private int totalCount;
  //分页
  	protected Page page;
	/**
	 * 登陆之后跳转的页面
	 */
	private String nextUrl = "";

	public String getNextUrl() {
		return nextUrl;
	}

	public void setNextUrl(String nextUrl) {
		this.nextUrl = nextUrl;
	}
	/***
	 * 方法描述： 登陆 方法
	 * 
	 * @return
	 * @author 安普尚
	 * @date 2014年8月5日 下午9:54:15
	 */
	public String login() throws Exception {
		
		if(user == null){
			this.msg ="登陆用户错误";
			return "errorpage";
		}
		
		if (CmsUtil.isEmpty(validateCode)) {
			needValidateCode = 1;
			msg = "请输入验证码!";
			return ERROR;
		}
		String keyValue = (String) request.getSession().getAttribute(
				RandomValidateCodeUtil.RANDOMCODEKEY);
		if (!validateCode.equalsIgnoreCase(keyValue)) {
			msg = "验证码录入错误!";
			needValidateCode = 2;
			return ERROR;
		}
		// 对密码进行加密
		String password = EncryptUtil.EncryptString(user.getPassword());
		user.setPassword(password);

		String userName = user.getUserName();
		// 手机登陆
		Pattern pattern = Pattern.compile("^(13|14|15|18)\\d{9}$");
		Matcher matcher = pattern.matcher(userName);
		if (matcher.find()) {
			user.setUserName(userName);
		}
		user = loginService.login(user);
		if (null == user) {
			this.msg = "用户名或者密码错误";
		} else {
			isLogin = "1";
			msg = "登录成功";
			ActionContext.getContext().getSession().put("SeesionloginName",user);  
		}
		return SUCCESS;
	}
	
	/***
	* 方法描述：
	* @return
	* @author 安普尚
	* @date 2014年8月6日 下午2:38:32
	 */
	public String checkName(){
		if(!CmsUtil.isEmpty(fieldValue)){
			try {
				InfoUser user = new InfoUser();
				user.setUserName(fieldValue);
				InfoUser infouser = this.loginService.login(user);
				if(infouser ==null){
					exist = true;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return SUCCESS;
	}

	
	
	/***
	* 方法描述： 注册
	* @return
	* @author 安普尚
	* @date 2014年8月6日 下午2:54:26
	 */
	public String register(){
		// 对密码进行加密
		String password = EncryptUtil.EncryptString(user.getPassword());
		user.setPassword(password);
		try {
			if(loginService.login(user)!=null){
				this.msg = "该用户已被使用";
				return ERROR;
			}else{
				int count = this.loginService.regirestUser(user);
				this.exist = true;
				msg = count >0 ? "注册成功" : "注册失败";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/***
	* 方法描述： 跳转到主页面
	* @return
	* @author 安普尚
	* @date 2014年8月6日 上午11:05:06
	 */
	public String toIndexPage(){
		return SUCCESS;
	}
	
	
	public String toLoginPage(){
		return SUCCESS;
	}
	/**
	* 方法描述： 跳转到注册页面
	* @return
	* @author 安普尚
	* @date 2014年8月6日 下午2:07:57
	 */
	public String  registerPersonal(){
		return SUCCESS;
	}
	
	
	
	/***
	* 方法描述：测试分页功能
	* @return
	* @author 安普尚
	* @date 2014年8月7日 下午3:01:44
	 */
	public String getPersonInfo(){
		InfoUser infoUser = new InfoUser();
		infoUser.setUserName("apsliyuan");
		infoUserList = this.loginService.queryUserList(infoUser,pageNum,pageSize);
		totalCount = this.loginService.queryUserCount(infoUser);
		page = new Page(pageNum, pageSize, totalCount);
		return SUCCESS;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	public String getValidateCode() {
		return validateCode;
	}

	public void setValidateCode(String validateCode) {
		this.validateCode = validateCode;
	}

	public InfoUser getUser() {
		return user;
	}

	public void setUser(InfoUser user) {
		this.user = user;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getIsLogin() {
		return isLogin;
	}

	public void setIsLogin(String isLogin) {
		this.isLogin = isLogin;
	}

	public int getNeedValidateCode() {
		return needValidateCode;
	}

	public void setNeedValidateCode(int needValidateCode) {
		this.needValidateCode = needValidateCode;
	}

	public boolean isExist() {
		return exist;
	}

	public void setExist(boolean exist) {
		this.exist = exist;
	}

	public String getFieldValue() {
		return fieldValue;
	}

	public void setFieldValue(String fieldValue) {
		this.fieldValue = fieldValue;
	}

	public List<InfoUser> getInfoUserList() {
		return infoUserList;
	}

	public void setInfoUserList(List<InfoUser> infoUserList) {
		this.infoUserList = infoUserList;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public Page getPage() {
		return page;
	}
	public void setPage(Page page) {
		this.page = page;
	}
	
}
