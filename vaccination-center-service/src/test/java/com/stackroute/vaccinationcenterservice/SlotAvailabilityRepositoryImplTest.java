package com.stackroute.vaccinationcenterservice;

import com.stackroute.enums.SlotStatus;
import com.stackroute.enums.VaccineType;
import com.stackroute.model.Location;
import com.stackroute.model.SlotAvailability;
import com.stackroute.model.TimeSlot;
import com.stackroute.model.Vaccine;
import com.stackroute.repository.SlotMongoRepository;
import com.stackroute.repository.impl.SlotAvailabilityRepositoryImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import static org.junit.Assert.assertEquals;



@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class SlotAvailabilityRepositoryImplTest {

    @Autowired
    public SlotAvailabilityRepositoryImpl repository;

    @Autowired
    SlotMongoRepository mongoRepositoryrepository;

    SlotAvailability slotAvailability1;

    @Before
    public void init(){
        Vaccine vac = new Vaccine(VaccineType.COVAXIN,43,454.4);
        List<TimeSlot> timeSlotList = Arrays.asList(new TimeSlot("3", LocalTime.parse("12:23"),LocalTime.parse("13:23"), SlotStatus.BOOKED,"poonam"),
                new TimeSlot("2", LocalTime.parse("15:23"),LocalTime.parse("18:23"), SlotStatus.AVAILABLE,"rajni"));
        Location loc = new Location("UP",null,null,null,"21 abc");
        slotAvailability1 = new SlotAvailability("2","esi","sdfkjk@gmail.com","8475984798574", LocalDate.parse("2022-03-21"),timeSlotList, vac,loc);
        mongoRepositoryrepository.save(slotAvailability1);
    }


    @Test
    public void testGetSlotByStatus() {

        SlotAvailability fetchedSlotAvailability = repository.getSlotsBYstatusAndDate("sdfkjk@gmail.com",LocalDate.parse("2022-03-21"),SlotStatus.AVAILABLE,VaccineType.COVAXIN);
        assertEquals(slotAvailability1.getId(),fetchedSlotAvailability.getId());
        assertEquals(1,fetchedSlotAvailability.getTimeSlots().size());
        assertEquals("2",fetchedSlotAvailability.getTimeSlots().get(0).getSlotId());

    }

    @Test
    public void testUpdateSlotStatus(){
        boolean result = repository.updateSlotStatus("2",SlotStatus.BOOKED);
        assertEquals(true,result);

    }

    @Test
    public void testUpdateSlot(){
       TimeSlot timeSlot = new TimeSlot("2", LocalTime.parse("15:23"),LocalTime.parse("18:23"), SlotStatus.BOOKED,"rajesh");
      boolean result = repository.updateSlot(timeSlot);
      assertEquals(true,result);

    }

    @Test
    public void testDeleteSlot(){
        boolean result = repository.deleteAslot("3");
        assertEquals(true,result);

    }
    @Test
    public void testGetSlotById(){
       SlotAvailability slotAvailability = repository.getSlotById("2");
       assertEquals(1,slotAvailability.getTimeSlots().size());
       assertEquals("2",slotAvailability.getTimeSlots().get(0).getSlotId());

    }
    @Test
    public void testaddAslot(){
        TimeSlot timeSlot = new TimeSlot("5", LocalTime.parse("20:23"),LocalTime.parse("21:23"), SlotStatus.AVAILABLE,"rajesh");
        boolean result = repository.addAslot("2",timeSlot);
        assertEquals(true,result);

    }



}
