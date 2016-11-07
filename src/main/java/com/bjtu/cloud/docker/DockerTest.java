package com.bjtu.cloud.docker;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;

public class DockerTest {
	//	 static String cmds[] = {"/bin/bash", "-c","docker run -i -d docker/whalesay"};
	public static void main(String[] args) {
//		System.out.println("Docker output " + Cmds.createNode("docker/whalesay"));
		Boolean flag = Cmds.uploadTask("585aec47c343","/home/xzp/test.java","111","test.java");
		System.out.println(flag);
		String pid = Cmds.runTask("585aec47c343",1,"111","test.java");
		System.out.println(pid);
		System.out.println(pid+Cmds.checkTaskRunning("585aec47c343",pid));
		Cmds.killTask("585aec47c343",pid);
		System.out.println(pid+Cmds.checkTaskRunning("585aec47c343",pid));
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
