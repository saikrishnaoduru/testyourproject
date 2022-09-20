package com.stackroute.dto;

import com.stackroute.enums.VaccineType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VaccineDto {

    private VaccineType vaccineType;

    private int availableSlots;

    private Double price;
}
