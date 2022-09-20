package com.stackroute.repository;

import com.stackroute.model.VaccinationCenter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccineRepository extends MongoRepository <VaccinationCenter,String>
{

    VaccinationCenter findByCenterEmail(String centerEmail) ;



}
