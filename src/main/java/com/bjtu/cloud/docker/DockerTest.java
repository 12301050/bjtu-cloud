package com.bjtu.cloud.docker;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;

public class DockerTest {
	//	 static String cmds[] = {"/bin/bash", "-c","docker run -i -d docker/whalesay"};
	public static void main(String[] args) {
//		System.out.println("Docker output " + Cmds.createNode("docker/whalesay"));
		Boolean flag = Cmds.uploadTask("bc827ab801d4","/Users/Kafukaaa/IdeaProjects/Attention1/src/A1000.java","home","A1000.java");
		System.out.println(flag);
//		 try {
//			 ProcessBuilder pb=new ProcessBuilder(cmds);
//			 Process process = pb.start();
//			 process.waitFor();
//	      InputStreamReader ir = new InputStreamReader(process.getInputStream());
//	      LineNumberReader input = new LineNumberReader(ir);
//	      String line;
//
//			while((line = input.readLine()) != null)
//			  {
//					System.out.println("HH");
//					System.out.println(line);
//					System.out.println("GG");
//				}
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}

}
