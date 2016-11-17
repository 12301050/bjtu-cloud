package com.bjtu.cloud.docker;

import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.util.ArrayList;

public class Cmds {
	private final static boolean DEBUG = false;
	//if use linux please verify the sudopassword
	private final static String sudoPwd = "1";
	private static String basecmd;
	private static String cmds[] = new String[3];
	static{
		if(System.getProperty("os.name").contains("Mac OS")){
			cmds[0]="/bin/bash";
			cmds[1]="-c";
			basecmd="docker ";
		}
		else if(System.getProperty("os.name").contains("Windows")){
			cmds[0]="cmd.exe";
			cmds[1]="/c";
			basecmd="docker ";
		}
		else if(System.getProperty("os.name").contains("Linux")){
			cmds[0]="/bin/bash";
			cmds[1]="-c";
			basecmd = "echo \"" + sudoPwd + "\" | sudo -S " + "docker ";
		}else {
			System.err.println("Cmds: The System is not supported");
		}
	}
	public final static int BINTASK = 0;
	public final static int JAVATASK = 1;
	public final static int PYTHONTASK = 2;
	public static String createNode(String imageTag) {
		cmds[2] = basecmd + "run -t -i -d " + imageTag;
		ArrayList<String> outPuts = executeCmds(cmds);
		// 创建失败
		if (outPuts.size() == 0)
			return "";
		return outPuts.get(0);
	}

	public static boolean runNode(String nodeId) {
		cmds[2] = basecmd + "start  " + nodeId;
		ArrayList<String> outPuts = executeCmds(cmds);
		if (outPuts.size() == 0)
			return false;
		if (outPuts.get(0).equals(nodeId))
			return true;
		return false;
	}

	public static boolean deleteNode(String nodeId) {
		cmds[2] = basecmd + "rm  " + nodeId;
		ArrayList<String> outPuts = executeCmds(cmds);
		if (outPuts.size() == 0)
			return false;
		if (outPuts.get(0).equals(nodeId))
			return true;
		return false;
	}

	public static boolean stopNode(String nodeId) {
		cmds[2] = basecmd + "kill " + nodeId;
		ArrayList<String> outPuts = executeCmds(cmds);
		if (outPuts.size() == 0)
			return false;
		if (outPuts.get(0).equals(nodeId))
			return true;
		return false;
	}

	public static boolean uploadTask(String nodeId, String hostPath, String targetPath, String targetFileName) {
		cmds[2] = basecmd + " exec " + nodeId + " mkdir /"+targetPath;
		executeCmds(cmds);
		cmds[2] = basecmd + "cp " + hostPath + " " + nodeId + ":" + targetPath+"/"+targetFileName;
		ArrayList<String> outPuts = executeCmds(cmds);
		if (outPuts.size() != 0)
			return false;
		return true;
	}

	public static String runTask(String nodeId, int taskType,String targetPath, String targetFileName) {
		String pid = null;
		ArrayList<String> outPuts ;
		switch (taskType) {
		case BINTASK:
			cmds[2] = basecmd + "exec " + nodeId + " start-stop-daemon -b -d /"+targetPath+" --start --quiet --pidfile ../xx.pid -m --exec  " + targetFileName+"\"";
			outPuts = executeCmds(cmds);
			if(outPuts.size()!=0&&outPuts.get(0).contains("no such file or directory"))
				return null;
			cmds[2] = basecmd + "exec " + nodeId + " cat xx.pid";
			outPuts = executeCmds(cmds);
			if(outPuts.size()==0||outPuts.get(0).contains("cat:"))
				return null;
			pid = outPuts.get(0);
			break;
		case JAVATASK:
			cmds[2] = basecmd + "exec " + nodeId + " /bin/sh -c \"cd "+targetPath+" && /jdk/bin/javac " + targetFileName+"\"";
			outPuts = executeCmds(cmds);
			if(outPuts.size()!=0)
				return null;
			cmds[2] = basecmd + "exec " + nodeId
					+ " start-stop-daemon -b -d /"+targetPath+" --start --quiet --pidfile ../xx.pid -m --exec  /jdk/bin/java "
					+ targetFileName.substring(0, targetFileName.length()-5)+"";
			outPuts = executeCmds(cmds);
			if(outPuts.size()!=0&&outPuts.get(0).contains(targetFileName.substring(0, targetFileName.length()-5)))
				return null;
			cmds[2] = basecmd + "exec " + nodeId + " cat xx.pid";
			outPuts = executeCmds(cmds);
			if(outPuts.size()==0||outPuts.get(0).contains("cat:"))
				return null;
			pid = outPuts.get(0);
			break;
		case PYTHONTASK:
			//TODO:python path
			cmds[2] = basecmd + "exec " + nodeId + " start-stop-daemon -b -d /"+targetPath+" --start --quiet --pidfile ../xx.pid -m --exec  /usr/bin/python " + targetFileName;
			outPuts = executeCmds(cmds);
			if(outPuts.size()!=0&&outPuts.get(0).contains("no such file or directory"))
				return null;
			cmds[2] = basecmd + "exec " + nodeId + " cat xx.pid";
			outPuts = executeCmds(cmds);
			if(outPuts.size()==0||outPuts.get(0).contains("cat:"))
				return null;
			pid = outPuts.get(0);
			break;
		}
		return pid;
	}

