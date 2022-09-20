package com.stackroute.config;

import com.stackroute.dto.EmailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import com.stackroute.service.EmailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class Consumer {

    @Autowired
    private EmailService emailService;


    @RabbitListener(queues = "user_queue")
    public void getUserFromRabbitMq(EmailDTO emailDTO) {
        System.out.println(emailDTO.toString());

        emailService.sendEmail(emailDTO);

    }

    @RabbitListener(queues = "user_delete")
    public void getUserFromRabbitMqOnDelete(EmailDTO emailDTO) {
        System.out.println(emailDTO.toString());

        emailService.sendEmailCancel(emailDTO);
    }
}
