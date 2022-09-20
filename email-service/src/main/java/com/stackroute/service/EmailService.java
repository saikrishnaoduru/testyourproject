package com.stackroute.service;

import com.stackroute.dto.EmailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    public String sendEmail(EmailDTO emailDTO){

        String from = "spotyourvaccine4@gmail.com";

        try {

            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();


            simpleMailMessage.setFrom(from);
            simpleMailMessage.setTo(emailDTO.getUserEmail());
            simpleMailMessage.setSubject("Confirmation of vaccine slot");
            simpleMailMessage.setText("Hi "+ emailDTO.getUserName() +",\n\n"+ "Your slot is booked successfully and has been schedule for "
                    + emailDTO.getSlot().getDate() +" at "+ emailDTO.getSlot().getTime() +" at "+ emailDTO.getVaccinationCenterName() +", " +
                    emailDTO.getLocation().getCity()+", "+ emailDTO.getLocation().getState() + ", " + emailDTO.getLocation().getPincode() +
                    ", " + emailDTO.getLocation().getAddress() + ".\n\n"+"Thanks & Regards\nSpotYourVaccine");


                javaMailSender.send(simpleMailMessage);
                return "Email sent successfully";
            } catch (Exception e) {
                return "User not found";

        }

    }

    public String sendEmailCancel(EmailDTO emailDTO){

        String from = "spotyourvaccine4@gmail.com";

        try {

                SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

                simpleMailMessage.setFrom(from);
                simpleMailMessage.setTo(emailDTO.getUserEmail());
                simpleMailMessage.setSubject("Cancellation of vaccine slot");
                simpleMailMessage.setText("Hi "+ emailDTO.getUserName() + ",\n\n"+ "Due to some unforeseen circumstances your booked slot scheduled for "
                        +emailDTO.getSlot().getDate() +" at "+ emailDTO.getSlot().getTime() +" at " + emailDTO.getVaccinationCenterName() +", " +
                        emailDTO.getLocation().getCity()+", "+ emailDTO.getLocation().getState() + ", " + emailDTO.getLocation().getPincode() + ", " +
                        emailDTO.getLocation().getAddress()  + " has been cancelled" + ".\n\n"+"Thanks & Regards\nSpotYourVaccine");


            javaMailSender.send(simpleMailMessage);
            return "Email sent successfully";
        } catch (Exception e) {
            return "User not found";

        }
    }

}
