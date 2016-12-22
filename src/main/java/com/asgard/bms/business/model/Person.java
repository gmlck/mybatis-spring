package com.asgard.bms.business.model;

public class Person {
    private String phone;
    private String id;
    private String userName;
    private String address;
    private String email;
    private String bieth;


    public Person() {
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBieth() {
        return bieth;
    }

    public void setBieth(String bieth) {
        this.bieth = bieth;
    }

    @Override
    public String toString() {
        return "Person [id=" + id + ", userName=" + userName + ", phone="
                + phone + ", address=" + address + ", email=" + email
                + ", bieth=" + bieth + "]";
    }


}
