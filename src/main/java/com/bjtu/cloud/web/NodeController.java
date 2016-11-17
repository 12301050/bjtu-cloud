package com.bjtu.cloud.web;

import com.bjtu.cloud.common.entity.NodeRecord;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.common.webDao.NodeInfoResult;
import com.bjtu.cloud.common.webDao.RestResult;
import com.bjtu.cloud.common.entity.NodeInfo;
import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.gate.NodeService;
import com.bjtu.cloud.gate.TaskService;
import com.bjtu.cloud.gate.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

/**
 * Created by Kafukaaa on 16/10/23.
 */
@RestController
public class NodeController {

  @Autowired
  private NodeService nodeService;

  @Autowired
  private TaskService taskService;

  @Autowired
  private UserService userService;

  //获取所有用户信息
  @RequestMapping(value = "api/node/getAllNode", method = RequestMethod.GET)
  public RestResult<List<NodeInfoResult>> getAll() {
    try {
      List<NodeInfo> nodeInfos = nodeService.getAll();
      List<NodeInfoResult> nodeInfoResults = new ArrayList<NodeInfoResult>();
      List<UserInfo> userInfos = userService.getAll();

      for (int i = 0; i < nodeInfos.size(); i++) {
        NodeInfoResult nodeInfoResult = new NodeInfoResult();
        nodeInfoResult.setId(nodeInfos.get(i).getId());
        nodeInfoResult.setNodeName(nodeInfos.get(i).getNodeName());
        nodeInfoResult.setNodeId(nodeInfos.get(i).getNodeId());
        nodeInfoResult.setStatus(nodeInfos.get(i).getStatus());
        nodeInfoResult.setType(nodeInfos.get(i).getType());
        nodeInfoResult.setTaskAmount(nodeInfos.get(i).getTaskAmount());
        nodeInfoResult.setHistoryTaskAmount(nodeInfos.get(i).getHistoryTaskAmount());
        nodeInfoResult.setCpu(nodeInfos.get(i).getCpu());
        nodeInfoResult.setMemory(nodeInfos.get(i).getMemory());
        nodeInfoResult.setNetSpeed(nodeInfos.get(i).getNetSpeed());

        String nodeId = nodeInfos.get(i).getNodeId();

        for (int j = 0; j < userInfos.size(); j++) {
          String nodeIds = userInfos.get(j).getNodeIds();
          if (nodeIds.contains(nodeId)){
            nodeInfoResult.setUserName(userInfos.get(j).getUserName());
            nodeInfoResults.add(nodeInfoResult);
            break;
          }
        }
      }
      return RestResult.succ().data(nodeInfoResults).build();
    } catch (Exception e) {
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }
  //获取某个用户下所有节点
  @RequestMapping(value = "api/node/getNodeByUser", method = RequestMethod.POST)
  public RestResult<List<NodeInfo>> getAllNodeByUserName(@RequestBody String userName) {
    try{
      String usernameforquery=userName.split("=")[1];
      List<NodeInfo> nodeInfos = nodeService.getNodeByUser(usernameforquery);
      return  RestResult.succ().data(nodeInfos).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //通过节点列表删除节点
  @RequestMapping(value = "api/node/deleteNodeByNodeIds", method = RequestMethod.POST)
  public RestResult<Integer> deleteNodeByNodeIds(String nodeIds) {
    try{
      Integer flag = nodeService.deleteNodeByNodeIds(nodeIds);
      return  RestResult.succ().data(flag).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //获取某节点下的某个状态的任务
  @RequestMapping(value = "api/node/getTaskByNode", method = RequestMethod.POST)
  public RestResult<List<TaskInfo>> getTaskByNode(@RequestBody Map<String,String> map) {
    try{
      List<TaskInfo> taskInfos = taskService.getTaskByNode(map.get("nodeId"), Integer.valueOf(map.get("status")));
      return  RestResult.succ().data(taskInfos).build();

    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //关闭某个节点
  @RequestMapping(value = "api/node/closeNode", method = RequestMethod.POST)
  public RestResult<List<NodeInfo>> closeNode(String nodeId, HttpSession session) {
    try{
      String operatorName = session.getAttribute("userName").toString();
      Integer flag = nodeService.closeNode(nodeId, operatorName);
      if (flag == 1){
        List<NodeInfo> nodeInfos = nodeService.getAll();
        return RestResult.succ().data(nodeInfos).build();
      }else{
        return RestResult.fail().build();
      }
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //开启某个节点
  @RequestMapping(value = "api/node/startNode", method = RequestMethod.POST)
  public RestResult<List<NodeInfo>> startNode(String nodeId, HttpSession session) {
    try{
      String operatorName = session.getAttribute("userName").toString();
      Integer flag = nodeService.startNode(nodeId, operatorName);
      if (flag == 1){
        List<NodeInfo> nodeInfos = nodeService.getAll();
        return RestResult.succ().data(nodeInfos).build();
      }else{
        return RestResult.fail().build();
      }
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //修改节点名
  @RequestMapping(value = "api/node/rename", method = RequestMethod.POST)
  public RestResult<Integer> rename(String nodeId, String nodeName) {
    try {
      Integer result = nodeService.rename(nodeId, nodeName);
      return RestResult.succ().data(result).build();
    }catch (Exception e){
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //查询某个节点的三个性能的数值
  @RequestMapping(value = "api/node/getPerformance", method = RequestMethod.GET)
  public RestResult<List<Float>> getPerformance(String nodeId) {
    try{
      List<Float> performance = nodeService.getPerformance(nodeId);
      return RestResult.succ().data(performance).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //查询某个节点的其中一个性能的数值
  @RequestMapping(value = "api/node/getOnePerformance", method = RequestMethod.POST)
  public RestResult<Float> getOnePerformance(String nodeId, Integer number) {
    try{
      //Todo 先写个随机数
      //Random rand = new Random();
      //int randNum = rand.nextInt(22)+5;
      Float performance = nodeService.getOnePerformance(nodeId, number);
      return RestResult.succ().data(performance).build();
      //return RestResult.succ().data(randNum).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //按照日期查询所有节点日志
  @RequestMapping(value = "api/log/getNodeRecordByDate", method = RequestMethod.POST)
  public RestResult<List<NodeRecord>> getNodeRecordByDate(String operateTime) {
    try {
      List<NodeRecord> nodeRecords = nodeService.getNodeRecordByDate(operateTime);
      return RestResult.succ().data(nodeRecords).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }
}
