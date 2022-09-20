package com.stackroute.service;

import com.stackroute.dto.Statics;
import com.stackroute.dto.VaccineDto;
import com.stackroute.enums.SlotStatus;
import com.stackroute.enums.VaccineType;
import com.stackroute.model.SlotAvailability;
import com.stackroute.model.TimeSlot;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 *  This interface provides model to slot service layer
 *
 *  @author Jitender <Jitender.1@globallogic.com>
 */
public interface SlotAvailabilityService {

     SlotAvailability addSlotAvailability(SlotAvailability slotAvailability);

     SlotAvailability getAvailbleSlots(String centerEmailId, LocalDate date, VaccineType vaccineType);

     List<SlotAvailability> getBookedSlots(String centerEmailId);

     List<SlotAvailability> getAllSlots(String centerEmailId);

     SlotAvailability getAslot(String slotId);

     boolean updateSlot(TimeSlot timeSlot);

     boolean deleteSlot(String slotId);

     boolean updateSlotStatus(String SlotId, SlotStatus slotStatus);

     boolean addASlot(String slotAvailanilityId, TimeSlot timeSlot);

     List<SlotAvailability> getAllAvailableSlotSByEmailId(String emailId);

     List<VaccineDto> getAvailableSlotsCountForCenter(String emailId, LocalDate date);

     Map<VaccineType,Statics> test1(String emailId);

}
