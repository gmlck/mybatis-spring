package com.asgard.bms.business.model;

public class InfoUser extends BaseDto {

    /***/
    private static final long serialVersionUID = -5129295215588677119L;
    //id]
    private String id;
    //用户名
    private String userName;
    //密码
    private String password;
    //新密码
    private String passwordNew;

    public InfoUser() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordNew() {
        return passwordNew;
    }

    public void setPasswordNew(String passwordNew) {
        this.passwordNew = passwordNew;
    }

    @Override
    public String toString() {
        return "InfoUser [id=" + id + ", userName=" + userName
                + ", password=" + password + ", passwordNew=" + passwordNew
                + "]";
    }

}
