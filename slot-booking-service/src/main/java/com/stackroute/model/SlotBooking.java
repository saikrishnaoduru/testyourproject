package com.stackroute.model;

import com.stackroute.enums.Vaccine;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Setter
@Getter
@AllArgsConstructor
@ToString
@Document
public class SlotBooking {

    @Id
    private String id;
    private String userEmail;
    private String userName;
    private String vaccinationCenterName;
    private String vaccinationCenterEmailId;
    private Slot slot;
    private Location location;
    private Vaccine vaccine;

    public SlotBooking() {

    }


}
