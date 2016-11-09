package com.bjtu.cloud.docker;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

/**
 * Created by xzp on 16-11-9.
 */
public class LoadTaskStatus implements ApplicationListener<ContextRefreshedEvent> {


    @Override
    public void onApplicationEvent(ContextRefreshedEvent evt) {
        if (evt.getApplicationContext().getParent() == null) {

        }
    }


}
