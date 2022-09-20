package com.stackroute.service;

import com.stackroute.exceptions.FieldsCannotBeEmpty;
import com.stackroute.exceptions.SlotNotFound;
import com.stackroute.exceptions.UserNotFound;
import com.stackroute.model.SlotBooking;
import com.stackroute.model.Slot;

import java.util.List;


public interface SlotBookingInterface {

    SlotBooking bookSlot(SlotBooking slotBooking) throws FieldsCannotBeEmpty;
    Slot getSlot(String id) throws SlotNotFound;
    SlotBooking getSlotByEmail(String email) throws UserNotFound;
    List<SlotBooking> getSlotByVaccinationEmail(String email) throws UserNotFound;
    String delSlot(String id) throws SlotNotFound;



}
