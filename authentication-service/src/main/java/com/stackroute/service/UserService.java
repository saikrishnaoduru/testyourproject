package com.stackroute.service;

import com.stackroute.Exception.UserNotFound;
import com.stackroute.domain.User;
import com.stackroute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;


    public User login(String userEmail, String password) throws UserNotFound {
        User user=repo.findByUsernameAndPassword(userEmail,password);
        if (user== null){
            throw new UserNotFound();

        }
        return user;
    }

    public User saveUser(User user){
        return repo.save(user);
    }


}


