package com.bjtu.cloud.web;

import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.common.webDao.RestResult;
import com.bjtu.cloud.common.entity.User;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.gate.NodeService;
import com.bjtu.cloud.gate.TaskService;
import com.bjtu.cloud.gate.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Kafukaaa on 16/10/23.
 */
@RestController
public class UserController {

  @Autowired
  private  UserService userService;
  @Autowired
  private NodeService nodeService;

  //用户登录
  @RequestMapping(value = "api/user/login", method = RequestMethod.GET)
  public ModelAndView login(HttpServletRequest request, HttpServletResponse response, HttpSession session,
                                  String userName, String password) {
    try {
      ModelAndView mv = new ModelAndView();
      User user = userService.login(userName, password);
      if (user == null){
        //跳转到错误页面
        mv.setViewName("redirect:/index3.jsp");
      }else if (user.getRole() == 0) {
        //跳转到管理员页面
        mv.setViewName("redirect:/index1.jsp");
      }else if (user.getRole() == 1){
        //跳转到普通用户页面
        mv.setViewName("redirect:/index2.jsp");
      }
      return mv;
    } catch (Exception e) {
      return null;
    }
  }

  //用户登录
  @RequestMapping(value = "api/user/logout", method = RequestMethod.GET)
  public ModelAndView getUserInfo(HttpServletRequest request, HttpServletResponse response, HttpSession session,
                                  String userName) {
    try {
      ModelAndView mv = new ModelAndView();
        mv.setViewName("redirect:/index.jsp");
      return mv;
    } catch (Exception e) {
      return null;
    }
  }

  //获取所有用户信息
  @RequestMapping(value = "api/user/getAllUserInfo", method = RequestMethod.GET)
  public RestResult<List<UserInfo>> modifyStatus() {
    try {
      List<UserInfo> userInfos = userService.getAll();
      return  RestResult.succ().data(userInfos).build();
    }catch (Exception e) {
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //查询用户节点下有无正在运行任务
  @RequestMapping(value = "api/user/queryTaskStatusByUser", method = RequestMethod.GET)
  public RestResult<Integer> queryTaskStatusByUser(String userName) {
    try {
      Integer status = userService.queryTaskStatusByUser(userName);
      return RestResult.succ().data(status).build();
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //删除用户
  @RequestMapping(value = "api/user/deleteUser", method = RequestMethod.GET)
  public RestResult<List<UserInfo>> deleteUser(String userName) {
    try{
      List<UserInfo> userInfos = userService.deleteUser(userName);
      return  RestResult.succ().data(userInfos).build();
    }catch (Exception e) {
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //删除节点
  @RequestMapping(value = "api/user/deleteNode", method = RequestMethod.GET)
  public RestResult<List<UserInfo>> deleteNode(String nodeIds) {
    try {
      List<UserInfo> userInfos = userService.deleteNode(nodeIds);
      return RestResult.succ().data(userInfos).build();
    }catch (Exception e) {
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }

  //用户新增节点
  @RequestMapping(value = "api/user/addNode", method = RequestMethod.POST)
  public RestResult<List<UserInfo>> addNode(String userName, Integer type) {
    try{
      String nodeId = nodeService.addNodeInNodeInfo(type);
      if(!nodeId.isEmpty()) {
        Integer flag = userService.addNodeInUserInfo(userName, nodeId);
        if (flag == 1) {
          List<UserInfo> userInfos = userService.getAll();
          return RestResult.succ().data(userInfos).build();
        } else {
          return RestResult.fail().build();
        }
      }else {
        return RestResult.fail().build();
      }
    }catch (Exception e){
      e.printStackTrace();
      return RestResult.fail().msg(e.toString()).build();
    }
  }
}
