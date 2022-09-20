package com.stackroute.controller;


import com.stackroute.model.VaccinationCenter;
import com.stackroute.service.VaccinationService;
import io.swagger.annotations.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/vaccination-center")
public class VaccinationCenterController {


    @Autowired
    private VaccinationService vaccinationService;

    private ApiResponse deletecenterId;

    @PostMapping("/addVaccineCenter")
    public ResponseEntity<VaccinationCenter> addVaccinationCenter(@RequestBody VaccinationCenter vaccinationCenter) {
        VaccinationCenter addVaccinationCenterDto = vaccinationService.addVaccinationCenter(vaccinationCenter);
        return new ResponseEntity<>(addVaccinationCenterDto, HttpStatus.CREATED);

    }


    @GetMapping("/getAllVaccinationCenter")
    public ResponseEntity<List<VaccinationCenter>> getAllVaccinationCenter() {
        List<VaccinationCenter> allVaccinationCenter = this.vaccinationService.getAllVaccinationCenter();
        return new ResponseEntity<>(allVaccinationCenter, HttpStatus.OK);
    }


    @PutMapping("/{centerId}")
    public ResponseEntity<VaccinationCenter> updateVaccinationCenter(@RequestBody VaccinationCenter vaccinationCenter, @PathVariable String centerId) {
        VaccinationCenter updateVaccinationCenter = this.vaccinationService.updateVaccinationCenter(vaccinationCenter, centerId);
        return new ResponseEntity<>(updateVaccinationCenter, HttpStatus.OK);

    }
    @DeleteMapping("/{centerId}")
    public ResponseEntity<ApiResponse> deleteVaccinationCenter(@PathVariable String centerId) {
        vaccinationService.deleteVaccinationCenter(centerId);
        return new ResponseEntity<ApiResponse>(deletecenterId, HttpStatus.OK);
    }





    @GetMapping("/{centerEmail}")
    public ResponseEntity<VaccinationCenter> getVaccinationCenterByEmail(@PathVariable("centerEmail") String centerEmail) {
        VaccinationCenter CenterEmail = vaccinationService.getVaccinationCenterByEmail(centerEmail);
        return new ResponseEntity<>(CenterEmail, HttpStatus.OK);
    }

    @GetMapping("/specific/{email}")
    public ResponseEntity<List<VaccinationCenter>> getspecificVaccinationCenter(@PathVariable("email") String email){
        VaccinationCenter CenterEmail = vaccinationService.getVaccinationCenterByEmail(email);
        return new ResponseEntity<>(Arrays.asList(CenterEmail),HttpStatus.OK);
    }

}










