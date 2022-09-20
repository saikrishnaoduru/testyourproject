package com.stackroute.controller;

import com.stackroute.Exception.UserNotFound;
import com.stackroute.domain.User;
import com.stackroute.service.SecurityTokenGenerator;
import com.stackroute.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class UserController {
    @Autowired
     UserService userService;

    private ResponseEntity responseEntity;
    @Autowired
    private SecurityTokenGenerator securityTokenGenerator;

    //for login
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user) throws UserNotFound {
        Map<String, String> map = null;
        try {
            User user1 = userService.login(user.getUserEmail(), user.getUserPassword());

            if (user1.getUserEmail().equals(user.getUserEmail())) {
                map = securityTokenGenerator.generateToken(user);

            }
            responseEntity = new ResponseEntity(map, HttpStatus.OK);
        } catch (UserNotFound ex) {
            throw new UserNotFound();
        }
        catch (Exception e) {
            responseEntity = new ResponseEntity("error occurred", HttpStatus.INTERNAL_SERVER_ERROR);

        }
        return responseEntity;
    }


    //register api to check the login
    @PostMapping("/register")
    public User addUser(@RequestBody User user){


        // create user object

        userService.saveUser(user);

        return user;

    }

}
