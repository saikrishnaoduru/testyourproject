package com.stackroute.dto;

import com.stackroute.enums.Gender;
import com.stackroute.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserResponseDto {


    private String id;
    private String userName;
    private String userEmailId;
    private String password;
    private Address address;
    private String contactNumber;
    private Date dateOfBirth;
    private Integer age;
    private Gender gender;
    private List<UserVaccinationInfoDto> userVaccinationInfo;



}
