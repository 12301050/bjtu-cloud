package com.bjtu.cloud.docker;


public class DockerTest {
		 static String cmds[] = {"/bin/bash", "-c","echo \"1\" | sudo -S docker run -i -d docker/whalesay"};
	public static void main(String[] args) {
//		System.out.println("Docker output " + Cmds.createNode("docker/whalesay"));

		//上传任务
//		Boolean flag = Cmds.uploadTask("d0e36f37bd60","/home/xzp/test.java","111","test.java");
//		System.out.println(flag);
		//开始运行任务
//		String pid = Cmds.runTask("d0e36f37bd60",1,"111","test.java");
//		System.out.println(pid);
		//检查运行状态
//		System.out.println(pid+Cmds.checkTaskRunning("585aec47c343",pid));
		//打印任务下载速度.节点下载速度（2s延迟）
		System.out.println(Cmds.taskNetUsage("d0e36f37bd60","2373")[1]+" "+Cmds.nodeNetUsage("d0e36f37bd60")[1]);
		//杀任务进程
//		Cmds.killTask("d0e36f37bd60","2445");
//		System.out.println(pid+Cmds.checkTaskRunning("585aec47c343",pid));
		//删除任务
//		 Cmds.deleteTask("d0e36f37bd60","111");




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
