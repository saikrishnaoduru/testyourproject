package com.stackroute.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.List;

/**
 * Model class for SlotAvailability
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "slot_availability")
public class SlotAvailability {

	@Id
	private String id;
	
	private String vaccineCenterName;
	
	private String vaccinationCenterEmailId;
	
	private String contactDetails;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate date;
	
	private List<TimeSlot> timeSlots;
	
	private Vaccine vaccine;

	private Location location;

}
