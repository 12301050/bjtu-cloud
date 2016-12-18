package com.bjtu.cloud.gate;

import com.bjtu.cloud.common.entity.NodeInfo;
import com.bjtu.cloud.common.entity.NodeRecord;

import java.util.List;

/**
 * Created by Kafukaaa on 16/10/26.
 */
public interface NodeService {
  //获取所有节点信息
  List<NodeInfo> getAll() throws Exception;

  //关闭某个节点
  Integer closeNode(String nodeId, String operatorName) throws Exception;

  //开启某个节点
  Integer startNode(String nodeId, String operatorName) throws Exception;

  //修改节点名
  Integer rename(String nodeId, String nodeName) throws Exception;

  //获取某个用户下所有节点
  List<NodeInfo> getNodeByUser(String userName) throws Exception;

  //通过节点列表删除节点
  Integer deleteNodeByNodeIds(String nodeIds, String operatorName) throws Exception;

  //查询某个节点的三个性能的数值
  List<Float> getPerformance(String nodeId) throws Exception;

  //查询某个节点的其中一个性能的数值
  Float getOnePerformance(String nodeId, Integer number) throws Exception;

  //新增节点
  String addNodeInNodeInfo(Integer type) throws Exception;

  //查询所有节点日志
  List<NodeRecord> getNodeRecordByDate(String operateTime) throws Exception;
}
