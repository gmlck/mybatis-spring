package com.asgard.excl;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;


/*
 * ExcelUtil工具类实现功能:
 * 导出时传入list<T>,即可实现导出为一个excel,其中每个对象Ｔ为Excel中的一条记录.
 * 导入时读取excel,得到的结果是一个list<T>.T是自己定义的对象.
 * 需要导出的实体对象只需简单配置注解就能实现灵活导出,通过注解您可以方便实现下面功能:
 * 1.实体属性配置了注解就能导出到excel中,每个属性都对应一列.
 * 2.列名称可以通过注解配置.
 * 3.导出到哪一列可以通过注解配置.
 * 4.鼠标移动到该列时提示信息可以通过注解配置.
 * 5.用注解设置只能下拉选择不能随意填写功能.
 * 6.用注解设置是否只导出标题而不导出内容,这在导出内容作为模板以供用户填写时比较实用.
 */
public class ExcelUtil<T> {
	//double类型
	public static final int DATATYPE_DOUBLE = 1;
	//float类型
	public static final int DATATYPE_FLOAT = 2;
	//BigDecimal类型
	public static final int DATATYPE_BD = 3;
	//XMLGregorianCalendar
	public static final int DATATYPE_XGC = 4;
	//INT
	public static final int DATATYPE_INT = 5;
	//STRING
	public static final int DATATYPE_STRING = 6;
	
	Class<T> clazz;

	public ExcelUtil(Class<T> clazz) {
		this.clazz = clazz;
	}
	//Excel
	private HSSFWorkbook workbook;
	//工作表
	private HSSFSheet[] sheet;
	//样式
	private HSSFCellStyle style;
	//字体
	private HSSFFont font;
	//excel文件流
	private InputStream excelStream;
	//所有有注解的属性
	private List<Field> fields;
	
