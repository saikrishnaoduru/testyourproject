package com.stackroute.domain;
import  com.stackroute.Enum.*;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    private String userEmail;
    private String userPassword;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public UserRole getUserRole() {
        return userRole;
    }
}



