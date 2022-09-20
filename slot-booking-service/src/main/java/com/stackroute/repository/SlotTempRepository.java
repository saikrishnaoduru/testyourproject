package com.stackroute.repository;

import com.mongodb.client.result.UpdateResult;
import com.stackroute.enums.Status;
import com.stackroute.exceptions.SlotNotFound;
import com.stackroute.model.SlotBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class SlotTempRepository {

    @Autowired
    MongoTemplate mongoTemplate;

   public boolean updateSlotStatus(String slotId, Status slotStatus) {
       Query query = new Query(Criteria.where("slot.slotId").is(slotId));
       Update update = new Update().set("slot.status",slotStatus);
       UpdateResult result = mongoTemplate.updateFirst(query,update, SlotBooking.class);
       if(result.getMatchedCount()<=0){
           return false;
       }
       return true;

    }
}
