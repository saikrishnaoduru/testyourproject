package com.stackroute.ServiceTest;

import com.stackroute.Enum.UserRole;
import com.stackroute.Exception.UserNotFound;
import com.stackroute.domain.User;
import com.stackroute.repository.UserRepository;
import com.stackroute.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.ArgumentMatchers.anyString;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class ServiceTest {
    @InjectMocks
    public UserService service;
    @Mock
    public UserRepository repo;

    User user=new User();



    @Test public void testGetUserByEmailAndPassword() throws UserNotFound{
        Mockito.when(repo.findByUsernameAndPassword(anyString(), anyString())).thenReturn(user);
        assertEquals(user, service.login("raveenan6500s@gmail.com", "12345"));
    }


}
