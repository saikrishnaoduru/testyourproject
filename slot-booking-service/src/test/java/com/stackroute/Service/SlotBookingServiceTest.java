//package com.stackroute.Service;
//
//
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
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.Assert.assertEquals;
//import static org.mockito.ArgumentMatchers.anyString;
//
//@SpringBootTest
//public class SlotBookingServiceTest {
//
//
//    @InjectMocks
//    public SlotBookingService service;
//
//    @Mock
//    public SlotBookingRepo repo;
//
//    @Autowired
//    public SlotBookingRepo repo1;
//    SlotBooking slotBooking;
//    Slot slot;
//    Location location;
//    Optional<SlotBooking> slotOp ;
//
//
//
//
//    @BeforeEach
//    public void init(){
//        location = new Location("UP","12689","india","delhi","21 abc");
//        slot = new Slot("8","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        slotBooking =new SlotBooking("8","abc","abc","xyz","xyz@gmail.com",slot,location,Vaccine.COVAXIN);
//
//    }
//
//    @Test
//    public void getSlotTest() throws SlotNotFound {
//        Location loc = new Location("UP","12689","india","delhi","21 abc");
//        Slot slotNew = new Slot("8","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        slotOp = Optional.of(new SlotBooking("8","abc","abc","xyz","xyz@gmail.com",slotNew,loc,Vaccine.COVAXIN));
//        Mockito.when(repo.findById(anyString())).thenReturn(slotOp);
//        Assertions.assertEquals(slotOp.get().getSlot(), service.getSlot(slotBooking.getId()));
//    }
//
//
//
//    @Test
//    public void getUserEmailTest() throws UserNotFound {
//        Location loc = new Location("UP","12689","india","delhi","21 abc");
//        Slot slotNew = new Slot("8","15 - 16",new Date(2022-07-11),"wert",Status.BOOKED);
//        SlotBooking book = new SlotBooking("8","abc","abc","xyz","xyz@gmail.com",slot,loc,Vaccine.COVAXIN);
//        Mockito.when(repo.findByUserEmail(anyString())).thenReturn(book);
//        Assertions.assertEquals(book.getSlot(), service.getSlotByEmail(slotBooking.getUserEmail()));
//    }
//
//
//
//
//}
