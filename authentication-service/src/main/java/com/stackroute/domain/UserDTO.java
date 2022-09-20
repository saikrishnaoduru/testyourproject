package com.stackroute.domain;

import com.stackroute.Enum.UserRole;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO {
    // Running rabbitmq sudo docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management
    // docker ps
    private String userEmailId;
    private String password;
    private UserRole userRole;
}
