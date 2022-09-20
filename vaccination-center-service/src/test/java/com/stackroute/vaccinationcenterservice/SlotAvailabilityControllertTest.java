package com.stackroute.vaccinationcenterservice;

import com.stackroute.controller.SlotAvailabilityController;
import com.stackroute.enums.SlotStatus;
import com.stackroute.enums.VaccineType;
import com.stackroute.model.Location;
import com.stackroute.model.SlotAvailability;
import com.stackroute.model.TimeSlot;
import com.stackroute.model.Vaccine;
import com.stackroute.service.SlotAvailabilityService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.junit.Assert.assertEquals;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class SlotAvailabilityControllertTest {

    private MockMvc mockMvc;
    @InjectMocks
    public SlotAvailabilityController controller;

    @Mock
    public SlotAvailabilityService service;


    SlotAvailability slotAvailability;
    TimeSlot slot;
    List<TimeSlot> list;
    Location location;

    Vaccine vaccine;

    @Before
    public void init() {
        vaccine = new Vaccine(VaccineType.COVAXIN, 43, 454.4);
        location = new Location("UP", null, null, null, "21 abc");
        slot = new TimeSlot("1", LocalTime.parse("12:23"), LocalTime.parse("18:23"), SlotStatus.BOOKED, "poonam");
        slotAvailability = new SlotAvailability("2", "esi", "sdfkjk@gmail.com", "8475984798574", LocalDate.parse("2022-03-21"), list, vaccine, location);
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    public void testGetBookedTimeSlot() throws Exception {
     List<SlotAvailability> slotAvailabilitiesList = Arrays.asList(slotAvailability);
        Mockito.when(service.getBookedSlots("sdfkjk@gmail.com")).thenReturn(slotAvailabilitiesList);
        mockMvc.perform(get("/api/v1/slots/booked/sdfkjk@gmail.com/?date=2022-03-21&vaccineType=COVAXIN")).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(service,times(1)).getBookedSlots(any());
    }

    @Test
    public void testGetAvailableTimeSlot() throws Exception {
        Mockito.when(service.getAvailbleSlots("sdfkjk@gmail.com",LocalDate.parse("2022-03-21"),VaccineType.COVAXIN)).thenReturn(slotAvailability);
        mockMvc.perform(get("/api/v1/slots/available/sdfkjk@gmail.com/?date=2022-03-21&vaccineType=COVAXIN")).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(service,times(1)).getAvailbleSlots(any(),any(),any());
    }

    @Test
    public void testgetAllTimeSlot() throws Exception {
        List<SlotAvailability> list = Arrays.asList(slotAvailability);
        Mockito.when(service.getAllSlots("sdfkjk@gmail.com")).thenReturn(list);
        mockMvc.perform(get("/api/v1/slots/all/sdfkjk@gmail.com/?date=2022-03-21&vaccineType=COVAXIN")).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(service,times(1)).getAllSlots(any());
    }

    @Test
    public void testgetATimeSlot() throws Exception {
        Mockito.when(service.getAslot("1")).thenReturn(slotAvailability);
        mockMvc.perform(get("/api/v1/slots/1")).andExpect(status().isOk()).andDo(MockMvcResultHandlers.print());
        verify(service,times(1)).getAslot(any());
    }


    @Test
    public void deleteASlot()  {

        Mockito.when(service.deleteSlot("1")).thenReturn(true);
        assertEquals(true,service.deleteSlot("1"));
    }



    @Test
    public void updateASlot()  {
        Vaccine  vac = new Vaccine(VaccineType.COVAXIN,43,454.4);
        List<TimeSlot> timeSlotList = Arrays.asList(new TimeSlot("1",LocalTime.parse("12:23"),LocalTime.parse("18:23"), SlotStatus.AVAILABLE,"poonam"));
        Location loc = new Location("UP",null,null,null,"21 abc");
        SlotAvailability  slotAvailability1 = new SlotAvailability("2","esi","sdfkjk@gmail.com","8475984798574",LocalDate.parse("2022-03-21"),timeSlotList, vac,loc);
        TimeSlot timeSlot = new TimeSlot("1",LocalTime.parse("13:23"),LocalTime.parse("15:23"), SlotStatus.AVAILABLE,"poonam");
        Mockito.when(service.getAslot(timeSlot.getSlotId())).thenReturn(slotAvailability1);
        Mockito.when(service.updateSlot(timeSlot)).thenReturn(true);
        assertEquals(true,service.updateSlot(timeSlot));
    }

}



