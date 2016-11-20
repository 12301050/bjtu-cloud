package com.bjtu.cloud.gate.Impl;

import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.docker.Cmds;
import com.bjtu.cloud.docker.RunTask;
import com.bjtu.cloud.gate.TaskService;
import com.bjtu.cloud.repository.NodeInfoMapper;
import com.bjtu.cloud.repository.TaskInfoMapper;
import com.bjtu.cloud.repository.UserInfoMapper;
import com.bjtu.cloud.common.entity.TaskRecord;
import com.bjtu.cloud.repository.TaskRecordMapper;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Kafukaaa on 16/10/26.
 */
@Service
public class TaskServiceImpl implements TaskService{

  @Autowired
  private TaskInfoMapper taskInfoMapper;
  @Autowired
  private UserInfoMapper userInfoMapper;
  @Autowired
  private NodeInfoMapper nodeInfoMapper;

  @Autowired
  private TaskRecordMapper taskRecordMapper;

  SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss");//设置日期格式
  SimpleDateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

  @Override
  public List<TaskInfo> getTaskByNode(String nodeId, Integer status) throws Exception {
    try {
      List<TaskInfo> taskInfos = taskInfoMapper.getTaskByNode(nodeId, status);
      return taskInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  public List<TaskInfo> getTaskByUserName(String userName, Integer status) throws Exception {
    List<TaskInfo> taskInfos = new ArrayList<TaskInfo>();
    try {
      UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
      System.out.println(userInfo.getNodeIds());
      String[] nodeIds = userInfo.getNodeIds().split(",");
      for (int i = 0; i < nodeIds.length; i++) {
        List<TaskInfo> taskInfo = taskInfoMapper.getTaskByUserName(nodeIds[i], status);
        taskInfos.addAll(taskInfo);
      }
      return taskInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<TaskInfo> getAllTaskExceptHistoryByUserName(String userName) throws Exception {
    List<TaskInfo> taskInfos = new ArrayList<TaskInfo>();
    try {
      UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
      System.out.println(userInfo.getNodeIds());
      String[] nodeIds = userInfo.getNodeIds().split(",");
      for (int i = 0; i < nodeIds.length; i++) {
        List<TaskInfo> taskInfo = taskInfoMapper.getDeleteByNode(nodeIds[i]);
        taskInfos.addAll(taskInfo);
      }
      return taskInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<TaskInfo> getAllTaskByUserName(String userName) throws Exception {
    List<TaskInfo> taskInfos = new ArrayList<TaskInfo>();
    try {
      UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
      System.out.println(userInfo.getNodeIds());
      String[] nodeIds = userInfo.getNodeIds().split(",");
      for (int i = 0; i < nodeIds.length; i++) {
        List<TaskInfo> taskInfo = taskInfoMapper.getAllTaskByNode(nodeIds[i]);
        taskInfos.addAll(taskInfo);
      }
      return taskInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<TaskRecord> getTaskRecordByDate(String operateTime) throws Exception {
    try {
      List<TaskRecord> taskRecords = taskRecordMapper.getTaskRecordByDate(operateTime);
      return taskRecords;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<TaskInfo> deleteTaskByAll(String userName, String nodeIds, String pids, String targetPaths) throws Exception{
    try {
      List<TaskInfo> taskInfos = this.getAllTaskExceptHistoryByUserName(userName);
      String[] taskPath = targetPaths.split(",");
      String[] taskpid = pids.split(",");
      String[] nodeId = nodeIds.split(",");
      for (int i = 0; i < taskPath.length; i++) {
        if(!taskpid[i].equals("-1")){
          boolean kill = Cmds.killTask(nodeId[i], taskpid[i]);
          if(kill = true){
            boolean delete = Cmds.deleteTask(nodeId[i], taskPath[i]);
            if(delete = true){
              Integer flag = taskInfoMapper.deleteTask(taskPath[i]);
              nodeInfoMapper.updateDeleteTaskAmount(nodeId[i]);
              if(flag == 1){
                taskInfos = this.getAllTaskExceptHistoryByUserName(userName);
                continue;
              }else{
                taskInfos = this.getAllTaskExceptHistoryByUserName(userName);
                return taskInfos;
              }
            }
          }
        }else if(taskpid[i].equals("-1")){
          Integer flag = taskInfoMapper.deleteTask(taskPath[i]);
          if(flag == 1){
            taskInfos = this.getAllTaskExceptHistoryByUserName(userName);;
            continue;
          }else{
            taskInfos = this.getAllTaskExceptHistoryByUserName(userName);;
            return taskInfos;
          }
        }else
          return taskInfos;
      }
      return taskInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<TaskInfo> deleteTask(String nodeId, String pids, String targetPaths) throws Exception{
    try {
      List<TaskInfo> taskInfos = taskInfoMapper.getAllTaskExceptHistoryByUserName(nodeId);
      String[] taskPath = targetPaths.split(",");
      String[] taskpid = pids.split(",");
      for (int i = 0; i < taskPath.length; i++) {
        if(!taskpid[i].equals("-1")){
          boolean kill = Cmds.killTask(nodeId, taskpid[i]);
          if(kill == true){
            boolean delete = Cmds.deleteTask(nodeId, taskPath[i]);
            if(delete == true){
              Integer flag = taskInfoMapper.deleteTask(taskPath[i]);
              nodeInfoMapper.updateDeleteTaskAmount(nodeId);
              if(flag == 1){
                taskInfos = taskInfoMapper.getAllTaskExceptHistoryByUserName(nodeId);
                continue;
              }else{
                taskInfos = taskInfoMapper.getAllTaskExceptHistoryByUserName(nodeId);
                return taskInfos;
              }
            }
          }
        }else if(taskpid[i].equals("-1")){
          Integer flag = taskInfoMapper.deleteTask(taskPath[i]);
          if(flag == 1){
            taskInfos = taskInfoMapper.getAllTaskExceptHistoryByUserName(nodeId);
            continue;
          }else{
            taskInfos = taskInfoMapper.getAllTaskExceptHistoryByUserName(nodeId);
            return taskInfos;
          }
        }else
          return taskInfos;
      }
      return taskInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<TaskInfo> getTaskByStatus(Integer status) throws Exception {
    try {
      List<TaskInfo> taskInfos = taskInfoMapper.getTaskByStatus(status);
      return taskInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<TaskInfo> queryTimeInfo(Integer taskId) throws Exception {
    try {
      List<TaskInfo> taskInfos = taskInfoMapper.queryTimeInfo(taskId);
      return taskInfos;
    }catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public Integer rename(Integer id, String taskName) throws Exception {
    try {
      TaskInfo taskInfo = taskInfoMapper.selectByPrimaryKey(id);
      taskInfo.setTaskName(taskName);
      Integer result = taskInfoMapper.updateByPrimaryKeySelective(taskInfo);
      return result;
    }catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public TaskInfo createTask(String nodeId, String hostPath,Integer type, String taskName,  Integer mode,
                             Integer times, String startTime, String operatorName) throws Exception {
    String[] fileNames = hostPath.split("/");
    String fileName = fileNames[fileNames.length-1];

    //根据模式创建任务
    if (mode == 0) {
      String nodePath = df.format(new Date());// new Date()为获取当前系统时间
      Cmds.runNode(nodeId);
      Boolean flag = Cmds.uploadTask(nodeId, hostPath, nodePath, fileName);
      if (flag == true) {
        String pid = Cmds.runTask(nodeId, type, nodePath, fileName);
        if (pid != null) {
          TaskInfo taskInfo = new TaskInfo();
          taskInfo.setNodeId(nodeId);
          taskInfo.setTaskName(taskName);
          taskInfo.setPid(Integer.parseInt(pid));
          taskInfo.setHostPath(hostPath);
          taskInfo.setNodePath(nodePath);
          taskInfo.setStatus(1);
          taskInfo.setType(type);
          taskInfo.setMode(mode);
          taskInfo.setExecTimes(times);
          taskInfo.setTimes(times);
          taskInfo.setStartTime(df1.parse(df1.format(new Date())));

          Integer result = taskInfoMapper.insertSelective(taskInfo);
          if (result == 1) {
            TaskRecord taskRecord = new TaskRecord();
            taskRecord.setTaskId(pid);
            taskRecord.setMode(mode);
            taskRecord.setStatus(1);
            taskRecord.setOperateName(operatorName);
            taskRecord.setOperateTime(df1.parse(df1.format(new Date())));
//            taskRecordMapper.insertSelective(taskRecord);

            return taskInfo;
          } else {
            return null;
          }
        }else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      String nodePath = df.format(new Date());// new Date()为获取当前系统时间
      Cmds.runNode(nodeId);
      Boolean flag = Cmds.uploadTask(nodeId, hostPath, nodePath, fileName);
      if (flag == true) {
        TaskInfo taskInfo = new TaskInfo();
        taskInfo.setNodeId(nodeId);
        taskInfo.setTaskName(taskName);
        taskInfo.setHostPath(hostPath);
        taskInfo.setNodePath(nodePath);
        taskInfo.setStatus(-1);
        taskInfo.setType(type);
        taskInfo.setMode(mode);
        taskInfo.setExecTimes(0);
        taskInfo.setTimes(times);
        taskInfo.setStartTime(df1.parse(df1.format(new Date())));

        taskInfoMapper.insertSelective(taskInfo);

        long period = 0;
        if (mode == 1) {
          //每天执行一次
          period = 1000 * 60 * 60;
        } else if (mode == 2) {
          //每周执行一次
          period = 1000 * 60 * 60 * 7;
        } else if (mode == 3) {
          //每三十天执行一次
          period = 1000 * 60 * 60 * 30;
        }

        //定时循环执行任务
        RunTask task = new RunTask();
        task.setTimes(times);
        task.setMode(mode);
        task.setOperatorName(operatorName);
        task.setTaskInfo(taskInfo);
        Timer timer = new Timer();
        timer.schedule(task, df1.parse(startTime), period);

        return taskInfo;
      } else {
        return null;
      }
    }
  }

    @Override
    public TaskInfo getPerformance(String nodeId, Integer taskId, String pid) throws Exception {
      try {
        boolean checkTask = Cmds.checkTaskRunning(nodeId, pid);
        if(checkTask == true){
          TaskInfo taskInfo = taskInfoMapper.getPerformance(nodeId, taskId);
          float cpu = Cmds.taskCpuUsage(nodeId, pid);
          float[] memory = Cmds.taskMemoryUsage(nodeId, pid);
          float[] net = Cmds.taskNetUsage(nodeId, pid);
          taskInfo.setCpu((int)cpu);
          taskInfo.setMemory((int)memory[1]);
          taskInfo.setNetSpeed((int)net[1]);
          return taskInfo;
        }else{
          return null;
        }
      }catch (Exception e) {
        e.printStackTrace();
        return null;
      }
    }
  }
