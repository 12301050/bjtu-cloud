package com.bjtu.cloud.web;

import com.bjtu.cloud.common.entity.TaskInfo;
import com.bjtu.cloud.common.webDao.RestResult;
import com.bjtu.cloud.common.entity.User;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.gate.NodeService;
import com.bjtu.cloud.gate.TaskService;
import com.bjtu.cloud.gate.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

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
        mv.setViewName("redirect:/login_bg.html?error=error");
      }else if (user.getRole() == 0) {
        //跳转到管理员页面，数据库中角色为0
        mv.setViewName("redirect:/user_mgt_admin.html");
      }else if (user.getRole() == 1){
        //跳转到普通用户页面，数据库中角色为1
        mv.setViewName("redirect:/node_mgt_user.html");
      }
      return mv;
    } catch (Exception e) {
      return null;
    }
  }

  //用户登出
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
  public RestResult<Integer> addNode(@RequestBody Map<String, String> map) {
    try{
      String userName = map.get("username");
      String nodeType = map.get("nodetype");
      Integer type;
      if(nodeType == "Java")
        type = 1;
      else if(nodeType == "Python")
        type = 2;
      else
        type = 0;
      String nodeId = nodeService.addNodeInNodeInfo(type);
      if(!nodeId.isEmpty()) {
        Integer flag = userService.addNodeInUserInfo(userName, nodeId);
        if (flag == 1) {
          UserInfo userInfo = userService.getUserByUserName(userName);
          return RestResult.succ().data(userInfo.getNodeAmount()).build();
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
