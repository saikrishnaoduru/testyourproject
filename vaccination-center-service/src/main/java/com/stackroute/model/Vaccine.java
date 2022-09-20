package com.stackroute.model;

import com.stackroute.enums.VaccineType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model Class for Vaccine
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vaccine {

	private VaccineType vaccineType;

	private int count;

	private double price;

}
