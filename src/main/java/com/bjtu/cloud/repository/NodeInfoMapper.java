package com.bjtu.cloud.repository;

import com.bjtu.cloud.common.entity.NodeInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface NodeInfoMapper {
    int deleteByPrimaryKey(Integer id);

    Integer deleteByNodeId(@Param("nodeId")String nodeId);

    int insert(NodeInfo record);

    int insertSelective(NodeInfo record);

    //获取所有节点信息
    List<NodeInfo> getAllNodeInfo();

    //获取某个节点信息
    NodeInfo getNodeByNodeId(String nodeId);

    //关闭某个节点信息
    Integer closeNode(String nodeId);

    //开启某个节点信息
    Integer startNode(String nodeId);

    //新增节点
    Integer addNodeInNodeInfo(NodeInfo nodeInfo);

    //查询用户节点是否有任务在执行
    NodeInfo queryTaskStatusByUser(String nodeId);


    NodeInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(NodeInfo record);

    int updateByPrimaryKey(NodeInfo record);
}