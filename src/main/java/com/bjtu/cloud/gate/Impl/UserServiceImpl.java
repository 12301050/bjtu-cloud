package com.bjtu.cloud.gate.Impl;

import com.bjtu.cloud.common.entity.NodeInfo;
import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.common.entity.User;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.gate.UserService;
import com.bjtu.cloud.repository.NodeInfoMapper;
import com.bjtu.cloud.repository.TaskInfoMapper;
import com.bjtu.cloud.repository.UserInfoMapper;
import com.bjtu.cloud.repository.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Kafukaaa on 16/10/23.
 */
@Service
public class UserServiceImpl implements UserService{

  @Autowired
  private UserInfoMapper userInfoMapper;

  @Autowired
  private NodeInfoMapper nodeInfoMapper;

  @Autowired
  private TaskInfoMapper taskInfoMapper;

  @Autowired
  private UserMapper userMapper;

  //获取所有用户信息
  @Override
  public List<UserInfo> getAll() throws Exception{
    try {
      List<UserInfo> userInfos = userInfoMapper.getAllUserInfo();
      return userInfos;
    }catch (Exception e){
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public User login(String userName, String password) throws Exception {
    try {
      User user = userMapper.login(userName,password);
      return user;
    }catch (Exception e){
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public Integer addNodeInUserInfo(String userName, String nodeId) throws Exception {
    try {
      Integer flag = userInfoMapper.addNode(userName, nodeId);
      return flag;
    }catch (Exception e){
      e.printStackTrace();
      return 0;
    }
  }

  @Override
  public List<UserInfo> deleteUser(String userName) throws Exception {
    try {
      UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
      System.out.println(userInfo.getNodeIds());
      String[] nodeIds = userInfo.getNodeIds().split(",");
      for (int i = 0; i < nodeIds.length; i++) {
        Integer flagTask = taskInfoMapper.deleteByNodeId(nodeIds[i]);
        if(flagTask == 1)
          continue;
        else {
          return null;
        }
      }
      for (int i = 0; i < nodeIds.length; i++) {
        Integer flagNode = nodeInfoMapper.deleteByNodeId(nodeIds[i]);
        if(flagNode == 1)
          continue;
        else {
          return null;
        }
      }
      Integer flag = userInfoMapper.deleteUser(userName);
      if(flag == 1)
        return userInfoMapper.getAllUserInfo();
      else {
        return null;
      }
    }catch (Exception e){
      e.printStackTrace();
      return null;
    }
  }
}
