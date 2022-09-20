package com.stackroute.controller;

import com.stackroute.dto.CustomResponseEntity;
import com.stackroute.dto.Statics;
import com.stackroute.dto.VaccineDto;
import com.stackroute.enums.SlotStatus;
import com.stackroute.enums.VaccineType;
import com.stackroute.model.SlotAvailability;
import com.stackroute.model.TimeSlot;
import com.stackroute.service.SlotAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Controller for mananging slot Availability operations
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@RestController
@RequestMapping("/api/v1/slots")
@CrossOrigin
public class SlotAvailabilityController {

    @Autowired
    SlotAvailabilityService slotService;

    /**
     * This function create the Slot Availbility and return updated one
     * @param slotAvailability
     * @return slotAvailability
     */
    @PostMapping("/create")
    public ResponseEntity<SlotAvailability> createSlots(@RequestBody SlotAvailability slotAvailability){
        SlotAvailability updatedSlotAvailability =  slotService.addSlotAvailability(slotAvailability);
       return new ResponseEntity<>(updatedSlotAvailability,HttpStatus.CREATED);
    }

    /**
     * This function provide all Available slots based on given email,date and vaccineType
     * @param emailId
     * @param dateString
     * @param vaccineType
     * @return slotAvailability
     */
    @GetMapping("/available/{emailId}")
    public ResponseEntity getAvailableSlot(@PathVariable("emailId") String emailId, @RequestParam("date") String dateString, @RequestParam("vaccineType") VaccineType vaccineType) {
        SlotAvailability slotAvailability = slotService.getAvailbleSlots(emailId, LocalDate.parse(dateString),vaccineType);
        return ResponseEntity.ok(slotAvailability);
    }

    /**
     * This function returns all booked slots for given vaccination center
     * @param emailId
     * @return slotAvailability
     */
    @GetMapping("/booked/{emailId}")
    public ResponseEntity getBookedSlots(@PathVariable("emailId") String emailId) {
        List<SlotAvailability> slotAvailability = slotService.getBookedSlots(emailId);
        return ResponseEntity.ok(slotAvailability);
    }

    /**
     * This fucntion returns all slots for vaccination center weather slots are booked or Available
     * @param emailId
     * @return slotAvailability
     */
    @GetMapping("/all/{emailId}")
    public ResponseEntity getAllSlots(@PathVariable("emailId") String emailId) {
        List<SlotAvailability> slotAvailability = slotService.getAllSlots(emailId);
        return ResponseEntity.ok(slotAvailability);
    }

    /**
     * This fuction provides the Specific slot by using slot Id.
     * @param slotId
     * @return slotAvailability
     */
    @GetMapping("/{slotId}")
    public ResponseEntity getAslot(@PathVariable("slotId") String slotId) {
        SlotAvailability slotAvailability = slotService.getAslot(slotId);
        return ResponseEntity.ok(slotAvailability);
    }

    /**
     *  This function delete a slot using id
     * @param slotId
     * @return ResponseEntity
     */
    @DeleteMapping("/{slotId}")
    public ResponseEntity<?> deleteAslot(@PathVariable("slotId") String slotId) {
        slotService.deleteSlot(slotId);
        return ResponseEntity.ok(
                new CustomResponseEntity<String>(HttpStatus.ACCEPTED, "Success", "Slot Deleted Successfully"));
    }

    /**
     * This Function updates the slot which is already created.
     * @param timeSlot
     * @return ResponseEntity
     */
    @PutMapping("/update")
    public ResponseEntity updateSlot(@RequestBody TimeSlot timeSlot) {
        slotService.updateSlot(timeSlot);
        return ResponseEntity.ok(
                new CustomResponseEntity<String>(HttpStatus.ACCEPTED, "Success", "Slot status updated Successfully"));
    }

    /**
     * This Function updates the status the slot which is already created.
     * @param slotId
     * @param slotStatus
     * @return ResponseEntity
     */
    @PutMapping("/update/{slotId}")
    public ResponseEntity updateSlotStatus(@PathVariable("slotId") String slotId, @RequestParam("status") SlotStatus slotStatus){
        slotService.updateSlotStatus(slotId,slotStatus);
        return ResponseEntity.ok(
                new CustomResponseEntity<String>(HttpStatus.ACCEPTED, "Success", "Slot updated Successfully"));
    }

    /**
     * This funcion take slot and update it into SlotAvailability.
     * @param slotAvailabilityId
     * @param timeSlot
     * @return ResponseEntity
     */
    @PutMapping("/add/{id}")
    public ResponseEntity addAslot(@PathVariable("id") String slotAvailabilityId, @RequestBody TimeSlot timeSlot){
        slotService.addASlot(slotAvailabilityId,timeSlot);
        return ResponseEntity.ok(
                new CustomResponseEntity<String>(HttpStatus.ACCEPTED, "Success", "Slot added Successfully"));
    }

    @GetMapping("available/center/{email}")
    public ResponseEntity<List<SlotAvailability>> getAllSlotsbyEmilId(@PathVariable("email") String email){
     List<SlotAvailability> slotAvailabilities = slotService.getAllAvailableSlotSByEmailId(email);
     return
             new ResponseEntity<List<SlotAvailability>>(slotAvailabilities,HttpStatus.ACCEPTED);
    }

    @GetMapping("available/count/{email}")
    public ResponseEntity getAvailableSlotsCountForCenter(@PathVariable("email") String email,@RequestParam("date") String dateString){
        List<VaccineDto> slotAvailabilities = slotService.getAvailableSlotsCountForCenter(email,LocalDate.parse(dateString));
       if(slotAvailabilities.isEmpty()){
           return
                   new ResponseEntity<>("No available slots found",HttpStatus.NO_CONTENT);
       }
        return
                new ResponseEntity<>(slotAvailabilities,HttpStatus.ACCEPTED);
    }

    @GetMapping("stats/{email}")
    public Map<VaccineType, Statics> getVaccinationStats(@PathVariable("email") String email){
       return slotService.test1(email);
    }
}
