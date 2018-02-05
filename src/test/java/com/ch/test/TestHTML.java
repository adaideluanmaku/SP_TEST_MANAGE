package com.ch.test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class TestHTML {
	public static void main(String args[]) throws IOException{
		File file= new File("C:\\a.txt");
		
		byte[] filecontent=null;
        try {  
            FileInputStream in = new FileInputStream(file);  
            filecontent = new byte[in.available()];  
            in.read(filecontent);  
            in.close();  
        } catch (FileNotFoundException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        
        System.out.println(new String(filecontent,"gbk"));
	}
}
