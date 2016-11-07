package com.bjtu.cloud.docker;

import java.util.TimerTask;

/**
 * Created by Kafukaaa on 16/11/7.
 */
public class RunTask extends TimerTask {
  private String nodeId;
  private Integer type;
  private String nodePath;
  private String fileName;
  private Integer times;
  private Integer flag = 0;
  @Override
  public void run() {
    if (flag < times) {
      Cmds.runTask(nodeId, type, nodePath, fileName);
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
}
