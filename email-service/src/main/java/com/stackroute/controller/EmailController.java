package com.stackroute.controller;

import com.stackroute.dto.EmailDTO;
import com.stackroute.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class EmailController {

    @Autowired
    private EmailService emailService;

    //This Api will send email about confirmation of booked slot
    @PostMapping("/email")
    public String sendEmail(@RequestBody EmailDTO emailDTO) {
        String status = emailService.sendEmail( emailDTO);

        return status;
    }
    //This api will send email about cancellation of booked slot
    @PostMapping("/emailCancel")
    public String sendEmailCancel(@RequestBody EmailDTO emailDTO) {
        String status = emailService.sendEmail(emailDTO);

        return status;
    }

}
