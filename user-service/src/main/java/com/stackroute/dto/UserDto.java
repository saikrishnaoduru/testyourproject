package com.stackroute.dto;

import com.stackroute.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private String userName;
    private String userEmailId;
    private String password;
    private UserRole userRole;
}
