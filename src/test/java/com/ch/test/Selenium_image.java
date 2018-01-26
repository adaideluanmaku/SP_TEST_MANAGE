package com.ch.test;

import java.awt.image.BufferedImage;
import java.awt.image.DataBuffer;
import java.io.File;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.junit.Test;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.testng.Assert;

public class Selenium_image {
	@Test
	public void testImage() {
		WebDriver driver = new FirefoxDriver();
		
		// 全局设置延迟，如果操作无响应，则等待最多10S
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

		// 浏览器输入地址
		driver.get("http://localhost:8095/SP_TEST_MANAGE_BT/login/logout");

		// 浏览器最大化
		driver.manage().window().maximize();
		
		//
		File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
		try {
			Thread.sleep(3000);
			FileUtils.copyFile(screenshot, new File("E:\\QQ_actual.jpg"));//获取的页面图片
			File fileInput = new File("E:\\QQ_expected.jpg");//断言，预期图片
			File fileOutput = new File("E:\\QQ_actual.jpg");//获取的页面图片

			BufferedImage bufileInput = ImageIO.read(fileInput);
			DataBuffer dafileInput = bufileInput.getData().getDataBuffer();
			int sizefileInput = dafileInput.getSize();
			BufferedImage bufileOutput = ImageIO.read(fileOutput);
			DataBuffer dafileOutput = bufileOutput.getData().getDataBuffer();
			int sizefileOutput = dafileOutput.getSize();

			boolean matchFlag = true;
			if (sizefileInput == sizefileOutput) {
				for (int j = 0; j < sizefileInput; j++) {
					if (dafileInput.getElem(j) != dafileOutput.getElem(j)) {
						matchFlag = false;
						break;
					}
				}
			} else {
				matchFlag = false;
				Assert.assertTrue(matchFlag, "测试过程中的截图和企鹅王截图并不一致");
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
