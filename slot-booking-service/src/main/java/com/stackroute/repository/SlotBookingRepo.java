package com.stackroute.repository;

import com.stackroute.model.SlotBooking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SlotBookingRepo extends MongoRepository<SlotBooking, String> {


    SlotBooking findByUserEmail(String email);

    List<SlotBooking> findByVaccinationCenterEmailId(String email);


}
