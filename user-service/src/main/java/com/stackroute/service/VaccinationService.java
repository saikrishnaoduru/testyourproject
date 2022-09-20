package com.stackroute.service;

import com.stackroute.model.VaccinationCenter;

import java.util.List;

public interface VaccinationService {


    VaccinationCenter addVaccinationCenter(VaccinationCenter vaccinationCenter);

    List<VaccinationCenter> getAllVaccinationCenter();



    VaccinationCenter updateVaccinationCenter(VaccinationCenter vaccinationCenter, String centerId);


    void deleteVaccinationCenter(String centerId);






    VaccinationCenter getVaccinationCenterByEmail(String centerEmailId);
}

//    VaccinationCenter getVaccinationCenterByCenterEmail(String centerEmail);
//}
