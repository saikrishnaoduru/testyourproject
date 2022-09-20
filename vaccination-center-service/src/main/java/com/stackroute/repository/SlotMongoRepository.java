package com.stackroute.repository;

import com.stackroute.model.SlotAvailability;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 *  This interface exteds the MongoRepository to do CRUD operation on the SlotAvailability Document.
 *
 *  @author Jitender <Jitender.1@globallogic.com>
 */
@Repository
public interface SlotMongoRepository extends MongoRepository<SlotAvailability,String> {

     List<SlotAvailability> getByVaccinationCenterEmailId(String email);


}
