package com.stackroute.model;

import com.stackroute.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@ToString
public class Slot {

    @Id
    private String slotId;
    private String time;
    private Date date;
    private String vaccinatorName;
    private Status status;

    public Slot(){

    }

}
