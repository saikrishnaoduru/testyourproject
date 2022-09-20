package com.stackroute.vaccinationcenterservice;

import com.stackroute.enums.SlotStatus;
import com.stackroute.enums.VaccineType;
import com.stackroute.exceptions.SlotNotExistException;
import com.stackroute.exceptions.SlotsNotFoundException;
import com.stackroute.model.Location;
import com.stackroute.model.SlotAvailability;
import com.stackroute.model.TimeSlot;
import com.stackroute.model.Vaccine;
import com.stackroute.repository.SlotMongoRepository;
import com.stackroute.repository.impl.SlotAvailabilityRepositoryImpl;
import com.stackroute.service.impl.SlotAvailabilityServiceImpl;
import org.junit.Test;
import static org.mockito.Mockito.*;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class SlotAvailabilityServiceImplTest {


    @InjectMocks
    public SlotAvailabilityServiceImpl service;

    @Mock
    public SlotAvailabilityRepositoryImpl repository;

    @Mock
    SlotMongoRepository slotMongoRepository;

    @Test
    public void getBookedTimeSlot()  {
        Vaccine  vac = new Vaccine(VaccineType.COVAXIN,43,454.4);
        List<TimeSlot> timeSlotList = Arrays.asList(new TimeSlot("1",LocalTime.parse("12:23"),LocalTime.parse("18:23"), SlotStatus.BOOKED,"poonam"));
        Location loc = new Location("UP",null,null,null,"21 abc");
        SlotAvailability  slotAvailability1 = new SlotAvailability("2","esi","sdfkjk@gmail.com","8475984798574",LocalDate.parse("2022-03-21"),timeSlotList, vac,loc);
       List<SlotAvailability> slotList = Arrays.asList(slotAvailability1);
        Mockito.when(repository.getTimeSlotsByStatusAndCenterEmailId("sdfkjk@gmail.com",SlotStatus.BOOKED)).thenReturn(slotList);
        assertEquals(1,service.getBookedSlots("sdfkjk@gmail.com").size());
        verify(repository,times(1)).getTimeSlotsByStatusAndCenterEmailId(any(),any());
    }

//    @Test(expected = SlotsNotFoundException.class)
//    public void getBookedTimeSlotException()  {
//        Mockito.when(repository.getTimeSlotsByStatusAndCenterEmailId("sdfkjk@gmail.com",SlotStatus.BOOKED)).thenReturn(null);
//        service.getBookedSlots("sdfkjk@gmail.com");
//        verify(repository,times(1)).getTimeSlotsByStatusAndCenterEmailId(any(),any());
//    }
 //   @Test
//    public void getAvailableTimeSlot()  {
//        Vaccine  vac = new Vaccine(VaccineType.COVAXIN,43,454.4);
//        List<TimeSlot> timeSlotList = Arrays.asList(new TimeSlot("1",LocalTime.parse("12:23"),LocalTime.parse("18:23"), SlotStatus.AVAILABLE,"poonam"));
//        Location loc = new Location("UP",null,null,null,"21 abc");
//        SlotAvailability  slotAvailability1 = new SlotAvailability("2","esi","sdfkjk@gmail.com","8475984798574",LocalDate.parse("2022-03-21"),timeSlotList, vac,loc);
//        Mockito.when(repository.getSlotsBYstatusAndDate("sdfkjk@gmail.com",LocalDate.parse("2022-03-21"),SlotStatus.BOOKED,VaccineType.COVAXIN)).thenReturn(slotAvailability1);
//        assertEquals(slotAvailability1.toString(),service.getAvailbleSlots("sdfkjk@gmail.com",LocalDate.parse("2022-03-21"),VaccineType.COVAXIN).toString());
//        verify(repository,times(1)).getSlotsBYstatusAndDate(any(),any(),any(),any());
//    }
//    @Test(expected = SlotsNotFoundException.class)
//    public void getAvailableTimeSlotException()  {
//        Mockito.when(repository.getSlotsBYstatusAndDate("sdfkjk@gmail.com",LocalDate.parse("2022-03-21"),SlotStatus.AVAILABLE,VaccineType.COVAXIN)).thenReturn(null);
//        service.getAvailbleSlots("sdfkjk@gmail.com",LocalDate.parse("2022-03-21"),VaccineType.COVAXIN);
//    }


    @Test
    public void getAllTimeSlot()  {

        Vaccine  vac = new Vaccine(VaccineType.COVAXIN,43,454.4);
        List<TimeSlot> timeSlotList = Arrays.asList(new TimeSlot("1",LocalTime.parse("12:23"),LocalTime.parse("18:23"), SlotStatus.AVAILABLE,"poonam"));
        Location loc = new Location("UP",null,null,null,"21 abc");
        SlotAvailability  slotAvailability1 = new SlotAvailability("2","esi","sdfkjk@gmail.com","8475984798574",LocalDate.parse("2022-03-21"),timeSlotList, vac,loc);
        List<SlotAvailability> list = Arrays.asList(slotAvailability1);
        Mockito.when(slotMongoRepository.getByVaccinationCenterEmailId("sdfkjk@gmail.com")).thenReturn(list);
        assertEquals(1,service.getAllSlots("sdfkjk@gmail.com").size());
        verify(slotMongoRepository,times(1)).getByVaccinationCenterEmailId(any());
    }

    @Test
    public void getATimeSlot()  {
        Vaccine  vac = new Vaccine(VaccineType.COVAXIN,43,454.4);
        List<TimeSlot> timeSlotList = Arrays.asList(new TimeSlot("1",LocalTime.parse("12:23"),LocalTime.parse("18:23"), SlotStatus.AVAILABLE,"poonam"));
        Location loc = new Location("UP",null,null,null,"21 abc");
        SlotAvailability  slotAvailability1 = new SlotAvailability("2","esi","sdfkjk@gmail.com","8475984798574",LocalDate.parse("2022-03-21"),timeSlotList, vac,loc);
        Mockito.when(repository.getSlotById("1")).thenReturn(slotAvailability1);
        assertEquals(slotAvailability1.toString(),service.getAslot("1").toString());
    }

    @Test(expected = SlotNotExistException.class)
    public void getATimeSlotException()  {
        Mockito.when(repository.getSlotById("1")).thenReturn(null);
        service.getAslot("1").toString();
        verify(repository,times(1)).getSlotsForDate(any(),any(),any());
    }

    @Test
    public void deleteASlot()  {

        Mockito.when(repository.deleteAslot("1")).thenReturn(true);
        assertEquals(true,service.deleteSlot("1"));
    }

    @Test
    public void updateASlot()  {
        Vaccine  vac = new Vaccine(VaccineType.COVAXIN,43,454.4);
        List<TimeSlot> timeSlotList = Arrays.asList(new TimeSlot("1",LocalTime.parse("12:23"),LocalTime.parse("18:23"), SlotStatus.AVAILABLE,"poonam"));
        Location loc = new Location("UP",null,null,null,"21 abc");
        SlotAvailability  slotAvailability1 = new SlotAvailability("2","esi","sdfkjk@gmail.com","8475984798574",LocalDate.parse("2022-03-21"),timeSlotList, vac,loc);
        TimeSlot timeSlot = new TimeSlot("1",LocalTime.parse("13:23"),LocalTime.parse("15:23"), SlotStatus.AVAILABLE,"poonam");
        Mockito.when(repository.getTimeSlotBySlotId(timeSlot.getSlotId())).thenReturn(slotAvailability1);
        Mockito.when(repository.updateSlot(timeSlot)).thenReturn(true);
        assertEquals(true,service.updateSlot(timeSlot));
    }


    @Test
    public void addSlotAvailability()  {
        Vaccine  vac = new Vaccine(VaccineType.COVAXIN,43,454.4);
        List<TimeSlot> timeSlotList = Arrays.asList(new TimeSlot("1",LocalTime.parse("12:23"),LocalTime.parse("18:23"), SlotStatus.AVAILABLE,"poonam"));
        Location loc = new Location("UP","delhi","delhi","india","21 abc");
        SlotAvailability  slotAvailability1 = new SlotAvailability("2","esi","sdfkjk@gmail.com","8475984798574",LocalDate.parse("2022-03-21"),timeSlotList, vac,loc);
        TimeSlot timeSlot = new TimeSlot("1",LocalTime.parse("13:23"),LocalTime.parse("15:23"), SlotStatus.AVAILABLE,"poonam");
        Mockito.when(repository.getSlotsForDate(slotAvailability1.getVaccinationCenterEmailId(),slotAvailability1.getDate(),slotAvailability1.getVaccine().getVaccineType())).thenReturn(null);
        Mockito.when(slotMongoRepository.save(any())).thenReturn(slotAvailability1);
        assertEquals(slotAvailability1,service.addSlotAvailability(slotAvailability1));
    }

}
