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

  //根据用户名获取用户信息
  UserInfo getUserByUserName(String userName) throws Exception;

  //用户登录
  User login(String userName, String password) throws Exception;

  //增加节点
  Integer addNodeInUserInfo(String userName, String nodeId) throws Exception;

  //删除用户
  List<UserInfo> deleteUser(String userName) throws Exception;

  //删除节点
  UserInfo deleteNode(String nodeIds, String userName) throws Exception;

  //查询用户节点下有无正在运行任务
  Integer queryTaskStatusByUser(String userName) throws Exception;
}
