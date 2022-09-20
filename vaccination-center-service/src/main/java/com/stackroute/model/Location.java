package com.stackroute.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model class for location
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {

    private String address;

    private String city;

    private String state;

    private String country;

    private String pinCode;
}