	public static boolean killTask(String nodeId, String pid) {
		cmds[2] = basecmd + "exec " + nodeId + " kill -s 9  " + pid;
		ArrayList<String> outPuts = executeCmds(cmds);
		if(outPuts.size()!=0&&(outPuts.get(0).contains("kill:")||outPuts.get(0).contains(pid)))
			return false;
		return true;
	}

	public static boolean deleteTask(String nodeId, String targetPath) {
		cmds[2] = basecmd + "exec " + nodeId + " rm -rf " + targetPath;
		ArrayList<String> outPuts = executeCmds(cmds);
		if(outPuts.size()!=0&&outPuts.contains("No such file or directory"))
			return false;
		return true;
	}

	public static boolean checkTaskRunning(String nodeId, String pid) {
		cmds[2] = basecmd + "exec " + nodeId + " /bin/bash -c \" kill -0   " + pid +"\" 2>&1";
		ArrayList<String> outPuts = executeCmds(cmds);
			if(outPuts.size()!=0&&outPuts.get(0).contains("kill:")&&outPuts.get(0).contains(pid))
				return false;
		return true;
	}

	public static float nodeCpuUsage(String nodeId) {
		cmds[2] = basecmd + "exec " + nodeId + " top -d 0.03 -n 2 -b ";
		ArrayList<String> outPuts = executeCmds(cmds);
		if(outPuts.size()>4){
			int i=0;
			for(String line : outPuts){
				if(line.contains("%Cpu(s):")){
					return Float.valueOf(line.substring(8,line.lastIndexOf(" us,")));
				}
			}
		}
		return -1;
	}

	public static float[] nodeMemoryUsage(String nodeId) {
		float [] memory = new float[2];
		cmds[2] = basecmd + "exec " + nodeId + " top -d 0.03 -n 1 -b ";
		ArrayList<String> outPuts = executeCmds(cmds);
		if(outPuts.size()>4){
			for(String line : outPuts){
				if(line.contains("KiB Mem:")){
					memory[0]=Float.valueOf(line.substring(8,line.lastIndexOf(" total,")).trim());
					memory[1]=Float.valueOf(line.substring(line.lastIndexOf("total,")+6,line.lastIndexOf(" used,")).trim());
				}
			}
		}
		return memory;
	}

	//index 0 up index 1 down
	public static float[] nodeNetUsage(String nodeId) {
		float [] net = new float[2];
		cmds[2] = basecmd + "exec " + nodeId + " /nethogs/src/nethogs";
		ArrayList<String> outPuts = executeCmds(cmds);
		if(outPuts.size()!=0){
			for(String line : outPuts){
				if(line.contains("TOTAL:")){
					net[0]=Float.valueOf(line.substring(line.lastIndexOf("TOTAL:")+6,line.lastIndexOf(",")).trim());
					net[1]=Float.valueOf(line.substring(line.lastIndexOf(",")+1,line.length()).trim());
				}
			}
		}
		return net;
	}

	public static float taskCpuUsage(String nodeId, String pid) {
		cmds[2] = basecmd + "exec " + nodeId + " top -d 0.03 -n 2 -b ";
		ArrayList<String> outPuts = executeCmds(cmds);
		if(outPuts.size()>4){
			int i=0;
			for(String line : outPuts){
				if(i==1&&line.contains(pid))
					return Float.valueOf(line.substring(46,52).trim());
				if(line.contains("  PID USER")){
					i++;
				}
			}
		}
		return -1;
	}

	public static float[] taskMemoryUsage(String nodeId, String pid) {
		float [] memory = new float[2];
		cmds[2] = basecmd + "exec " + nodeId + " top -d 0.03 -n 2 -b ";
		ArrayList<String> outPuts = executeCmds(cmds);
		if(outPuts.size()>4){
			int i=0;
			for(String line : outPuts){
				if(line.contains("KiB Mem:")){
					memory[0]=Float.valueOf(line.substring(8,line.lastIndexOf(" total,")).trim());
				}
				if(i==1&&line.length()>6&&line.substring(0,6).contains(pid))
					memory[1]=Float.valueOf(line.substring(51,57).trim())*0.01f*memory[0];
				if(line.contains("  PID USER")){
					i++;
				}
			}
		}
		return memory;
	}
	//index 0 up index 1 down
	public static float[] taskNetUsage(String nodeId, String pid) {
		float [] net = new float[2];
		cmds[2] = basecmd + "exec " + nodeId + " /nethogs/src/nethogs";
		ArrayList<String> outPuts = executeCmds(cmds);
		if(outPuts.size()!=0){
			for(String line : outPuts){
				if(line.contains(pid+":")){
					net[0]=Float.valueOf(line.substring(line.lastIndexOf(pid+":")+pid.length()+1,line.lastIndexOf(",")).trim());
					net[1]=Float.valueOf(line.substring(line.lastIndexOf(",")+1,line.length()).trim());
				}
			}
		}
		return net;
	}

	public static ArrayList<String> executeCmds(String[] cmds) {
		ArrayList<String> outPuts = new ArrayList<String>();
		try {
			ProcessBuilder pb = new ProcessBuilder(cmds);
			Process process = pb.start();
			process.waitFor();
			InputStreamReader ir = new InputStreamReader(process.getInputStream());
			LineNumberReader input = new LineNumberReader(ir);
			String line;
			while ((line = input.readLine()) != null) {
				outPuts.add(line);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (DEBUG) {
			for (String s : outPuts) {
				System.out.println(s);
			}
		}
		return outPuts;
	}
}
