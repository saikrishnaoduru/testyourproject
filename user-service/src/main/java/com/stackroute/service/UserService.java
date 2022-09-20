package com.stackroute.service;


import com.stackroute.model.User;
import com.stackroute.Exception.UserNotfoundException;
import com.stackroute.model.UserVaccinationInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

    User addUser(User user);

    List<User> getAllUser();

    void deleteUser(String userId);


    User updateUser(User user, String id);


    User getUserByEmailId(String userEmailID);


    User updateEmailId(User user, String userEmailId, MultipartFile file) throws UserNotfoundException, IOException;

    User updateEmaild(UserVaccinationInfo userVaccinationInfo,String userEmailId)throws UserNotfoundException,IOException;

    List<User> getAllUserByEmail(String email);
}



