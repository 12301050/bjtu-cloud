package com.bjtu.cloud.gate.Impl;

import com.bjtu.cloud.common.entity.User;
import com.bjtu.cloud.common.entity.UserInfo;
import com.bjtu.cloud.gate.UserService;
import com.bjtu.cloud.repository.UserInfoMapper;
import com.bjtu.cloud.repository.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Kafukaaa on 16/10/23.
 */
@Service
public class UserServiceImpl implements UserService{

  @Autowired
  private UserInfoMapper userInfoMapper;

  //获取所有用户信息
  @Override
  public List<UserInfo> getAll() throws Exception{
    try {
      List<UserInfo> userInfos = userInfoMapper.getAllUserInfo();
      return userInfos;
    }catch (Exception e){
      e.printStackTrace();
      return null;
    }
  }
}
