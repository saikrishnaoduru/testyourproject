package com.stackroute.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.stackroute.enums.SlotStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;

/**
 * Model Class for TimeSlot
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "time_slot")
public class TimeSlot {

	@Id
	private String slotId;

	@JsonFormat(pattern = "HH:mm")
	private LocalTime startTime;

	@JsonFormat(pattern = "HH:mm")
	private LocalTime endTime;

	private SlotStatus status;

	private String vaccinatorName;
}
