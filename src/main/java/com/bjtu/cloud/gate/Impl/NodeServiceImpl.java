package com.bjtu.cloud.gate.Impl;

import com.bjtu.cloud.common.entity.NodeInfo;
import com.bjtu.cloud.common.entity.NodeRecord;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.docker.Cmds;
import com.bjtu.cloud.gate.NodeService;
import com.bjtu.cloud.repository.NodeInfoMapper;
import com.bjtu.cloud.repository.NodeRecordMapper;
import com.bjtu.cloud.repository.UserInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
  private NodeRecordMapper nodeRecordMapper;

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
  public Integer closeNode(String nodeId) throws Exception {
    try {
      //调用docker关闭节点
      Boolean result = Cmds.stopNode(nodeId);
      if (result == true) {
        Integer flag = nodeInfoMapper.closeNode(nodeId);
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
  public Integer startNode(String nodeId) throws Exception {
    try {
      //调用docker开启节点
      Boolean result = Cmds.runNode(nodeId);
      if (result == true) {
        Integer flag = nodeInfoMapper.startNode(nodeId);
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
      imageTag = null;
    try {
      System.out.println(imageTag);
      //TODO docker上进行节点创建
      nodeId = Cmds.createNode("ubuntu:14.04").substring(0, 12);
      System.out.println(nodeId);
      NodeInfo nodeInfo = new NodeInfo();
      if(!nodeId.isEmpty()){
        nodeInfo.setNodeName(nodeId);
        nodeInfo.setNodeId(nodeId);
        nodeInfo.setStatus(0);
        nodeInfo.setType(type);
        nodeInfo.setTaskAmount(0);
        nodeInfo.setHistoryTaskAmount(0);
        Integer flag = nodeInfoMapper.addNodeInNodeInfo(nodeInfo);
        if(flag != 0){
          return nodeId;
        }else {
          //Todo 大奶说这个地方可能需要改
          return nodeId;
        }
      }else {
        return nodeId;
      }
    }catch (Exception e){
      e.printStackTrace();
      return "";
    }
  }

  @Override
  public List<NodeRecord> getAllNodeRecord() throws Exception {
    try {
      List<NodeRecord> nodeRecords = nodeRecordMapper.getAllNodeRecord();
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
      case 0:
        performance = Cmds.nodeCpuUsage(nodeId);
        nodeInfo.setCpu((int) (performance*10));
        break;
      case 1:
        performance = Cmds.nodeMemoryUsage(nodeId)[1];
        nodeInfo.setMemory((int)(performance*10));
        break;
      case 2:
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