package com.stackroute.controller;



import com.stackroute.enums.Status;
import com.stackroute.exceptions.SlotNotFound;
import com.stackroute.exceptions.UserNotFound;
import com.stackroute.exceptions.FieldsCannotBeEmpty;
import com.stackroute.model.Slot;
import com.stackroute.model.SlotBooking;
import com.stackroute.service.SlotBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class SlotBookingController {

    @Autowired
    SlotBookingService service;

    /**
     * Book a Slot
     * @param slotBooking
     * @return Slotbooking
     * @throws FieldsCannotBeEmpty Exception
     */
    @PostMapping("/slot")
    public ResponseEntity<SlotBooking> addSlot(@RequestBody SlotBooking slotBooking) throws FieldsCannotBeEmpty{

        if (slotBooking.toString().isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        SlotBooking s = service.bookSlot(slotBooking);
        return new ResponseEntity<>(s,HttpStatus.ACCEPTED);

    }

    /**
     * Get booked Slot Based on booked Id
     * @param id
     * @return Slot
     * @throws SlotNotFound Exception
     */
    @GetMapping("/getSlot/{id}")
    public ResponseEntity<Slot> gSlot(@PathVariable("id") String id) throws SlotNotFound{

        if(id.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        Slot s = service.getSlot(id);
        return new ResponseEntity<>(s,HttpStatus.ACCEPTED);
    }

    /**
     * Get booked Slot based on user email id
     * @param email
     * @return Slot
     * @throws UserNotFound Exception
     */
    @GetMapping("/getByUserEmail/{userEmail}")
    public ResponseEntity<SlotBooking> gUserEmail(@PathVariable("userEmail") String email) throws UserNotFound {
        if (email.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        SlotBooking s = service.getSlotByEmail(email);
        return new ResponseEntity<>(s,HttpStatus.ACCEPTED);
    }

    /**
     * Get booked Slot based on Vaccination center email id
     * @param email
     * @return List of Slots
     * @throws UserNotFound Exception
     */
    @GetMapping("/getByVaccinationEmail/{vaccinationCenterEmailId}")
    public ResponseEntity<List<SlotBooking>> gVaccinationEmail(@PathVariable("vaccinationCenterEmailId") String email) throws UserNotFound {
        List<SlotBooking> s = service.getSlotByVaccinationEmail(email);
        if (s.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(s,HttpStatus.ACCEPTED);
    }

    /**
     * Delete a Slot based on booking id
     * @param userEmail
     * @return String
     * @throws SlotNotFound Exception
     */
    @DeleteMapping("/slotdelete/{userEmail}")
    public ResponseEntity<String> delete(@PathVariable("userEmail") String userEmail) throws SlotNotFound {
        service.delSlot(userEmail);
        if(userEmail.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>("Deleted",HttpStatus.ACCEPTED);
    }

    @PutMapping("/slot/status/{slotId}")
    public ResponseEntity updateSlotStatus(@PathVariable("slotId") String slotId, @RequestParam("status") Status slotStatus){
       if(service.updateSlotStatus(slotId,slotStatus)){
           return new ResponseEntity<>("updated",HttpStatus.ACCEPTED);
       }else {
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }
    }
}
