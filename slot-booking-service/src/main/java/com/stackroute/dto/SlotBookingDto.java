package com.stackroute.dto;


import com.stackroute.model.Location;
import com.stackroute.model.Slot;
import lombok.*;


@Setter
@Getter
@NoArgsConstructor
public class SlotBookingDto {


    private String userEmail;
    private String userName;
    private String vaccinationCenterName;
    private Slot slot;
    private Location location;
}
