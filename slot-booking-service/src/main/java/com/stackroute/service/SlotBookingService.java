package com.stackroute.service;

import com.stackroute.config.Producer;
import com.stackroute.dto.SlotBookingDto;
import com.stackroute.enums.Status;
import com.stackroute.exceptions.FieldsCannotBeEmpty;
import com.stackroute.exceptions.SlotNotFound;
import com.stackroute.exceptions.UserNotFound;
import com.stackroute.model.Slot;
import com.stackroute.model.SlotBooking;
import com.stackroute.repository.SlotBookingRepo;
import com.stackroute.repository.SlotTempRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class SlotBookingService implements SlotBookingInterface {

    @Autowired
    SlotBookingRepo repo;

    @Autowired
    Producer producer;

    @Autowired
    SlotTempRepository slotTempRepository;

    ResponseEntity responseEntity;
    public SlotBooking bookSlot(SlotBooking slotBooking) throws FieldsCannotBeEmpty {

        try{
            if(null != repo.findByUserEmail(slotBooking.getUserEmail())){
                throw new Exception();
            }
            if(slotBooking.toString().isEmpty()){
                throw new FieldsCannotBeEmpty();
            }
            SlotBookingDto dto=new SlotBookingDto();
            dto.setUserEmail(slotBooking.getUserEmail());
            dto.setUserName(slotBooking.getUserName());
            dto.setSlot(slotBooking.getSlot());
            dto.setLocation(slotBooking.getLocation());
            dto.setVaccinationCenterName(slotBooking.getVaccinationCenterName());
            repo.save(slotBooking);
            producer.sendMessageToRabbitMq(dto);

            return slotBooking;
        }catch (FieldsCannotBeEmpty ex) {
            throw new FieldsCannotBeEmpty();
        }catch (Exception e) {
            responseEntity = new ResponseEntity("error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }


    public Slot getSlot(@PathVariable("id") String id) throws SlotNotFound {
        try{
            SlotBooking book= repo.findById(id).orElse(null);
            if(book == null){
                throw new SlotNotFound();
            }
            return book.getSlot();
        }catch (SlotNotFound ex){
            throw new SlotNotFound();
        }catch (Exception e){
            responseEntity = new ResponseEntity("error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return null;
    }


    public SlotBooking getSlotByEmail(@PathVariable("userEmail") String email) throws UserNotFound {
        SlotBooking book= repo.findByUserEmail(email);
        try{
            if(book == null){
                throw new UserNotFound();
            }
            return book;}
        catch (UserNotFound ex){
            throw new UserNotFound();
        }catch (Exception e){
            responseEntity = new ResponseEntity("error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }


    public List<SlotBooking> getSlotByVaccinationEmail(@PathVariable("vaccinationCenterEmailId") String email) throws UserNotFound {
        List<SlotBooking> book= repo.findByVaccinationCenterEmailId(email);

        try {
            if (book.isEmpty()){
                throw new UserNotFound();
            }
            return book;
        }catch (UserNotFound ex){
            throw new UserNotFound();

        }catch (Exception e){
            responseEntity = new ResponseEntity("error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }


    public String delSlot( String email)  throws SlotNotFound{
        try {
            SlotBooking book= repo.findByUserEmail(email);
            if(book == null){
                throw new SlotNotFound();
            }
            repo.delete(book);
            SlotBookingDto dto =new SlotBookingDto();
            dto.setUserEmail(book.getUserEmail());
            dto.setUserName(book.getUserName());
            dto.setSlot(book.getSlot());
            dto.setLocation(book.getLocation());
            dto.setVaccinationCenterName(book.getVaccinationCenterName());
            producer.sendMessageToRabbitMqOnDelete(dto);
            return "deleted";
        }catch (SlotNotFound ex){
            throw new SlotNotFound();
        }catch (Exception e) {
            responseEntity = new ResponseEntity("error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return null;
    }

    public boolean updateSlotStatus(String slotId, Status slotStatus){
       return slotTempRepository.updateSlotStatus(slotId,slotStatus);
    }

}


