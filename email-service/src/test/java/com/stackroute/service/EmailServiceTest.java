//package com.stackroute.service;
//
//import com.stackroute.controller.EmailController;
//import com.stackroute.model.Email;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import static org.mockito.Mockito.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//
//import static org.junit.Assert.assertEquals;
//
//@SpringBootTest
//@RunWith(SpringJUnit4ClassRunner.class)
//
//public class EmailServiceTest {
//
//    @InjectMocks
//    private EmailService emailService;
//
//    @Mock
//    private JavaMailSender javaMailSender;
//
//    Email email =new Email();
//
//    @Test
//    public void testEmail(){
//
//        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
//
//        simpleMailMessage.setFrom("spotyourvaccine4@gmail.com");
//        simpleMailMessage.setTo("yogeshkumardhruw524@gmail.com");
//        simpleMailMessage.setSubject("Confirm");
//        simpleMailMessage.setText("your slot is booked");
//
//
////        assertEquals("Email sent successfully", emailService.sendEmail(email));
//        verify(javaMailSender,times(1)).send(simpleMailMessage);
//
//
////        assertEquals(true, emailService.sendEmail(email));
//
//
//
//    }
//
//
//}
