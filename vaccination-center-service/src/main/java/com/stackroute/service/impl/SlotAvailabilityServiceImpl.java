package com.stackroute.service.impl;

import com.stackroute.dto.MonthlyStats;
import com.stackroute.dto.Statics;
import com.stackroute.dto.VaccineDto;
import com.stackroute.enums.SlotStatus;
import com.stackroute.enums.VaccineType;
import com.stackroute.exceptions.InvalidSlotException;
import com.stackroute.exceptions.SlotNotExistException;
import com.stackroute.exceptions.SlotsNotFoundException;
import com.stackroute.model.SlotAvailability;
import com.stackroute.model.TimeSlot;
import com.stackroute.repository.SlotAvailabilityRepository;
import com.stackroute.repository.SlotMongoRepository;
import com.stackroute.service.SlotAvailabilityService;
import com.stackroute.utils.StatsComparator;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

/**
 * Service for mananging slot Availability operations
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
@Service
public class SlotAvailabilityServiceImpl implements SlotAvailabilityService {

    @Autowired
    SlotMongoRepository slotRepository;

    @Autowired
    SlotAvailabilityRepository slotAvailabilityRepository;

    /**
     * This function return all available slots
     * @param centerEmailId
     * @param date
     * @param vaccineType
     * @return SlotAvailability
     */
    @Override
    public SlotAvailability getAvailbleSlots(String centerEmailId, LocalDate date, VaccineType vaccineType) {
        Optional<SlotAvailability> slotAvailability = Optional.of(slotAvailabilityRepository.getSlotsBYstatusAndDate(centerEmailId, date, SlotStatus.AVAILABLE,vaccineType));
        if(slotAvailability.isEmpty()){
            throw new SlotsNotFoundException("Slots not found","Slots not found for provided arguments");
        }
        return  slotAvailability.get();
    }
    /**
     * This function return all booked slots
     * @param centerEmailId
     * @return SlotAvailability
     */
    @Override
    public List<SlotAvailability> getBookedSlots(String centerEmailId) {
        List<SlotAvailability> slotAvailability = slotAvailabilityRepository.getTimeSlotsByStatusAndCenterEmailId(centerEmailId,SlotStatus.BOOKED);
        if(null == slotAvailability | slotAvailability.isEmpty()) {
            throw new SlotsNotFoundException("Slots not found","Slots not found for provided arguments");
        }
        return  slotAvailability;
    }

    /**
     * This function return all the slots
     * @param centerEmailId
     * @return SlotAvailability
     */
    @Override
    public List<SlotAvailability> getAllSlots(String centerEmailId) {
        List<SlotAvailability> slotAvailability = slotRepository.getByVaccinationCenterEmailId(centerEmailId);
        if(null == slotAvailability) {
            throw new SlotsNotFoundException("Slots not found" +
                    "","Slots not found for provided arguments");
        }
        return  slotAvailability;
    }

    /**
     * This function returns single Slot
     * @param slotId
     * @return
     */
    @Override
    public SlotAvailability getAslot(String slotId) {
        SlotAvailability slotAvailability = slotAvailabilityRepository.getSlotById(slotId);
        if (null == slotAvailability) {
            throw new SlotNotExistException("Slot not exist","No slot found for provided slotId");
        }
        return slotAvailability;
    }

    /**
     * This function delete a slot
     * @param slotId
     * @return Boolean
     */
    @Override
    public boolean deleteSlot(String slotId) {
        return slotAvailabilityRepository.deleteAslot(slotId);
    }

    /**
     * This function updates the status of the slot
     * @param slotId
     * @param slotStatus
     * @return
     */
    @Override
    public boolean updateSlotStatus(String slotId, SlotStatus slotStatus) {
        return slotAvailabilityRepository.updateSlotStatus(slotId,slotStatus);
    }

    /**
     * this function create the SlotAvailability
     * @param slotAvailability
     * @return SlotAvailability
     */
    @Override
    public SlotAvailability addSlotAvailability(SlotAvailability slotAvailability){
        nullCheckSlotAvailability(slotAvailability);
        slotAvailability.getTimeSlots().forEach(x -> x.setSlotId("syv" + UUID.randomUUID().toString().replaceAll("-", "").substring(0, 13)));
        SlotAvailability slotAvailability1 =   slotAvailabilityRepository.getSlotsForDate(slotAvailability.getVaccinationCenterEmailId(),slotAvailability.getDate(),slotAvailability.getVaccine().getVaccineType());
        if(null != slotAvailability1){
            for(TimeSlot timeSlot : slotAvailability.getTimeSlots()){
                validateTimeSlot(timeSlot,slotAvailability1.getTimeSlots());
                slotAvailability1.getTimeSlots().add(timeSlot);
            }
            return slotRepository.save(slotAvailability1);
        } else{
            return slotRepository.save(slotAvailability);
        }

    }

    /**
     * This function updates the slot
     * @param timeSlot
     * @return Boolean
     */
    @Override
    public boolean updateSlot(TimeSlot timeSlot) {
        if(StringUtils.isBlank(timeSlot.getSlotId())){
            throw new InvalidSlotException("Please provide vaccination center email id","vaccination center email id not found");
        }
        checkNotnullTimeSlot(timeSlot);
        SlotAvailability slotAvailability = slotAvailabilityRepository.getTimeSlotBySlotId(timeSlot.getSlotId());
        if(null == slotAvailability){
            throw new SlotNotExistException("Provided slot does not exist","Slot not exist");
        }
        validateTimeSlot(timeSlot,slotAvailability.getTimeSlots());
        return slotAvailabilityRepository.updateSlot(timeSlot);
    }



    /**
     * This function velidate the slot and pass it to SlotAvailability Repository to save in the slotAvailability
     * @param slotAvailanilityId
     * @param timeSlot
     * @return
     */
    @Override
    public boolean addASlot(String slotAvailanilityId, TimeSlot timeSlot) {
        checkNotnullTimeSlot(timeSlot); // Check any of timeSlot property is not null
        Optional<SlotAvailability> slotAvailability = slotRepository.findById(slotAvailanilityId); // checks if is present in db or not
        if(slotAvailability.isEmpty()){
            throw  new SlotNotExistException("NO slots found for provided id","Slot not exist");
        }
        validateTimeSlot(timeSlot,slotAvailability.get().getTimeSlots()); // validating the time slot with already present timeSlots
        timeSlot.setSlotId("syv" + UUID.randomUUID().toString().replaceAll("-", "").substring(0, 13));
        return slotAvailabilityRepository.addAslot(slotAvailanilityId,timeSlot);
    }

    /**
     * This function takes SlotAvailability object and check and insures every property has value
     * @param slotAvailability
     */
    private  void nullCheckSlotAvailability(SlotAvailability slotAvailability){
        if(StringUtils.isBlank(slotAvailability.getVaccinationCenterEmailId())){
            throw  new InvalidSlotException("Please provide vaccination center email id","vaccination center email not provided");
        }
        if(StringUtils.isBlank(slotAvailability.getVaccineCenterName())){
            throw  new InvalidSlotException("Please provide vaccination name","vaccination center name not provided");
        }if(null == slotAvailability.getDate()){
            throw  new InvalidSlotException("Please provide vaccination date","vaccination date not provided");
        }if(null == slotAvailability.getTimeSlots()){
            throw  new InvalidSlotException("Please provide time slots","time slots not provided");
        }else {
            for(TimeSlot slot : slotAvailability.getTimeSlots()){
                checkNotnullTimeSlot(slot);
            }
        }if(null == slotAvailability.getVaccine()){
            throw  new InvalidSlotException("Please provide vaccine details","vaccine details not provided");
        }else {
            if(null == slotAvailability.getVaccine().getVaccineType()){
                throw  new InvalidSlotException("Please provide vaccine type","vaccine type not provided");
            }
        }if(null == slotAvailability.getLocation()){
            throw new InvalidSlotException("Please provide vaccination center addresss","Address not found");
        }else {
            if(StringUtils.isBlank(slotAvailability.getLocation().getAddress())){
                throw  new InvalidSlotException("Please provide address","Address not found");
            }
            if(StringUtils.isBlank(slotAvailability.getLocation().getCountry())){
                throw  new InvalidSlotException("Please provide address country","Country not found");
            }
            if(StringUtils.isBlank(slotAvailability.getLocation().getCity())){
                throw  new InvalidSlotException("Please provide address city","city not found");
            }
            if(StringUtils.isBlank(slotAvailability.getLocation().getPinCode())){
                throw  new InvalidSlotException("Please provide address pincode","pincode not found");
            }
        }
    }

    /**
     * This function takes TimeSlot object and check and insures every property has value;
     * @param timeSlot
     */
    private void checkNotnullTimeSlot(TimeSlot timeSlot){
        if(null == timeSlot.getStartTime()){
            throw  new InvalidSlotException("Please provide timeslot start time","Time slot start date not provided");
        }if(null == timeSlot.getEndTime()){
            throw  new InvalidSlotException("Please provide timeslot end time","Time slot end date not provided");
        }if(null == timeSlot.getStatus()){
            throw  new InvalidSlotException("Please provide timeslot status","Time slot status not provided");
        }if(StringUtils.isBlank(timeSlot.getVaccinatorName())){
            throw  new InvalidSlotException("Please provide timeslot vaccinator name","Time slot vaccinator name not provided");
        }
    }
    /**
     * This function compare and validates the timeSlot with the provided timeSlots list
     * @param timeSlot
     * @param timeSlotList
     * @return
     */
    private Boolean validateTimeSlot(TimeSlot timeSlot, List<TimeSlot> timeSlotList) {
        if(timeSlot.getStartTime().isAfter(timeSlot.getEndTime()) || timeSlot.getStartTime().equals(timeSlot.getEndTime())){
            throw new InvalidSlotException("Provided Slot is not valid","Invalid slot found for "+timeSlot.getVaccinatorName());
        }
        for (TimeSlot slot : timeSlotList) {
            if (!slot.getSlotId().equals(timeSlot.getSlotId()) && slot.getVaccinatorName().equalsIgnoreCase(timeSlot.getVaccinatorName())) {
                if (timeSlot.getStartTime().isBefore(slot.getStartTime()) && timeSlot.getEndTime().isBefore(slot.getStartTime())) {
                   System.out.println("fine");
                } else {
                    if (timeSlot.getStartTime().isAfter(slot.getEndTime()) && timeSlot.getEndTime().isAfter(slot.getEndTime())) {
                        System.out.println("fine");
                    } else {
                        throw new InvalidSlotException("Provided Slot is not valid","Invalid slot found for "+timeSlot.getVaccinatorName());
                    }
                }
            }
        }
        return true;
    }
    @Override
    public List<SlotAvailability> getAllAvailableSlotSByEmailId(String emailId){
        List<SlotAvailability> slotAvailabilities = slotAvailabilityRepository.getSlotAvailablilityByStatus(emailId,SlotStatus.AVAILABLE);
        return slotAvailabilities;
    }

    @Override
    public List<VaccineDto> getAvailableSlotsCountForCenter(String emailId,LocalDate date){
        List<SlotAvailability> slotAvailabilities = slotAvailabilityRepository.getSlotsBystatusforDate(emailId,date,SlotStatus.AVAILABLE);
        List<VaccineDto> vaccineDtos = new ArrayList<>();
        for(SlotAvailability slot : slotAvailabilities){
            VaccineDto vaccineDto = new VaccineDto();
            vaccineDto.setVaccineType(slot.getVaccine().getVaccineType());
            vaccineDto.setPrice(slot.getVaccine().getPrice());
            vaccineDto.setAvailableSlots(slot.getTimeSlots().size());
            vaccineDtos.add(vaccineDto);
        }
        return vaccineDtos;
    }

    @Override
    public  Map<VaccineType,Statics> test1(String emailId) {
        List<SlotAvailability> slotAvailabilities = slotAvailabilityRepository.getTimeSlotsByStatusAndCenterEmailId(emailId,SlotStatus.EXPIRED);
        Map<VaccineType, Statics> staticsMap = new HashMap<>();
        for (SlotAvailability slotAvailability : slotAvailabilities) {
            int slotSize = slotAvailability.getTimeSlots().size();
            int month = slotAvailability.getDate().getMonth().getValue();
            int year = slotAvailability.getDate().getYear();
            MonthlyStats monthlyStats = new MonthlyStats();
            monthlyStats.setMonth(month);
            monthlyStats.setYear(year);
            monthlyStats.setTotalVaccinationDone(slotSize);
            Statics statics = staticsMap.get(slotAvailability.getVaccine().getVaccineType());
            if(null != statics) {
                boolean status = false;
                for (MonthlyStats stat : statics.getMonthlyStats()) {
                    if (stat.getYear() == year && stat.getMonth() == month) {
                        stat.setTotalVaccinationDone(stat.getTotalVaccinationDone() + slotSize);
                        statics.setTotal(statics.getTotal()+slotSize);
                        status = true;
                    }
                }if(!status) {
                    staticsMap.get(slotAvailability.getVaccine().getVaccineType()).getMonthlyStats().add(monthlyStats);
                    statics.setTotal(statics.getTotal()+slotSize);
                }

            }else {
                Statics refStat = new Statics();
                refStat.setMonthlyStats(new TreeSet<>(new StatsComparator()));
                refStat.getMonthlyStats().add(monthlyStats);
                refStat.setTotal(refStat.getTotal()+slotSize);
                staticsMap.put(slotAvailability.getVaccine().getVaccineType(),refStat);
            }
        }
        return staticsMap;

}
}
