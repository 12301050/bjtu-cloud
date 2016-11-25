package com.bjtu.cloud.docker;


public class DockerTest {

	public static void main(String[] args) {
		String []s=Cmds.createGUINode();
		System.out.println(s[0]);
		System.out.println(s[1]);
		/*
 		String nodeId =Cmds.createNode("java");
		System.out.println("nodeId:"+nodeId);
		//上传任务
		Boolean flag234 = Cmds.uploadTask(nodeId,"/Users/Kafukaaa/Downloads/Gg.java","1111","Gg.java");
		System.out.println("upload:" + flag234);
		//开始运行任务
		String pid = Cmds.runTask(nodeId,1,"1111","Gg.java");
		System.out.println("pid:" + pid);
		//检查运行状态
		System.out.println("check status:"+pid+Cmds.checkTaskRunning(nodeId,pid));

		//打印任务下载速度.节点下载速度（2s延迟）
		try {
			Thread.sleep(2000);
		}catch (Exception e){
			e.fillInStackTrace();
		}
		System.out.println("cpu:"+Cmds.nodeCpuUsage(nodeId));
		System.out.println("memory:"+Cmds.nodeMemoryUsage(nodeId)[1]);
		System.out.println("net:"+Cmds.nodeNetUsage(nodeId)[1]);
		//杀任务进程

//		Cmds.killTask(nodeId,pid);
//		System.out.println(pid+Cmds.checkTaskRunning(nodeId,pid));
//		//删除任务
//		 Cmds.deleteTask(nodeId,"111");
//		//停止节点
//		System.out.println("stop node");
//		System.out.println(Cmds.stopNode(nodeId));
//		//删除节点
//		System.out.println("delete node");
//		System.out.println(Cmds.deleteNode(nodeId));



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
*/
	}

}
