package com.stackroute.controller;


import com.stackroute.dto.UserVaccinationInfoDto;
import com.stackroute.model.User;
import com.stackroute.Exception.UserNotfoundException;
import com.stackroute.model.UserVaccinationInfo;
import com.stackroute.service.UserService;
import io.swagger.annotations.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService usersService;
    private ApiResponse deleteid;

    /****
     * This Api is for Adding the USER
     * @param
     * @return
     */
    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User addedUser = this.usersService.addUser(user);
        return new ResponseEntity<>(addedUser, HttpStatus.CREATED);
    }


    /**
     * This Api is for Getting all the USER
     *
     * @return
     */
    @GetMapping("/getAllUser")
    public ResponseEntity<List<User>> getAllUser() {
        List<User> allUsers = this.usersService.getAllUser();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }


    /**
     * This Api is for Deleting the USER
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable String id) {
        this.usersService.deleteUser(id);
        return new ResponseEntity<ApiResponse>(deleteid, HttpStatus.OK);
    }


    /**
     * This Api is for Updating  the USER Entity
     *
     * @param user
     * @param id
     * @return
     */
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user, @PathVariable String id) {
        User updateUser = this.usersService.updateUser(user, id);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);

    }

    /**
     * In this API we get the User EmailUd
     *
     * @param emailId
     * @return
     */
    @GetMapping("/user/{emailId}")
    public ResponseEntity<User> getUserByEmailId(@PathVariable("emailId") String emailId) {
        User EmailId = this.usersService.getUserByEmailId(emailId);
        return new ResponseEntity<>(EmailId, HttpStatus.OK);

    }

    /****
     * This Api is for Updating the USER Certificate
     */
    @PutMapping("/profileupdate/{userEmailId}")
    public ResponseEntity<?> updateUser(@PathVariable("userEmailId") String userEmailId,
                                        @RequestParam("file") MultipartFile multipartFile, @RequestParam("user") String user) throws UserNotfoundException, IOException {

        User updateUser = usersService.getUserByEmailId(userEmailId);
        usersService.updateEmailId(updateUser, userEmailId, multipartFile);

        return new ResponseEntity<>(usersService, HttpStatus.OK);


    }

    @PutMapping("/vaccinationInfo/{userEmailId}")
    public ResponseEntity updateUser(@Valid @RequestBody UserVaccinationInfoDto userVaccinationInfoDto,
                                                          @PathVariable("userEmailId") String userEmailId)
                                                            throws UserNotfoundException, IOException {
               UserVaccinationInfo info=new UserVaccinationInfo();
               info.setDose(userVaccinationInfoDto.getDose());
               info.setCenterAddress(userVaccinationInfoDto.getCenterAddress());
               info.setVaccineType(userVaccinationInfoDto.getVaccineType());
               info.setCenter(userVaccinationInfoDto.getCenter());
               info.setDose(userVaccinationInfoDto.getDose());
               return new ResponseEntity<>( usersService.updateEmaild(info,userEmailId), HttpStatus.OK);

    }

    @GetMapping("/alluser/{email}")
    public List<User> getAllUserByEmail(@PathVariable("email") String email){
       return usersService.getAllUserByEmail(email);
    }


}





