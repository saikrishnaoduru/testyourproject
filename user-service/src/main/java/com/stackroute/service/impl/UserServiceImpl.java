package com.stackroute.service.impl;

import com.stackroute.config.Producer;
import com.stackroute.dto.UserDto;
import com.stackroute.enums.UserRole;
import com.stackroute.model.Address;
import com.stackroute.model.User;
import com.stackroute.Exception.UserNotfoundException;
import com.stackroute.model.UserVaccinationInfo;
import com.stackroute.repository.UserRepository;
import com.stackroute.repository.UserTempRepository;
import com.stackroute.service.UserService;

import com.stackroute.utils.VaccinationInfoComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl  implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    Producer producer;

    @Autowired
    UserTempRepository repository;

    @Override
    public User addUser(User user) {
        Address add = user.getAddress();
        if(null != add) {
            add.setAddrss(add.getHouseNo() + add.getStreet());
            user.setAddress(add);
        }
        User saveUser = userRepository.save(user);
        UserDto userDto = new UserDto();
        userDto.setUserRole(UserRole.USER);
        userDto.setUserEmailId(user.getUserEmailId());
        userDto.setUserName(user.getUserName());
        userDto.setPassword(user.getPassword());
        producer.sendMessageToRabbitMq(userDto);
        return saveUser;

    }

    @Override
    public List<User> getAllUser() {
        List<User> users = userRepository.findAll();
        return users;
    }

    @Override
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }


    @Override
    public User updateUser(User updateUser, String id) {
        Address add = updateUser.getAddress();
        if(null != add) {
            add.setAddrss(add.getHouseNo() + add.getStreet());
            updateUser.setAddress(add);
        }
        User user = userRepository.findById(id).get();
        user.setUserName(updateUser.getUserName());
        user.setUserEmailId(updateUser.getUserEmailId());
        user.setAddress(updateUser.getAddress());
        user.setGender(updateUser.getGender());
        user.setDateOfBirth(updateUser.getDateOfBirth());
        user.setAge(updateUser.getAge());
        user.setContactNumber(updateUser.getContactNumber());
        user.setUserVaccinationInfo(updateUser.getUserVaccinationInfo());
        User saveUser = userRepository.save(user);
        return saveUser;
    }



    @Override
    public User getUserByEmailId(String userEmailID) {
        Optional<User> user = Optional.of(userRepository.findByUserEmailId(userEmailID));

        return user.get();


    }


    //                    @Override
//         public User updateUser(User user, String emailId ,MultipartFile file) throws UserNotfoundException, IOException {
//            Optional<User> userExist=Optional.of(userRepository.findByUserEmailId(emailId));
//            if (!userExist.isPresent()){
//                throw new UserNotfoundException();
//            }
//            else {
//                user.setUserEmailId(emailId);
//                user.setCertificate(new Binary(file.getBytes()));
//                return userRepository.save(user);
//
//            }
//
//         }
    @Override
    public User updateEmailId(User user, String userEmailId, MultipartFile file) throws UserNotfoundException, IOException {
        Address add = user.getAddress();
        if(null != add) {
            add.setAddrss(add.getHouseNo() + add.getStreet());
            user.setAddress(add);
        }
        Optional<User> userExist = Optional.of(userRepository.findByUserEmailId(userEmailId));
        if (!userExist.isPresent()) {
            throw new UserNotfoundException();
        } else {
            user.setUserEmailId(userEmailId);
            user.setCertificate(file.getBytes());
            return userRepository.save(user);
        }
    }




    @Override
    public  User updateEmaild(UserVaccinationInfo userVaccinationInfo, String userEmailId)throws UserNotfoundException,IOException {

        Optional<User> userExist = Optional.of(userRepository.findByUserEmailId(userEmailId));
        if (userExist.isEmpty()) {
            throw new UserNotfoundException();
        } else{
            if(null==userExist.get().getUserVaccinationInfo()){
                userExist.get().setUserVaccinationInfo(new ArrayList<>());
            }
            userExist.get().getUserVaccinationInfo().add(userVaccinationInfo);
        }
        Collections.sort(userExist.get().getUserVaccinationInfo(),new VaccinationInfoComparator());
        return userRepository.save(userExist.get());

    }
    @Override
    public List<User> getAllUserByEmail(String email){
       return repository.getAllUserByEmail(email);
    }
}







