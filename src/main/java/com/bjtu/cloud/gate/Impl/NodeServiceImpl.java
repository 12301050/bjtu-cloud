package com.bjtu.cloud.gate.Impl;

import com.bjtu.cloud.common.entity.NodeInfo;
import com.bjtu.cloud.common.entity.NodeRecord;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.docker.Cmds;
import com.bjtu.cloud.gate.NodeService;
import com.bjtu.cloud.repository.NodeInfoMapper;
import com.bjtu.cloud.repository.NodeRecordMapper;
import com.bjtu.cloud.repository.TaskInfoMapper;
import com.bjtu.cloud.repository.UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by Kafukaaa on 16/10/26.
 */
@Service
public class NodeServiceImpl implements NodeService {

  @Autowired
  private NodeInfoMapper nodeInfoMapper;

  @Autowired
  private UserInfoMapper userInfoMapper;

  @Autowired
  private TaskInfoMapper taskInfoMapper;

  @Autowired
  private NodeRecordMapper nodeRecordMapper;

  SimpleDateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

  @Override
  public List<NodeInfo> getAll() throws Exception {
    try {
      List<NodeInfo> nodeInfos = nodeInfoMapper.getAllNodeInfo();
      return nodeInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public Integer closeNode(String nodeId, String operatorName) throws Exception {
    try {
      //调用docker关闭节点
      Boolean result = Cmds.stopNode(nodeId);
      if (result == true) {
        Integer flag = nodeInfoMapper.closeNode(nodeId);

        //设置节点正在运行任务数为0
        NodeInfo nodeInfo = nodeInfoMapper.getNodeByNodeId(nodeId);
        if (nodeInfo.getTaskAmount() > 0) {
          nodeInfo.setTaskAmount(0);
          nodeInfo.setHistoryTaskAmount(nodeInfo.getHistoryTaskAmount()+nodeInfo.getTaskAmount());
        }
        nodeInfoMapper.updateByPrimaryKeySelective(nodeInfo);

        NodeRecord nodeRecord = new NodeRecord();
        nodeRecord.setNodeId(nodeId);
        nodeRecord.setStatus(0);
        nodeRecord.setOperateName(operatorName);
        nodeRecord.setOperateTime(df1.parse(df1.format(new Date())));
        nodeRecordMapper.insertSelective(nodeRecord);
        return flag;
      }else {
        return 0;
      }
    }catch (Exception e){
      e.printStackTrace();
      return 0;
    }
  }

  @Override
  public Integer startNode(String nodeId, String operatorName) throws Exception {
    try {
      //调用docker开启节点
      Boolean result = Cmds.runNode(nodeId);
      if (result == true) {
        Integer flag = nodeInfoMapper.startNode(nodeId);

        NodeRecord nodeRecord = new NodeRecord();
        nodeRecord.setNodeId(nodeId);
        nodeRecord.setStatus(1);
        nodeRecord.setOperateName(operatorName);
        nodeRecord.setOperateTime(df1.parse(df1.format(new Date())));
        nodeRecordMapper.insertSelective(nodeRecord);
        return flag;
      }else {
        return 0;
      }
    }catch (Exception e){
      e.printStackTrace();
      return 0;
    }
  }

  @Override
  public Integer rename(String nodeId, String nodeName) throws Exception {
    try {
      NodeInfo nodeInfo = nodeInfoMapper.getNodeByNodeId(nodeId);

      //防止出现节点名重复
      List<NodeInfo> nodeInfos = nodeInfoMapper.getAllNodeInfo();
      for (int i = 0; i < nodeInfos.size(); i++) {
        if (nodeInfos.get(i).getNodeName().equals(nodeName) &&
            nodeInfos.get(i).getNodeId() != nodeInfo.getNodeId()){
          return 0;
        }
      }

      nodeInfo.setNodeName(nodeName);
      Integer result = nodeInfoMapper.updateByPrimaryKeySelective(nodeInfo);
      return result;
    }catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public String addNodeInNodeInfo(Integer type) throws Exception {
    String imageTag;
    String nodeId;
    if(type == 0)
      imageTag = "binary";
    else if(type == 1)
      imageTag = "java";
    else if(type == 2)
      imageTag = "python";
    else
      imageTag = "";
    try {
      //TODO docker上进行节点创建
      if(!imageTag.isEmpty()){
        String returnId = Cmds.createNode(imageTag);
        if(!returnId.isEmpty()){
          nodeId = returnId.substring(0, 12);
          NodeInfo nodeInfo = new NodeInfo();
          nodeInfo.setNodeName(nodeId);
          nodeInfo.setNodeId(nodeId);
          nodeInfo.setStatus(1);
          nodeInfo.setType(type);
          nodeInfo.setTaskAmount(0);
          nodeInfo.setHistoryTaskAmount(0);
          Integer flag = nodeInfoMapper.addNodeInNodeInfo(nodeInfo);
          if (flag != 0) {
            return nodeId;
          } else {
            return "";
          }
        }else {
          return "";
        }
      }else {
        return "";
      }
    }catch (Exception e){
      e.printStackTrace();
      return "";
    }
  }

  @Override
  public Integer deleteNodeByNodeIds(String nodeIds, String operatorName) throws Exception {
    try {
      String[] nodeId = nodeIds.split(",");
      for(int i = 0; i < nodeId.length; i++) {
        String userName = "";
        boolean delete, stop;
        stop = Cmds.stopNode(nodeId[i]);
        delete = Cmds.deleteNode(nodeId[i]);
        if (stop == true && delete == true) {
          List<UserInfo> userInfos = userInfoMapper.getAllUserInfo();
          for (int j = 0; j < userInfos.size(); j++) {
            String findNodeIds = userInfos.get(j).getNodeIds();
            if (findNodeIds.contains(nodeId[i])){
              userName = userInfos.get(j).getUserName();
              break;
            }
          }
          UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
          taskInfoMapper.deleteByNodeId(nodeId[i]);
          nodeInfoMapper.deleteByNodeId(nodeId[i]);
          if(userInfo.getNodeIds() == null || userInfo.getNodeIds().isEmpty()){
          }else{
            String[] nodeIdByUser = userInfo.getNodeIds().split(",");
            String[] newNodeId = arrContrast(nodeIdByUser,nodeId[i]);
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
          }
          NodeRecord nodeRecord = new NodeRecord();
          nodeRecord.setNodeId(nodeId[i]);
          nodeRecord.setStatus(1);
          nodeRecord.setOperateName(operatorName);
          nodeRecord.setOperateTime(df1.parse(df1.format(new Date())));
          nodeRecordMapper.insertSelective(nodeRecord);
          continue;
        }
        else {
          return 0;
        }
      }
      return 1;
    }catch (Exception e){
      e.printStackTrace();
      return null;
    }
  }
  //处理数组字符
  private static String[] arrContrast(String[] arr1, String arr2){
    List<String> list = new LinkedList<String>();
    for (String str : arr1) {
      if (!list.contains(str)) {
        list.add(str);
      }
    }
    if(list.contains(arr2)){
      list.remove(arr2);
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
  public List<NodeRecord> getNodeRecordByDate(String operateTime) throws Exception {
    try {
      List<NodeRecord> nodeRecords = nodeRecordMapper.getNodeRecordByDate(operateTime);
      return nodeRecords;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<NodeInfo> getNodeByUser(String userName) throws Exception {
    List<NodeInfo> nodeInfos = new ArrayList<NodeInfo>();
    try {
      UserInfo userInfo = userInfoMapper.getUserInfoByUserName(userName);
      String[] nodeIds = userInfo.getNodeIds().split(",");
      for (int i = 0; i < nodeIds.length; i++) {
        NodeInfo nodeInfo = nodeInfoMapper.getNodeByNodeId(nodeIds[i]);
        nodeInfos.add(nodeInfo);
      }
      return nodeInfos;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public List<Float> getPerformance(String nodeId) throws Exception {
    List<Float> performance = new ArrayList<Float>();
    Float cpu = Cmds.nodeCpuUsage(nodeId);
    performance.add(cpu);

    /*Float memoryTotal = Cmds.nodeMemoryUsage(nodeId)[0];
    performance.add(memoryTotal);*/

    Float memoryUse = Cmds.nodeMemoryUsage(nodeId)[1];
    performance.add(memoryUse);

    Float net = Cmds.nodeNetUsage(nodeId)[1];
    performance.add(net);
    try {
      NodeInfo nodeInfo = nodeInfoMapper.getNodeByNodeId(nodeId);
      nodeInfo.setCpu((int) (cpu*10));
      nodeInfo.setMemory((int)(memoryUse*10));
      nodeInfo.setNetSpeed((int)(net*10));
      nodeInfoMapper.updateByPrimaryKeySelective(nodeInfo);
    } catch (Exception e){
      e.printStackTrace();
    }
    return performance;
  }

  @Override
  public Float getOnePerformance(String nodeId, Integer number) throws Exception {
    Float performance = null;
    NodeInfo nodeInfo = nodeInfoMapper.getNodeByNodeId(nodeId);
    switch (number){
      case 1:
        performance = Cmds.nodeCpuUsage(nodeId);
        nodeInfo.setCpu((int) (performance*10));
        break;
      case 2:
        performance = Cmds.nodeMemoryUsage(nodeId)[1];
        nodeInfo.setMemory((int)(performance*10));
        break;
      case 3:
        performance = Cmds.nodeNetUsage(nodeId)[1];
        nodeInfo.setNetSpeed((int)(performance*10));
        break;
    }

    try {
      nodeInfoMapper.updateByPrimaryKeySelective(nodeInfo);
    } catch (Exception e){
      e.printStackTrace();
    }

    return performance;
  }
}