	/**
	 * @创建人：邓夫伟
	 * @创建时间：2013-1-8
	 * @方法描述：导出Excel表格
	 * @修改记录：
	 * @param list 要导出的数据集合
	 * @param sheetName 工作表名称
	 * @param sheetSize 每个工作表要导出的记录条数，最多65536
	 * @return 流
	 * @throws IOException 
	 */
	public InputStream exportExcel(List<T> list, String sheetName, int sheetSize) throws IOException {
		//取得实体里的所有属性
		Field[] allFields = clazz.getDeclaredFields();
		// 得到所有有注解的field并存放到一个list中.
		fields = new ArrayList<Field>();
		for (Field field : allFields) {
			if (field.isAnnotationPresent(ExcelVOAttribute.class)) {
				fields.add(field);
			}
		}
		// excel2003中每个sheet中最多有65536行,为避免产生错误所以加这个逻辑.
		if (sheetSize > 65536 || sheetSize < 1) {
			sheetSize = 65536;
		}
		// 取出一共有多少个sheet.
		double sheetNo= Math.ceil(Double.valueOf(list.size()) / Double.valueOf(sheetSize));
		//设置样式
		this.handleStyles(sheetNo);
		for (int index = 0; index < (int)sheetNo; index++) {
			sheetName = sheetNo > 1 ? sheetName + index : sheetName;
			workbook.setSheetName(index, sheetName + index);// 设置工作表的名称.
			HSSFRow row = sheet[index].createRow(0);// 产生一行
			HSSFCell cell;// 产生单元格
			// 写入各个字段的列头名称
			for (int i = 0; i < fields.size(); i++) {
				ExcelVOAttribute attr = fields.get(i).getAnnotation(ExcelVOAttribute.class);
				int col = getExcelCol(attr.column());// 获得列号
				cell = row.createCell(col);// 创建列
				cell.setCellStyle(style);
				cell.setAsActiveCell();//设置单元格为激活单元格
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);// 设置列中写入内容为String类型
				cell.setCellValue(new HSSFRichTextString("\t" + attr.name() + "\t"));//写入列名
			}
			int startNo = index * sheetSize;
			int endNo = Math.min(startNo + sheetSize, list.size());
			// 写入各条记录,每条记录对应excel表中的一行
			for (int i = startNo; i < endNo; i++) {
				row = sheet[index].createRow(i + 1 - startNo);
				T vo = (T) list.get(i); // 得到导出对象.
				for (int j = 0; j < fields.size(); j++) {
					Field field = fields.get(j);// 获得field.
					field.setAccessible(true);// 设置实体类私有属性可访问
					ExcelVOAttribute attr = field.getAnnotation(ExcelVOAttribute.class);
					try {
						// 根据ExcelVOAttribute中设置情况决定是否导出,有些情况需要保持为空,希望用户填写这一列.
						if (attr.isExport()) {
							cell = row.createCell(getExcelCol(attr.column()));// 创建cell
							//如果是字符串
							if(DATATYPE_STRING == attr.dataType()){
								cell.setCellType(HSSFCell.CELL_TYPE_STRING);
								cell.setCellValue(field.get(vo) == null ? "" : String.valueOf(field.get(vo)));// 如果数据存在就填入,不存在填入空格.
							} else if(DATATYPE_DOUBLE == attr.dataType() || DATATYPE_BD == attr.dataType() || DATATYPE_FLOAT == attr.dataType()){
								if(field.get(vo) != null){
									cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
									cell.setCellValue(field.get(vo) == null ? null : Double.valueOf(String.valueOf(field.get(vo))));
								}
							} else if(DATATYPE_INT == attr.dataType()){
								if(field.get(vo) != null){
									cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
									cell.setCellValue(field.get(vo) == null ? null : (Integer)(field.get(vo)));
								}
							}
						}
					} catch (IllegalArgumentException e) {
						e.printStackTrace();
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					}
				}
			}
		}
		return workbook2InputStream(workbook);
	}
	
	/**
	 * @创建人：邓夫伟
	 * @创建时间：2013-1-8
	 * @方法描述：设置导出Excel的样式
	 * @修改记录：曾宏 2013-2-20
	 */
	public void handleStyles(double sheetNo){
//		System.out.println("sheetNo:"+(int)sheetNo);
		workbook = new HSSFWorkbook();
		
		sheet=new HSSFSheet[(int)sheetNo];
		for(int i=0;i<(int)sheetNo;i++){
			sheet[i] = workbook.createSheet();
			//设置行高行宽
			sheet[i].setDefaultRowHeightInPoints(18);
			sheet[i].setDefaultColumnWidth(25);
			
		}
		//创建样式
		style = workbook.createCellStyle();
		style.setFillBackgroundColor(HSSFColor.GREEN.index);//设置填充背景为天蓝色
		//style.setFillPattern(CellStyle.BORDER_HAIR);//设置填充模式为前景色
		style.setAlignment(CellStyle.ALIGN_CENTER);//设置字体剧中
		style.setBorderBottom(CellStyle.BORDER_THIN);//设置边框样式
		style.setBorderLeft(CellStyle.BORDER_THIN);
		style.setBorderRight(CellStyle.BORDER_THIN);
		style.setBorderTop(CellStyle.BORDER_THIN);
		//设置字体
		font = workbook.createFont();
		font.setColor(HSSFColor.ROYAL_BLUE.index);//设置字体色
		font.setBoldweight(Font.BOLDWEIGHT_BOLD);//设置字体为加粗
		font.setFontHeightInPoints((short)15);//设置字体大小为14号
		style.setFont(font);
	}
	
	/**
	 * @创建人：邓夫伟
	 * @创建时间：2013-1-8
	 * @方法描述：把Excel转换成流
	 * @修改记录：
	 * @param workbook
	 * @param fileName
	 * @return 流
	 * @throws IOException
	 */
	private InputStream workbook2InputStream(HSSFWorkbook workbook) throws IOException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		workbook.write(baos);
		baos.flush();
		byte[] aa = baos.toByteArray();
		excelStream = new ByteArrayInputStream(aa, 0, aa.length);
		baos.close();
		return excelStream;
	}

	/**
	 * @创建人：邓夫伟
	 * @创建时间：2013-1-8
	 * @方法描述：将EXCEL中A,B,C,D,E列映射成0,1,2,3
	 * @修改记录：
	 * @param col 列
	 * @return
	 */
	public int getExcelCol(String col) {
		col = col.toUpperCase();
		// 从-1开始计算,字母重1开始运算。这种总数下来算数正好相同。
		int count = -1;
		char[] cs = col.toCharArray();
		for (int i = 0; i < cs.length; i++) {
			count += (cs[i] - 64) * Math.pow(26, cs.length - 1 - i);
		}
		return count;
	}
}
