package com.stackroute.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@AllArgsConstructor
@ToString
public class Location {
    private String state;
    private String pincode;
    private String country;
    private String city;
    private String Address;

    public Location(){

    }


}
