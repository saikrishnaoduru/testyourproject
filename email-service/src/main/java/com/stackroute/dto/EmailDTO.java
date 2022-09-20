package com.stackroute.dto;

import com.stackroute.model.Location;
import com.stackroute.model.Slot;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmailDTO {


    private String userEmail;
    private String userName;
    private String vaccinationCenterName;
    private Slot slot;
    private Location location;

}
