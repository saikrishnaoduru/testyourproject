package com.stackroute.ControllerTest;

import com.stackroute.Exception.UserNotFound;
import com.stackroute.controller.UserController;
import com.stackroute.domain.User;
import com.stackroute.service.JwtSecurityTokenGenerator;
import com.stackroute.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class AuthenticationTest {
    @InjectMocks
    public UserController controller;
    @Mock
    public UserService service;

    @Mock
    public JwtSecurityTokenGenerator token;

    ResponseEntity entity;


    User user = new User();

    @Test
    public void testWhenCredintialsValid() throws UserNotFound {
        user.setUserEmail("raveenan6500s@gmail.com");
        user.setUserPassword("12345");
        Map<String, String> map = new HashMap<>();
        map.put("authenticated", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYXZlZW5hbjY1MDBzQGdtYWlsLmNvbSIsImlhdCI6MTY1NzYyNzQ5OH0.Ht_zErswfO3E22RVHrxVFkp6LuZMHUl_Tj-sFHn3sS4");
        entity = new ResponseEntity(map, HttpStatus.OK);

        Mockito.when(service.login(anyString(), anyString())).thenReturn(user);
        Mockito.when(token.generateToken(user)).thenReturn(map);

        assertEquals(entity, controller.login(user));


    }


}




