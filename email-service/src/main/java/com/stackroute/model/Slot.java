package com.stackroute.model;

import lombok.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Slot {


    private String slotId;
    private String time;
    private Date date;



}
