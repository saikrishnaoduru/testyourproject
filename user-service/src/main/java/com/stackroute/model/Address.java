package com.stackroute.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    private String houseNo;
    private String street;
    private String addrss;
    private String pincode;
    private String district;
    private String state;
    private String city;
    private String country;

}
