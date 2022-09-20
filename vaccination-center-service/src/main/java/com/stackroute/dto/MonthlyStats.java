package com.stackroute.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyStats {

    private int month;
    private int year;
    private long totalVaccinationDone;
}
