package com.asgard.bms.business.util;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Properties;

import org.apache.commons.lang.ArrayUtils;

/**
 * 类描述：交易平台公共工具类
 * <p> Copyright 2013 by mytd Software corporation,
 * <p>All rights reserved.
 * <p>版权所有：满意通达（北京）软件责任有限公司
 * <p>未经本公司许可，不得以任何方式复制或使用本程序任何部分，<p>
 * 侵权者将受到法律追究。
 * @author 刘奎
 * @date 2013-12-5 下午06:19:59
 * @comment
 * @version 1.0
 */
public class TradeUtil {
	
	public static String getCurrentDateTime(String pattern){
		DateFormat df = new SimpleDateFormat(pattern);
		String nowDateTime = df.format(new Date());
		return nowDateTime;
	}

}
