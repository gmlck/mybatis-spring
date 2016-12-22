package com.asgard.bms.business.util;

import java.security.*;

/**
 * 密码加密
 * @author next_dream
 * 调用说明：EncryptUtil。EncryptString（�?111”）�?
 */

public class EncryptUtil {
  public EncryptUtil() {
  }

  static public String EncryptString(String in) {
    try {
      MessageDigest md5 = MessageDigest.getInstance("MD5");
      md5.update(in.trim().getBytes()); //

      byte[] b = md5.digest();
      return byte2hex(b);
    }
    catch (Exception ex) {
      ex.printStackTrace();
    }
    return null;
  }

  /**
   * 
   */
  static public String byte2hex(byte[] b) {
    String hs = "";
    String stmp = "";
    for (int n = 0; n < b.length; n++) {
      stmp = (Integer.toHexString(b[n] & 0XFF));
      if (stmp.length() == 1) {
        hs = hs + "0" + stmp;
      }
      else {
        hs = hs + stmp;
      }
    }
    return hs;
  }
  
  public static void main(String args[]){
	  String pwd = "123456";
	  String encryptPwd = EncryptUtil.EncryptString(pwd);
	  System.out.println(encryptPwd);
	  encryptPwd = EncryptUtil.EncryptString(encryptPwd);
	  System.out.println(encryptPwd);
  }
}
