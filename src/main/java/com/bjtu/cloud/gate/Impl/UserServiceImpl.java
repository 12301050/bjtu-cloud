package com.bjtu.cloud.gate.Impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;

import com.bjtu.cloud.common.entity.NodeRecord;
import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.common.entity.User;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.docker.Cmds;
import com.bjtu.cloud.gate.UserService;
import com.bjtu.cloud.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
  private NodeRecordMapper nodeRecordMapper;

  @Autowired
  private UserMapper userMapper;

  SimpleDateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
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

  //根据用户名获取用户信息
  @Override
  public UserInfo getUserByUserName(String userName) throws Exception{
    try{
      UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
      return userInfo;
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
  public Integer queryTaskStatusByUser(String userName) {
    try {
      UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
      System.out.println(userInfo.getNodeIds());
      String[] nodeIds = userInfo.getNodeIds().split(",");
      for (int i = 0; i < nodeIds.length; i++) {
        Integer flag = nodeInfoMapper.queryTaskStatusByUser(nodeIds[i]).getTaskAmount();
        if (flag != 0)
          return 1;
        else
          continue;
      }
      return 0;
    } catch (Exception e) {
      e.printStackTrace();
      return 1;
    }
  }
  @Override
  public UserInfo deleteNode(String nodeIds, String userName, String operatorName) throws Exception{
    try {
      UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
      String[] nodeId = nodeIds.split(",");
      for(int i = 0; i < nodeId.length; i++) {
        //Todo 跳过docker
        boolean delete, stop;
        stop = Cmds.stopNode(nodeId[i]);
        delete = Cmds.deleteNode(nodeId[i]);
        if (stop == true && delete == true) {
          taskInfoMapper.deleteByNodeId(nodeId[i]);
          nodeInfoMapper.deleteByNodeId(nodeId[i]);
          NodeRecord nodeRecord = new NodeRecord();
          nodeRecord.setNodeId(nodeId[i]);
          nodeRecord.setStatus(1);
          nodeRecord.setOperateName(operatorName);
          nodeRecord.setOperateTime(df1.parse(df1.format(new Date())));
          nodeRecordMapper.insertSelective(nodeRecord);
          continue;
        }
      else {
          return null;
        }
      }
      if(userInfo.getNodeIds() == null || userInfo.getNodeIds().isEmpty()){
        return userInfo;
      }else{
        String[] nodeIdByUser = userInfo.getNodeIds().split(",");
        String[] newNodeId = arrContrast(nodeIdByUser,nodeId);
        if(newNodeId.length == 0){
          userInfo.setUserName(userInfo.getUserName());
          userInfo.setNodeAmount(newNodeId.length);
          userInfo.setNodeIds("");
          userInfoMapper.updateDeleteNodeIds(userInfo);
        }else{
          String newNodeIds = converToString(newNodeId);
          userInfo.setUserName(userInfo.getUserName());
          userInfo.setNodeAmount(newNodeId.length);
          userInfo.setNodeIds(newNodeIds);
          userInfoMapper.updateDeleteNodeIds(userInfo);
        }
        return userInfo;
      }
    }catch (Exception e){
      e.printStackTrace();
      return null;
    }
  }
  //处理数组字符
  private static String[] arrContrast(String[] arr1, String[] arr2){
    List<String> list = new LinkedList<String>();
    for (String str : arr1) {
      if (!list.contains(str)) {
        list.add(str);
      }
    }
    for (String str : arr2) {
      if(list.contains(str)){
        list.remove(str);
      }
    }
    String[] result = {};
    return list.toArray(result);
  }
  //组合
  public static String converToString(String[] id) {
    String str = "";
    if (id != null && id.length > 0) {
      for (int i = 0; i < id.length; i++) {
        str += id[i] + ",";
      }
    }
    str = str.substring(0, str.length() - 1);
    return str;
  }
  @Override
  public Integer addNodeInUserInfo(String userName, String nodeId, String operatorName) throws Exception {
    try {
      UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
      Integer flag;
      if(userInfo.getNodeIds() == null || userInfo.getNodeIds().isEmpty()){
        flag = userInfoMapper.addNodeInit(userName, nodeId);
      }else{
        flag = userInfoMapper.addNode(userName, ","+nodeId);
      }
      NodeRecord nodeRecord = new NodeRecord();
      nodeRecord.setNodeId(nodeId);
      nodeRecord.setStatus(1);
      nodeRecord.setOperateName(operatorName);
      nodeRecord.setOperateTime(df1.parse(df1.format(new Date())));
      nodeRecordMapper.insertSelective(nodeRecord);
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
      for(int i = 0; i < nodeIds.length; i++) {
        boolean delete, stop;
        stop = Cmds.stopNode(nodeIds[i]);
        delete = Cmds.deleteNode(nodeIds[i]);
        if (stop == true && delete == true) {
          taskInfoMapper.deleteByNodeId(nodeIds[i]);
          nodeInfoMapper.deleteByNodeId(nodeIds[i]);
          continue;
        }
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
