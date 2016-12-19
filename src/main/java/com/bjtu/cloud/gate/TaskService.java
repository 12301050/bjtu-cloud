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
  List<TaskInfo> queryTimeInfo(Integer taskId) throws Exception;

  //修改任务名
  Integer rename(Integer id, String taskName) throws Exception;

  //创建任务
  TaskInfo createTask(String nodeId, String hostPath, Integer type, String taskName,
                      Integer mode, Integer times, String startTime, String operatorName) throws Exception;

  //查询某个任务的三个性能数值
  TaskInfo getPerformance(String nodeId, Integer taskId, String pid) throws Exception;
  //根据用户名查询任务
  List<TaskInfo> getTaskByUserName(String userName, Integer status) throws Exception;

  //根据用户名查询所有任务
  List<TaskInfo> getAllTaskByUserName(String userName) throws Exception;

  //根据用户名查询除历史任务以外的所有任务
  List<TaskInfo> getAllTaskExceptHistoryByUserName(String userName) throws Exception;
  //查询所有任务日志
  List<TaskRecord> getTaskRecordByDate(String operateTime) throws Exception;
  //删除某个(些)任务
  List<TaskInfo> deleteTask(String nodeId, String pids, String targetPaths, String operatorName) throws Exception;
  //全部任务界面删除任务
  List<TaskInfo> deleteTaskByAll(String userName, String nodeIds, String pids, String targetPaths, String operatorName) throws Exception;
  //删除某个(些)任务
  List<TaskInfo> getTaskByStatus(Integer status) throws Exception;
}
