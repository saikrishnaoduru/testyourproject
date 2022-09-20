//package com.stackroute.Controller;
//
//import com.stackroute.controller.SlotBookingController;
//import com.stackroute.enums.Status;
//import com.stackroute.enums.Vaccine;
//import com.stackroute.exceptions.FieldsCannotBeEmpty;
//import com.stackroute.exceptions.SlotNotFound;
//import com.stackroute.exceptions.UserNotFound;
//import com.stackroute.model.Location;
//import com.stackroute.model.Slot;
//import com.stackroute.model.SlotBooking;
//import com.stackroute.repository.SlotBookingRepo;
//import com.stackroute.service.SlotBookingService;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import static org.mockito.ArgumentMatchers.any;
//import java.util.Date;
//import java.util.List;
//
//@SpringBootTest
//class SlotBookingControllerTest {
//
//    @InjectMocks
//    public SlotBookingController controller;
//
//    @Mock
//    public SlotBookingRepo repo;
//
//    @Mock
//    public SlotBookingService service;
//
//    SlotBooking slotBooking;
//    Slot slot;
//    List<Slot> list;
//    Location location;
//
//
//    @BeforeEach
//    public void init(){
//        location = new Location("UP",null,null,null,"21 abc");
//        slot = new Slot("2","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        slotBooking =new SlotBooking("2","abc","abc","xyz","xyz@gmail.com",slot,location,Vaccine.COVAXIN);
//
//    }
//
//
//    @Test
//    public void bookSlotTest() throws FieldsCannotBeEmpty {
//
//        Location loc = new Location("UP",null,null,null,"21 abc");
//        Slot slot = new Slot("2","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        SlotBooking book = new SlotBooking("2","abc","abc","xyz","xyz@gmail.com",slot,loc,Vaccine.COVAXIN);
//        ResponseEntity<SlotBooking> entity = new ResponseEntity<>(book, HttpStatus.ACCEPTED);
//        Mockito.when(service.bookSlot(any())).thenReturn(book);
//        Assertions.assertEquals(entity.toString(), controller.addSlot(slotBooking).toString());
//
//    }
//
//    @Test
//    public void bookSlotTestNoContent() throws FieldsCannotBeEmpty {
//
//        Location loc = new Location("UP",null,null,null,"21 abc");
//        Slot slot = new Slot("","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        SlotBooking book = new SlotBooking("","abc","abc","xyz","xyz@gmail.com",slot,loc,Vaccine.COVAXIN);
//        ResponseEntity<SlotBooking> entity = new ResponseEntity<>(book,HttpStatus.NO_CONTENT);
//        Mockito.when(service.bookSlot(any())).thenReturn(null);
//        Assertions.assertNotEquals(entity.toString(), controller.addSlot(slotBooking).toString());
//
//    }
//
//    @Test
//    public void getSlotTest() throws SlotNotFound {
//        Location loc = new Location("UP",null,null,null,"21 abc");
//        Slot slot = new Slot("2","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        SlotBooking book = new SlotBooking("2","abc","abc","xyz","xyz@gmail.com",slot,loc,Vaccine.COVAXIN);
//        ResponseEntity<Slot> entity = new ResponseEntity<>(slot, HttpStatus.ACCEPTED);
//        Mockito.when(service.getSlot(book.getId())).thenReturn(slot);
//        Assertions.assertEquals(entity, controller.gSlot(slotBooking.getId()));
//    }
//    @Test
//    public void getSlotTestNoContent() throws SlotNotFound {
//        Location loc = new Location("UP",null,null,null,"21 abc");
//        Slot slot = new Slot("","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        SlotBooking book = new SlotBooking("","abc","abc","xyz","xyz@gmail.com",slot,loc,Vaccine.COVAXIN);
//        ResponseEntity<Slot> entity = new ResponseEntity<>(slot, HttpStatus.NO_CONTENT);
//        Mockito.when(service.getSlot(book.getId())).thenReturn(null);
//        Assertions.assertNotEquals(entity, controller.gSlot(slotBooking.getId()));
//    }
//
//    @Test
//    public void getUserEmailTest() throws UserNotFound {
//        Location loc = new Location("UP",null,null,null,"21 abc");
//        Slot slot = new Slot("2","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        SlotBooking book = new SlotBooking("2","abc","abc","xyz","xyz@gmail.com",slot,loc,Vaccine.COVAXIN);
//        ResponseEntity<Slot> entity = new ResponseEntity<>(slot, HttpStatus.ACCEPTED);
//        Mockito.when(service.getSlotByEmail(book.getUserEmail())).thenReturn(slot);
//        Assertions.assertEquals(entity, controller.gUserEmail(slotBooking.getUserEmail()));
//    }
//
//    @Test
//    public void getUserEmailTestNoContent() throws UserNotFound {
//        Location loc = new Location("UP",null,null,null,"21 abc");
//        Slot slot = new Slot("2","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        SlotBooking book = new SlotBooking("2","","abc","xyz","xyz@gmail.com",slot,loc,Vaccine.COVAXIN);
//        ResponseEntity<Slot> entity = new ResponseEntity<>(slot, HttpStatus.NO_CONTENT);
//        Mockito.when(service.getSlotByEmail(book.getUserEmail())).thenReturn(null);
//        Assertions.assertNotEquals(entity, controller.gUserEmail(slotBooking.getUserEmail()));
//    }
//
//
//    @Test
//    public void deleteTest() throws SlotNotFound {
//        Location loc = new Location("UP",null,null,null,"21 abc");
//        Slot slot = new Slot("2","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        SlotBooking book = new SlotBooking("2","abc","abc","xyz","xyz@gmail.com",slot,loc,Vaccine.COVAXIN);
//        ResponseEntity<String> entity = new ResponseEntity<>("Deleted", HttpStatus.ACCEPTED);
//        Mockito.when(service.delSlot(book.getId())).thenReturn("Deleted");
//        Assertions.assertEquals(entity, controller.delete(slotBooking.getId()));
//
//    }
//
//
//
//}