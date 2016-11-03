package com.bjtu.cloud.gate;

import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.common.entity.TaskRecord;
import org.springframework.scheduling.config.Task;

import java.util.List;

/**
 * Created by Kafukaaa on 16/10/26.
 */
public interface TaskService {
  //获取某个节点下某个状态的任务
  List<TaskInfo> getTaskByNode(String nodeId, Integer status) throws Exception;
  //查询某个节点的某个任务的时间信息
  TaskInfo queryTimeInfo(String nodeId, Integer taskId) throws Exception;
  //查询某个任务的三个性能数值
  List<TaskInfo> getPerformance(String nodeId, Integer taskId) throws Exception;
  //根据用户名查询任务
  List<TaskInfo> getTaskByUserName(String userName, Integer status) throws Exception;
  //查询所有任务日志
  List<TaskRecord> getAllTaskRecord() throws Exception;
  //删除某个(些)任务
  List<TaskInfo> deleteTask(String nodeId, String ids) throws Exception;
}
