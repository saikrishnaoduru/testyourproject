package com.stackroute.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("userVaccinationInfo")
public class UserVaccinationInfo {

    private int dose;
    private String vaccinationId;
    private String vaccineType;
    private String center;
    private String centerAddress;
    private byte[] certificate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfVaccination;
}
