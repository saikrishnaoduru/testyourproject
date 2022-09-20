package com.stackroute.repository;

import com.stackroute.enums.SlotStatus;
import com.stackroute.enums.VaccineType;
import com.stackroute.model.SlotAvailability;
import com.stackroute.model.TimeSlot;
import java.time.LocalDate;
import java.util.List;

/**
 * Interface defining slot repository operations
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */


public interface SlotAvailabilityRepository {

     SlotAvailability getSlotsBYstatusAndDate(String centerEmailId, LocalDate date, SlotStatus slotStatus, VaccineType vaccineType);

     SlotAvailability getSlotById(String id);

     boolean updateSlot(TimeSlot timeSlot);

     boolean updateSlotStatus(String slotId, SlotStatus slotStatus);

     SlotAvailability getSlotsForDate(String centerEmailId, LocalDate date,VaccineType vaccineType);

     boolean deleteAslot(String slotId);

     SlotAvailability getTimeSlotBySlotId(String slotId);

      boolean addAslot(String SlotAvailabilityId,TimeSlot timeSlot);

     List<SlotAvailability> getSlotAvailablilityByStatus(String centerEmailId, SlotStatus slotStatus);

     List<SlotAvailability> getSlotsBystatusforDate(String centerEmailId, LocalDate date, SlotStatus slotStatus);
     List<SlotAvailability> getTimeSlotsByStatusAndCenterEmailId(String centerEmailId,SlotStatus status);
}
