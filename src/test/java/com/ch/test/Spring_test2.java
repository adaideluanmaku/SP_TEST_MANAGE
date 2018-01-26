package com.ch.test;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.ch.pahis.Sys_pa;

@RunWith(SpringJUnit4ClassRunner.class) //使用junit4进行测试  
@ContextConfiguration(locations={"classpath*:/Spring-mvc-servlet.xml"}) //加载配置文件   
public class Spring_test2{
	@Autowired
//	private MyService myService;
	Sys_pa sys_pa;
	
	@Test  
//	@Transactional   //标明此方法需使用事务  
//	@Rollback(false)  //标明使用完此方法后事务不回滚,true时为回滚  
	public void test1() {  
		System.out.println("bbbbbbb");
		String startdate1 = "2017-10-09 01:01:01";
		String starttime="2016-07-07 02:30:00";
		String endTime="2016-07-07 02:30:00";
		String executeTime="2016-07-07 02:30:00";
		int timesum=0;
		
		if(StringUtils.isNotBlank(starttime)){
			if(starttime.length()<19){
				starttime=starttime+" "+startdate1.substring(11, 19);
			}
			System.out.println(sys_pa.date4(startdate1, "yyyy-MM-dd HH:mm:ss", -7));
			startdate1=sys_pa.date4(startdate1.substring(0,10)+" "+starttime.substring(11,19), "yyyy-MM-dd HH:mm:ss", -7);
			timesum = sys_pa.differentDaysByMillisecond(startdate1,starttime,"yyyy-MM-dd");
		}
		
		if(StringUtils.isNotBlank(endTime)){
			if(endTime.length()<19){
				endTime=endTime+" "+startdate1.substring(11, 19);
			}
			System.out.println(sys_pa.date4(endTime, "yyyy-MM-dd HH:mm:ss", timesum));
		}
		
    }
	
	/**
     * 通过时间秒毫秒数判断两个时间的间隔
     * @param date1
     * @param date2
     * @return
     */
	public int differentDaysByMillisecond(Date date1, Date date2) {
		int days = (int) ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
		return days;
	}

	public int differentDaysByMillisecond1(String date1, String date2) {
		SimpleDateFormat sdf=null;
		Date time1=null;
		Date time2=null;
		
		sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			time1 = sdf.parse(date1);
			time2 = sdf.parse(date2);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		int days = (int) ((time1.getTime() - time2.getTime()) / (1000 * 3600 * 24));
		return days;
	}
}
