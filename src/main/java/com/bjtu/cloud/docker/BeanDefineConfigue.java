package com.bjtu.cloud.docker;

import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.gate.TaskService;
import com.bjtu.cloud.repository.TaskInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by Kafukaaa on 16/11/9.
 */

public class BeanDefineConfigue implements ApplicationListener<ContextRefreshedEvent> {//ContextRefreshedEvent为初始化完毕事件，spring还有很多事件可以利用
  /**
   * 当一个ApplicationContext被初始化或刷新触发
   */

  @Autowired
  private TaskService taskService;

  @Autowired
  private TaskInfoMapper taskInfoMapper;

  SimpleDateFormat df1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

  @Override
  public void onApplicationEvent(ContextRefreshedEvent event) {
    new Thread() {
      public void run() {
        while (true) {
          try {
            Thread.sleep(10 * 1000);
            List<TaskInfo> taskInfos = taskService.getTaskByStatus(1);
            for (int i = 0; i < taskInfos.size(); i++) {
              String nodeId = taskInfos.get(i).getNodeId();
              Integer pid = taskInfos.get(i).getPid();
              Boolean flag = Cmds.checkTaskRunning(nodeId, pid.toString());
              if (flag == false){
                taskInfos.get(i).setStatus(0);
                taskInfos.get(i).setEndTime(df1.parse(df1.format(new Date())));
                taskInfoMapper.updateByPrimaryKeySelective(taskInfos.get(i));
              }
            }
          } catch (Exception e) {
            e.printStackTrace();
          }
        }
      }
    }.start();
  }

}
