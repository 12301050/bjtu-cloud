package com.bjtu.cloud.web;

import com.bjtu.cloud.common.entity.NodeRecord;
import com.bjtu.cloud.common.entity.TaskRecord;
import com.bjtu.cloud.common.webDao.RestResult;
import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.gate.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
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
  public RestResult<List<TaskInfo>> queryTimeInfo(Integer taskId) {
    try{
      List<TaskInfo> taskInfo = taskService.queryTimeInfo(taskId);
      return  RestResult.succ().data(taskInfo).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }
  //查询某个任务的三个性能数值
  @RequestMapping(value = "api/task/getPerformance", method = RequestMethod.GET)
  public RestResult<TaskInfo> getPerformance(String nodeId, Integer taskId, String pid) {
    try {
      TaskInfo taskInfo = taskService.getPerformance(nodeId, taskId, pid);
      return RestResult.succ().data(taskInfo).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //根据用户名查询任务
  @RequestMapping(value = "api/task/getTaskByUserName", method = RequestMethod.POST)
  public RestResult<List<TaskInfo>> getTaskByUserName(String userName, Integer status) {
    try {
      List<TaskInfo> taskInfos = taskService.getTaskByUserName(userName, status);
      return RestResult.succ().data(taskInfos).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //根据用户名查询所有任务
  @RequestMapping(value = "api/task/getAllTaskByUserName", method = RequestMethod.POST)
  public RestResult<List<TaskInfo>> getAllTaskByUserName(String userName) {
    try {
      List<TaskInfo> taskInfos = taskService.getAllTaskByUserName(userName);
      return RestResult.succ().data(taskInfos).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //删除任务
  @RequestMapping(value = "api/task/delete", method = RequestMethod.GET)
  public RestResult<List<TaskInfo>> delete(String nodeId, String pids, String taskPaths) {
    try {
      List<TaskInfo> taskInfos = taskService.deleteTask(nodeId, pids, taskPaths);
      return RestResult.succ().data(taskInfos).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //修改任务名
  @RequestMapping(value = "api/task/rename", method = RequestMethod.POST)
  public RestResult<Integer> rename(Integer id, String taskName) {
    try {
      Integer result = taskService.rename(id, taskName);
      return RestResult.succ().data(result).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //创建任务
  @RequestMapping(value = "api/task/create", method = RequestMethod.POST)
  public RestResult<TaskInfo> create(String nodeId, Integer type, String taskName,
                                     Integer mode, Integer times, String startTime, HttpSession session, HttpServletRequest request) throws IllegalStateException, IOException{
    try {
      String operatorName = session.getAttribute("userName").toString();
      String path = "/Users/Kafukaaa/Downloads/file/" + operatorName + "/" + nodeId;
      String hostPath = null;
      File f = null;
      //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
      CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(
          request.getSession().getServletContext());
      //检查form中是否有enctype="multipart/form-data"
      if(multipartResolver.isMultipart(request))
      {
        //将request变成多部分request
        MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
        //获取multiRequest 中所有的文件名
        Iterator it= multiRequest.getFileNames();
        while(it.hasNext())
        {
          //一次遍历所有文件
          MultipartFile file = multiRequest.getFile(it.next().toString());
          if(file!=null)
          {
            f = new File(path,file.getOriginalFilename());
            hostPath = path + "/" + file.getOriginalFilename();
            if(!f.exists()) {
              // 若文件不存在，先创建文件所在的目录
              f.getParentFile().mkdirs();
            }
            //上传
            file.transferTo(f);
          }

        }

      }

      TaskInfo taskInfo = taskService.createTask(nodeId, hostPath, type, taskName, mode, times, startTime, operatorName);
      return RestResult.succ().data(taskInfo).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //按照日期查询所有任务日志
  @RequestMapping(value = "api/log/getTaskRecordByDate", method = RequestMethod.POST)
  public RestResult<List<TaskRecord>> getTaskRecordByDate(String operateTime) {
    try {
      List<TaskRecord> taskRecords = taskService.getTaskRecordByDate(operateTime);
      return RestResult.succ().data(taskRecords).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  /*
     *采用spring提供的上传文件的方法
     */
  @RequestMapping( value = "SpringMVC006/springUpload")
  public String  springUpload(HttpServletRequest request) throws IllegalStateException, IOException
  {
    //设置服务器放文件的目录
    String path="/Users/Kafukaaa/Downloads/file";
    File f = null;
    long  startTime=System.currentTimeMillis();
    //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
    CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(
        request.getSession().getServletContext());
    //检查form中是否有enctype="multipart/form-data"
    if(multipartResolver.isMultipart(request))
    {
      //将request变成多部分request
      MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
      //获取multiRequest 中所有的文件名
      Iterator iter=multiRequest.getFileNames();
      while(iter.hasNext())
      {
        //一次遍历所有文件
        MultipartFile file=multiRequest.getFile(iter.next().toString());
        if(file!=null)
        {
          f = new File(path,file.getOriginalFilename());
          if(!f.exists()) {
            // 若文件不存在，先创建文件所在的目录
            System.out.println("Make dir!");
            f.getParentFile().mkdirs();
          }
          //上传
          file.transferTo(f);
        }

      }

    }
    long  endTime=System.currentTimeMillis();
    System.out.println(f.getName());
    System.out.println("方法三的运行时间："+String.valueOf(endTime-startTime)+"ms");
    return "/success";
  }

}
