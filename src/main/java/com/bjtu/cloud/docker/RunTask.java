package com.bjtu.cloud.docker;

import com.bjtu.cloud.common.entity.TaskRecord;
import com.bjtu.cloud.repository.TaskRecordMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimerTask;

/**
 * Created by Kafukaaa on 16/11/7.
 */
public class RunTask extends TimerTask {

  @Autowired
  private TaskRecordMapper taskRecordMapper;

  private String nodeId;
  private Integer type;
  private Integer mode;
  private String nodePath;
  private String fileName;
  private String operatorName;
  private Integer times;
  private Integer flag = 0;

  SimpleDateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
  @Override
  public void run() {
    if (flag < times) {
      String pid = Cmds.runTask(nodeId, type, nodePath, fileName);

      TaskRecord taskRecord = new TaskRecord();
      taskRecord.setTaskId(pid);
      taskRecord.setMode(mode);
      taskRecord.setStatus(1);
      taskRecord.setOperateName(operatorName);
      try {
        taskRecord.setOperateTime(df1.parse(df1.format(new Date())));
      }catch (Exception e){
        e.printStackTrace();
      }
      taskRecordMapper.insertSelective(taskRecord);

      flag++;
    }
  }

  public String getNodeId() {
    return nodeId;
  }

  public void setNodeId(String nodeId) {
    this.nodeId = nodeId;
  }

  public Integer getType() {
    return type;
  }

  public void setType(Integer type) {
    this.type = type;
  }

  public String getNodePath() {
    return nodePath;
  }

  public void setNodePath(String nodePath) {
    this.nodePath = nodePath;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  public Integer getTimes() {
    return times;
  }

  public void setTimes(Integer times) {
    this.times = times;
  }

  public Integer getMode() {
    return mode;
  }

  public void setMode(Integer mode) {
    this.mode = mode;
  }

  public String getOperatorName() {
    return operatorName;
  }

  public void setOperatorName(String operatorName) {
    this.operatorName = operatorName;
  }
}
