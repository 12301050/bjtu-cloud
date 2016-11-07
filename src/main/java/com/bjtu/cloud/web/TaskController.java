package com.bjtu.cloud.web;

import com.bjtu.cloud.common.entity.NodeRecord;
import com.bjtu.cloud.common.entity.TaskRecord;
import com.bjtu.cloud.common.webDao.RestResult;
import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.gate.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by wangwenbo on 16/10/31.
 */
@RestController
public class TaskController {
  @Autowired
  private TaskService taskService;

  //查询某个节点的某个任务的时间信息
  @RequestMapping(value = "api/task/queryTimeInfo", method = RequestMethod.GET)
  public RestResult<List<TaskInfo>> queryTimeInfo(String nodeId, Integer taskId) {
    try{
      TaskInfo taskInfo = taskService.queryTimeInfo(nodeId, taskId);
      return  RestResult.succ().data(taskInfo).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }
  //查询某个任务的三个性能数值
  @RequestMapping(value = "api/task/getPerformance", method = RequestMethod.GET)
  public RestResult<List<TaskInfo>> getPerformance(String nodeId, Integer taskId) {
    try {
      List<TaskInfo> taskInfos = taskService.getPerformance(nodeId, taskId);
      return RestResult.succ().data(taskInfos).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //根据用户名查询任务
  @RequestMapping(value = "api/task/getTaskByUserName", method = RequestMethod.GET)
  public RestResult<List<TaskInfo>> getTaskByUserName(String userName, Integer status) {
    try {
      List<TaskInfo> taskInfos = taskService.getTaskByUserName(userName, status);
      return RestResult.succ().data(taskInfos).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //删除任务
  @RequestMapping(value = "api/task/delete", method = RequestMethod.GET)
  public RestResult<List<TaskInfo>> delete(String nodeId, String taskPaths) {
    try {
      List<TaskInfo> taskInfos = taskService.deleteTask(nodeId, taskPaths);
      return RestResult.succ().data(taskInfos).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //创建任务
  @RequestMapping(value = "api/task/create", method = RequestMethod.GET)
  public RestResult<TaskInfo> create(String nodeId, String hostPath, Integer type,
                                     Integer mode, Integer times, String startTime) {
    try {
      TaskInfo taskInfo = taskService.createTask(nodeId, hostPath, type, mode, times, startTime);
      return RestResult.succ().data(taskInfo).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //按照日期查询所有任务日志
  @RequestMapping(value = "api/log/getAllTaskRecord", method = RequestMethod.GET)
  public RestResult<List<TaskRecord>> getAllRecords() {
    try {
      List<TaskRecord> taskRecords = taskService.getAllTaskRecord();
      return RestResult.succ().data(taskRecords).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

}
