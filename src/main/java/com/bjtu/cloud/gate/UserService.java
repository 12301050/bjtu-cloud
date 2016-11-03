package com.bjtu.cloud.gate;

import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.common.entity.User;
import com.bjtu.cloud.common.entity.UserInfo;

import java.util.List;

/**
 * Created by Kafukaaa on 16/10/23.
 */
public interface UserService {

  //获取所有用户信息
  List<UserInfo> getAll() throws Exception;

  //用户登录
  User login(String userName, String password) throws Exception;

  //增加节点
  Integer addNodeInUserInfo(String userName, String nodeId) throws Exception;

  //删除用户
  List<UserInfo> deleteUser(String userName) throws Exception;

  //删除节点
  List<UserInfo> deleteNode(String nodeIds) throws Exception;

  //查询用户节点下有无正在运行任务
  List<TaskInfo> queryTaskStatusByUser(String userName, Integer status) throws Exception;
}
