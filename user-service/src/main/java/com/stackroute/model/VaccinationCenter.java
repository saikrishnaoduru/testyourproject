package com.stackroute.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.glassfish.jaxb.runtime.v2.schemagen.xmlschema.Any;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class VaccinationCenter {

    @Id
    private String centerId;
    private String  centerEmail ;
    private  String vaccinationCenterName;
    private Address address;
    private String contact;
    private Any proof;
    @Transient
    private String password;
    private List<String> vaccinators;



}

