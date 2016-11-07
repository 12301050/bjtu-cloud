package com.bjtu.cloud.gate.Impl;

import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.docker.Cmds;
import com.bjtu.cloud.docker.RunTask;
import com.bjtu.cloud.gate.TaskService;
import com.bjtu.cloud.repository.TaskInfoMapper;
import com.bjtu.cloud.repository.UserInfoMapper;
import com.bjtu.cloud.common.entity.TaskRecord;
import com.bjtu.cloud.repository.TaskRecordMapper;
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
  public List<TaskRecord> getAllTaskRecord() throws Exception {
    try {
      List<TaskRecord> taskRecords = taskRecordMapper.getAllTaskRecord();
      return taskRecords;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<TaskInfo> deleteTask(String nodeId, String ids) throws Exception{
    try {
      List<TaskInfo> taskInfos = taskInfoMapper.getDeleteByNode(nodeId);
      String[] taskIds = ids.split(",");
      for (int i = 0; i < taskIds.length; i++) {
        Integer flag = taskInfoMapper.deleteTask(taskIds[i]);
        if(flag == 1){
          taskInfos = taskInfoMapper.getDeleteByNode(nodeId);
          continue;
        }else{
          taskInfos = taskInfoMapper.getDeleteByNode(nodeId);
          return taskInfos;
        }
      }
      return taskInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public TaskInfo queryTimeInfo(String nodeId, Integer taskId) throws Exception {
    try {
      TaskInfo taskInfo = taskInfoMapper.queryTimeInfo(nodeId, taskId);
      return taskInfo;
    }catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public TaskInfo createTask(String nodeId, String hostPath, Integer type, Integer mode, Integer times, String startTime) throws Exception {
    String[] fileNames = hostPath.split("/");
    String fileName = fileNames[fileNames.length];

    //根据模式创建任务
    if (mode == 0) {
      String nodePath = df.format(new Date());// new Date()为获取当前系统时间
      Boolean flag = Cmds.uploadTask(nodeId, hostPath, nodePath, fileName);
      if (flag == true) {
        String pid = Cmds.runTask(nodeId, type, nodePath, fileName);
        if (pid != null) {
          TaskInfo taskInfo = new TaskInfo();
          taskInfo.setNodeId(nodeId);
          taskInfo.setTaskName(pid);
          taskInfo.setPid(Integer.parseInt(pid));
          taskInfo.setHostPath(hostPath);
          taskInfo.setNodePath(nodePath);
          taskInfo.setStatus(0);
          taskInfo.setMode(mode);
          taskInfo.setTimes(times);
          taskInfo.setStartTime(df1.parse(df1.format(new Date())));

          Integer result = taskInfoMapper.insertSelective(taskInfo);
          if (result == 1) {
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
      Boolean flag = Cmds.uploadTask(nodeId, hostPath, nodePath, fileName);
      if (flag == true) {
        TaskInfo taskInfo = new TaskInfo();
        taskInfo.setNodeId(nodeId);
        taskInfo.setHostPath(hostPath);
        taskInfo.setNodePath(nodePath);
        taskInfo.setStatus(0);
        taskInfo.setMode(mode);
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
        Timer timer = new Timer();
        timer.schedule(task, df1.parse(startTime), period);

        return taskInfo;
      } else {
        return null;
      }
    }
  }

    @Override
    public List<TaskInfo> getPerformance(String nodeId, Integer taskId) throws Exception {
      try {
        List<TaskInfo> taskInfos = taskInfoMapper.getPerformance(nodeId, taskId);
        return taskInfos;
      }catch (Exception e) {
        e.printStackTrace();
        return null;
      }
    }
  }
