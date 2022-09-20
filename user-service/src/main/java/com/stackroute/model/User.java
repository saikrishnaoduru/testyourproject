package com.stackroute.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stackroute.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("user")
public class User {

    @Id
    private String id;
    @NotBlank(message = "Name is mandatory")
    private String userName;
    @NotBlank(message = "UserEmailId is mandatory")
    @Email(message = "Please provide valid email")
    private String userEmailId;
    private String password;
    private Address address;
    private String contactNumber;
    @NotNull(message = "Please provide date of birth")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dateOfBirth;
    @NotNull(message = "Please provide age")
    private Integer age;
    @NotNull(message = "Please provide gender")
    private Gender gender;
    private List<UserVaccinationInfo> userVaccinationInfo;
    @JsonIgnore
    private byte[] certificate;


}