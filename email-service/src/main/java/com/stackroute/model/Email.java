package com.stackroute.model;

import lombok.*;

import java.sql.Date;
import java.sql.Time;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Email {

    private String from;
    private String to;
    private String subject;
    private String message;


    private SlotBooking slotBooking;
    private String userName;
    private String userEmailId;
    private String vaccinationCenterName;


    private Slot slot;
    private Time slotTime;
    private Date slotDate;


    private Location location;
    private String state;
    private String pincode;
    private String city;
    private String address;



}
