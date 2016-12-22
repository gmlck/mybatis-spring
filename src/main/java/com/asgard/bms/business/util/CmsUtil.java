/**
* All rights reserved.
*
* 版权所有：满意通达（北京）软件有限公司
* 未经本公司许可，不得以任何方式复制或使用本程序任何部分，
* 侵权者将受到法律追究。
*/

package com.asgard.bms.business.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.xml.datatype.XMLGregorianCalendar;

/**
 * <p>PURPOSE:		
 * <p>DESCRIPTION:
 * <p>DESCRIPTION:
 * <p>CALLED BY:	
 * <p>CREATE DATE: 2013-3-11
 * <p>UPDATE DATE: 
 * <p>UPDATE USER: 
 * <p>HISTORY:		1.0
 * @version 1.0
 * @author 邓夫伟
 * @since java 1.6.0
 * @see 
 */

public class CmsUtil {
	
	/**
	 * DESCRIPTION :判断字符串是否为空
	 * @AUTHOR 邓夫伟
	 * @CREATE DATE 2013-3-12
	 * @UPDATE USER 
	 * @UPDATE DATE 
	 * @param str
	 * @return
	 * boolean
	 */
	public static boolean isEmpty(String str){
		return null == str || str.trim().length() == 0;
	}
	
	/**
	 * DESCRIPTION :把XMLGregorianCalendar类型转换为年-月-日格式的字符串
	 * @AUTHOR 邓夫伟
	 * @CREATE DATE 2013-3-13
	 * @UPDATE USER 
	 * @UPDATE DATE 
	 * @param xgc
	 * @return
	 * String
	 */
	public static String convertXMLGregorianCalendarToDateStr(XMLGregorianCalendar xgc){
	   	 if(xgc == null){
	   		 return "";
	   	 }
	   	 DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	   	 return df.format(xgc.toGregorianCalendar().getTime());
	}
	
	/**
	 * DESCRIPTION :获取当前时间的字符串格式
	 * @AUTHOR 邓夫伟
	 * @CREATE DATE 2013-3-14
	 * @UPDATE USER 
	 * @UPDATE DATE 
	 * @return
	 * String
	 */
	public static String getCurrentTimeString(){
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return df.format(new Date());
	}
	
	/**
	 * 方法描述：获取一个月以前的字符串格式：yyyy-MM-dd HH:mm:ss
	 * @return
	 * @author 邓夫伟
	 * @date 2013-4-5 下午1:07:27
	 * @comment
	 */
	public static String getOneMonthAgo(){
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		Calendar cal = Calendar.getInstance();

//		cal.add(Calendar.DATE, -1);    //得到前一天
		cal.add(Calendar.MONTH, -1);    //得到前一个月

		long date = cal.getTimeInMillis();

		return df.format(new Date(date));
		
	}
	
	/**
	 * DESCRIPTION :检查要上传图片的格式是否合法
	 * @AUTHOR 邓夫伟
	 * @CREATE DATE 2013-3-15
	 * @UPDATE USER 
	 * @UPDATE DATE 
	 * @param fileName 文件名
	 * @return
	 * boolean 合法：true；不合法：false
	 */
	public static boolean checkFileType(String fileName){
		String[] fileTypes = {".jpg", ".png", ".bmp", ".jpeg",".gif"};
		for(String str : fileTypes){
			if(str.equalsIgnoreCase(fileName)){
				return true;
			}
		}
		return false;
	}
}
