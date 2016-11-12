package com.bjtu.cloud.repository;

import com.bjtu.cloud.common.entity.TaskInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface TaskInfoMapper {
    int deleteByPrimaryKey(Integer id);

    Integer deleteByNodeId(@Param("nodeId")String nodeId);

    //删除某个(些)任务
    Integer deleteTask(@Param("taskPath")String taskPath);
    //可删除任务列表
    List<TaskInfo> getDeleteByNode(@Param("nodeId")String nodeId);

    //获取所有正在运行任务列表
    List<TaskInfo> getTaskByStatus(Integer status);

    int insert(TaskInfo record);

    int insertSelective(TaskInfo record);

    //获取某个节点下某个状态的任务
    List<TaskInfo> getTaskByNode(@Param("nodeId")String nodeId, @Param("status")Integer status);

    //获取某个节点下所有的任务
    List<TaskInfo> getAllTaskByNode(String nodeId);

    //查询某个节点的某个任务的时间信息
    TaskInfo queryTimeInfo(@Param("taskId")Integer taskId);

    //查询某个任务的三个性能数值
    TaskInfo getPerformance(@Param("nodeId")String nodeId, @Param("taskId")Integer taskId);

    //根据用户名查询任务
    List<TaskInfo> getTaskByUserName(@Param("nodeId")String nodeId, @Param("status") Integer status);

    TaskInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TaskInfo record);

    int updateByPrimaryKey(TaskInfo record);
}