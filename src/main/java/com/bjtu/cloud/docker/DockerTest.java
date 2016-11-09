package com.bjtu.cloud.docker;


public class DockerTest {
		 static String cmds[] = {"/bin/bash", "-c","docker run -i -d docker/whalesay"};
	public static void main(String[] args) {
//		System.out.println("Docker output " + Cmds.createNode("docker/whalesay"));

		//上传任务
		Boolean flag234 = Cmds.uploadTask("a0d48e07c4fb","/Users/Kafukaaa/Downloads/test.java","234","test.java");
		System.out.println(flag234);
		//开始运行任务
		String pid = Cmds.runTask("a0d48e07c4fb",1,"234","test.java");
		System.out.println(pid);
		//检查运行状态
//		System.out.println(pid+Cmds.checkTaskRunning("a5fb2f94a076",pid));
		//打印任务下载速度.节点下载速度（2s延迟）
//		System.out.println(Cmds.taskNetUsage("a5fb2f94a076","73")[1]+" "+Cmds.nodeNetUsage("5cb8a761c44f")[1]);
		//杀任务进程
//		Cmds.killTask("a5fb2f94a076","2445");
//		System.out.println(pid+Cmds.checkTaskRunning("a5fb2f94a076",pid));
		//删除任务
//		 Cmds.deleteTask("a5fb2f94a076","111");




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
