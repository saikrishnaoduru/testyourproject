package com.stackroute.config;

import com.stackroute.Exception.UserAlreadyExists;
import com.stackroute.domain.User;
import com.stackroute.domain.UserDTO;
import com.stackroute.service.UserService;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    @Autowired
    private UserService userService;

    @RabbitListener(queues="user_queue")
    public void getUserDtoFromRabbitMq(UserDTO userDto) throws UserAlreadyExists
    {
        System.out.println(userDto.toString());
        User user=new User();
        user.setUserEmail(userDto.getUserEmailId());
        user.setUserPassword(userDto.getPassword());
        user.setUserRole(userDto.getUserRole());
        userService.saveUser(user);
    }
}
