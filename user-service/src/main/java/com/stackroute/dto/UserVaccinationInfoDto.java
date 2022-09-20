package com.stackroute.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserVaccinationInfoDto {

    private int dose;
    private String vaccinationId;
    private String vaccineType;
    private String center;
    private String centerAddress;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfVaccination;


}
