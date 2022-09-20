package com.stackroute.service.impl;

import com.stackroute.config.Producer;
import com.stackroute.dto.UserDto;
import com.stackroute.enums.UserRole;
import com.stackroute.model.Address;
import com.stackroute.model.VaccinationCenter;
import com.stackroute.Exception.ResourceNotFoundException;
import com.stackroute.repository.VaccineRepository;
import com.stackroute.service.VaccinationService;
import org.glassfish.jaxb.runtime.v2.schemagen.xmlschema.Any;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class VaccinationServiceImpl implements VaccinationService {


    @Autowired
    private VaccineRepository vaccineRepository;

    @Autowired
    Producer producer;

    public String centerId;
    public String vaccinationCenterName;
    public Address address;
    public String contact;
    public Any proof;


    @Override
    public VaccinationCenter addVaccinationCenter(VaccinationCenter vaccinationCenter) {
        Address add = vaccinationCenter.getAddress();
        if(null != add){
            if(add.getAddrss().contains(" ")){
                int index = add.getAddrss().lastIndexOf(" ");
                add.setHouseNo(add.getAddrss().substring(0,index));
                add.setStreet(add.getAddrss().substring(index));
            }
            add.setHouseNo(add.getAddrss());
        }
        VaccinationCenter saveVaccinationCenter = vaccineRepository.save(vaccinationCenter);
        UserDto userDto = new UserDto();
        userDto.setUserRole(UserRole.CENTER);
        userDto.setUserEmailId(saveVaccinationCenter.getCenterEmail());
        userDto.setUserName(saveVaccinationCenter.getVaccinationCenterName());
        userDto.setPassword(vaccinationCenter.getPassword());
        producer.sendMessageToRabbitMq(userDto);
        return saveVaccinationCenter;

    }


    @Override
    public List<VaccinationCenter> getAllVaccinationCenter() {
        List<VaccinationCenter> vaccinationCenters = vaccineRepository.findAll();
        return vaccinationCenters;
    }


    @Override
    public VaccinationCenter updateVaccinationCenter(VaccinationCenter vaccinationCenterDto, String centerId) {
        Address add = vaccinationCenterDto.getAddress();
        if(null != add){
            if(add.getAddrss().contains(" ")){
                int index = add.getAddrss().lastIndexOf(" ");
                add.setHouseNo(add.getAddrss().substring(0,index));
                    add.setStreet(add.getAddrss().substring(index));
            }
            add.setHouseNo(add.getAddrss());
        }
        VaccinationCenter vaccinationCenter = vaccineRepository.findById(centerId).get();
        vaccinationCenter.setVaccinationCenterName(vaccinationCenterDto.getVaccinationCenterName());
        vaccinationCenter.setCenterId(vaccinationCenterDto.getCenterId());
        vaccinationCenter.setAddress(vaccinationCenterDto.getAddress());
        vaccinationCenter.setCenterEmail(vaccinationCenterDto.getCenterEmail());
        vaccinationCenter.setVaccinators(vaccinationCenterDto.getVaccinators());
        VaccinationCenter saveVaccinationCenter = vaccineRepository.save(vaccinationCenter);

        return saveVaccinationCenter;
    }


    @Override
    public void deleteVaccinationCenter(String centerId) {
        vaccineRepository.deleteById(centerId);


    }



    @Override
    public VaccinationCenter getVaccinationCenterByEmail(String CenterEmail){
        VaccinationCenter vaccinationCenter = vaccineRepository.findByCenterEmail(CenterEmail);
        if(null==vaccinationCenter)

            throw new ResourceNotFoundException("not found any class", "CenterEmail", 505);

        return vaccinationCenter;


    }
}







