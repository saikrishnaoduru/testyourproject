package com.stackroute.repository.impl;

import com.mongodb.BasicDBObject;
import com.mongodb.client.result.UpdateResult;
import com.stackroute.enums.SlotStatus;
import com.stackroute.enums.VaccineType;
import com.stackroute.exceptions.InvalidSlotException;
import com.stackroute.exceptions.SlotNotExistException;
import com.stackroute.exceptions.SlotsNotFoundException;
import com.stackroute.model.SlotAvailability;
import com.stackroute.model.TimeSlot;
import com.stackroute.repository.SlotAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Repository for mananging slot Availability operations
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Repository
public class SlotAvailabilityRepositoryImpl implements SlotAvailabilityRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    /**
     * This function return the slotAvailability based on their status
     * @param centerEmailId
     * @param slotStatus
     * @return SlotAvailability
     */
    @Override
    public List<SlotAvailability> getSlotAvailablilityByStatus(String centerEmailId,SlotStatus slotStatus) {
        AggregationOperation match1 = Aggregation.match(Criteria.where("vaccinationCenterEmailId").is(centerEmailId));
        AggregationOperation match = Aggregation.match(Criteria.where("timeSlots.status").is(slotStatus));
        AggregationOperation unwind = Aggregation.unwind("timeSlots");
        AggregationOperation group = Aggregation.group("id")
                .first("vaccineCenterName").as("vaccineCenterName")
                .first("vaccinationCenterEmailId").as("vaccinationCenterEmailId")
                .first("vaccine").as("vaccine")
                .first("contactDetails").as("contactDetails")
                .first("date").as("date")
                .first("location").as("location")
                .push("timeSlots").as("timeSlots");
        List<AggregationOperation> operations = new ArrayList<>();
        operations.add(match1);
        operations.add(unwind);
        operations.add(match);
        operations.add(group);
        Aggregation aggregation = Aggregation.newAggregation(operations);
        List<SlotAvailability> results = mongoTemplate.aggregate(aggregation, SlotAvailability.class, SlotAvailability.class).getMappedResults();
        if(results.isEmpty()){
            throw new SlotsNotFoundException("Slots not found","NO slots found for given parameters");
        }
        return results;
    }

    /**
     * This function return a single slot
     * @param id
     * @return SlotAvailability
     */
    @Override
    public SlotAvailability getSlotById(String id) {
        Query query = new Query(Criteria.where("timeSlots.slotId").is(id));
        SlotAvailability slotAvailability = mongoTemplate.findOne(query, SlotAvailability.class);
        if (null != slotAvailability) {
            slotAvailability.setTimeSlots(slotAvailability.getTimeSlots().stream().filter(x -> x.getSlotId().equals(id)).collect(Collectors.toList()));
            return slotAvailability;
        }
        return null;
    }

    /**
     * This function update a single slot
     * @param timeSlot
     * @return SlotAvailability
     */
    @Override
    public boolean updateSlot(TimeSlot timeSlot) {
        Query query = new Query(Criteria.where("timeSlots.slotId").is(timeSlot.getSlotId()));
        Update update = new Update().set("timeSlots.$.startTime", timeSlot.getStartTime()).set("timeSlots.$.endTime", timeSlot.getEndTime()).set("timeSlots.$.status", timeSlot.getStatus()).set("timeSlots.$.vaccinatorName", timeSlot.getVaccinatorName());
        UpdateResult result =  mongoTemplate.updateFirst(query, update, SlotAvailability.class);
        if(result.getModifiedCount()<=0){
            throw new InvalidSlotException("Slot already updated","Invalid slot");
        }
        return true;
    }

    /**
     * This function updates the status of specific slot using slot id
     * @param slotId
     * @param slotStatus
     * @return Boolean
     */
    @Override
    public boolean updateSlotStatus(String slotId, SlotStatus slotStatus) {
        Query query = new Query(Criteria.where("timeSlots.slotId").is(slotId));
        Update update = new Update().set("timeSlots.$.status",slotStatus);
        UpdateResult result = mongoTemplate.updateFirst(query,update,SlotAvailability.class);
        if(result.getMatchedCount()<=0){
            throw  new SlotNotExistException("Slot not exist","provided slot id does not exist");
        }
        if(result.getModifiedCount()<=0){
            throw new InvalidSlotException("Invalid slot","Slot already"+slotStatus.toString());
        }
        return true;
    }


    /**
     * This function returns all slots for provided date
     * @param centerEmailId
     * @param date
     * @param vaccineType
     * @return SlotAvailability
     */
    @Override
    public SlotAvailability getSlotsForDate(String centerEmailId, LocalDate date, VaccineType vaccineType) {
        Query query = new Query(Criteria.where("vaccinationCenterEmailId").is(centerEmailId).and("date").is(date).and("vaccine.vaccineType").is(vaccineType));
        return mongoTemplate.findOne(query, SlotAvailability.class);
    }

    /**
     * This function deletes a specific slot using id and return the updateResult object
     * @param slotId
     * @return UpdateResult
     */
    @Override
    public boolean deleteAslot(String slotId) {
        Update update = new Update().pull("timeSlots", new BasicDBObject("slotId", slotId));
        UpdateResult result = mongoTemplate.updateMulti(new Query(), update, SlotAvailability.class);
        if(result.getMatchedCount()<=0){
            throw  new SlotNotExistException("Slot not exist","provided slot id does not exist");
        }
        if(result.getModifiedCount()<=0){
            throw new InvalidSlotException("Invalid slot","Slot is Invalid");
        }
        return true;
    }

    /**
     * This function return the SlotAvailability using SlotId
     * @param slotId
     * @return SlotAvailability
     */
    @Override
    public SlotAvailability getTimeSlotBySlotId(String slotId) {
        Query query = new Query(Criteria.where("timeSlots.slotId").is(slotId));
        return mongoTemplate.findOne(query, SlotAvailability.class);
    }

    /**
     * This function adds a slot to the slotAvailability and return the UpdateResult
     * @param SlotAvailabilityId
     * @param timeSlot
     * @return
     */
    @Override
    public  boolean addAslot(String SlotAvailabilityId,TimeSlot timeSlot){
        Query query = new Query(Criteria.where("id").is(SlotAvailabilityId));
        Update update = new Update().push("timeSlots",timeSlot);
        UpdateResult result = mongoTemplate.updateFirst(query,update,SlotAvailability.class);
        if(result.getMatchedCount()<=0){
            throw  new SlotNotExistException("Slot not exist","provided id does not exist");
        }
        if(result.getModifiedCount()<=0){
            throw new InvalidSlotException("Invalid slot","Invalid slot found");
        }
        return true;
    }
    @Override
    public SlotAvailability getSlotsBYstatusAndDate(String centerEmailId, LocalDate date, SlotStatus slotStatus, VaccineType vaccineType) {
        System.out.println(date.toString());
        AggregationOperation match1 = Aggregation.match(Criteria.where("vaccinationCenterEmailId").is(centerEmailId).and("date").is(date).and("vaccine.vaccineType").is(vaccineType));
        AggregationOperation match = Aggregation.match(Criteria.where("timeSlots.status").is(slotStatus));
        AggregationOperation unwind = Aggregation.unwind("timeSlots");
        AggregationOperation group = Aggregation.group("id")
                .first("vaccineCenterName").as("vaccineCenterName")
                .first("vaccinationCenterEmailId").as("vaccinationCenterEmailId")
                .first("vaccine").as("vaccine")
                .first("contactDetails").as("contactDetails")
                .first("date").as("date")
                .first("location").as("location")
                .push("timeSlots").as("timeSlots");
        List<AggregationOperation> operations = new ArrayList<>();
        operations.add(match1);
        operations.add(unwind);
        operations.add(match);
        operations.add(group);
        Aggregation aggregation = Aggregation.newAggregation(operations);
        List<SlotAvailability> results = mongoTemplate.aggregate(aggregation, SlotAvailability.class, SlotAvailability.class).getMappedResults();
        if(results.isEmpty()){
            throw new SlotsNotFoundException("Slots not found","NO slots found for given parameters");
        }
        return results.get(0);
    }

    @Override
    public List<SlotAvailability> getSlotsBystatusforDate(String centerEmailId, LocalDate date, SlotStatus slotStatus) {
        AggregationOperation match1 = Aggregation.match(Criteria.where("vaccinationCenterEmailId").is(centerEmailId).and("date").is(date));
        AggregationOperation match = Aggregation.match(Criteria.where("timeSlots.status").is(slotStatus));
        AggregationOperation unwind = Aggregation.unwind("timeSlots");
        AggregationOperation group = Aggregation.group("id")
                .first("vaccineCenterName").as("vaccineCenterName")
                .first("vaccinationCenterEmailId").as("vaccinationCenterEmailId")
                .first("vaccine").as("vaccine")
                .first("contactDetails").as("contactDetails")
                .first("date").as("date")
                .first("location").as("location")
                .push("timeSlots").as("timeSlots");
        List<AggregationOperation> operations = new ArrayList<>();
        operations.add(match1);
        operations.add(unwind);
        operations.add(match);
        operations.add(group);
        Aggregation aggregation = Aggregation.newAggregation(operations);
        List<SlotAvailability> results = mongoTemplate.aggregate(aggregation, SlotAvailability.class, SlotAvailability.class).getMappedResults();
        if(results.isEmpty()){
            throw new SlotsNotFoundException("Slots not found","NO slots found for given parameters");
        }
        return results;
    }

    @Override
    public List<SlotAvailability> getTimeSlotsByStatusAndCenterEmailId(String centerEmailId,SlotStatus status){
        AggregationOperation match1 = Aggregation.match(Criteria.where("vaccinationCenterEmailId").is(centerEmailId));
        AggregationOperation match = Aggregation.match(Criteria.where("timeSlots.status").is(status));
        AggregationOperation unwind = Aggregation.unwind("timeSlots");
        AggregationOperation group = Aggregation.group("id")
                .first("vaccineCenterName").as("vaccineCenterName")
                .first("vaccinationCenterEmailId").as("vaccinationCenterEmailId")
                .first("vaccine").as("vaccine")
                .first("contactDetails").as("contactDetails")
                .first("date").as("date")
                .first("location").as("location")
                .push("timeSlots").as("timeSlots");
        List<AggregationOperation> operations = new ArrayList<>();
        operations.add(match1);
        operations.add(unwind);
        operations.add(match);
        operations.add(group);
        Aggregation aggregation = Aggregation.newAggregation(operations);
        List<SlotAvailability> results = mongoTemplate.aggregate(aggregation, SlotAvailability.class, SlotAvailability.class).getMappedResults();
        if(results.isEmpty()){
            throw new SlotsNotFoundException("Slots not found","NO slots found for given parameters");
        }
        return results;
    }
}
