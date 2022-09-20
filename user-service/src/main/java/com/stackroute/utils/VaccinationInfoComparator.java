package com.stackroute.utils;

import com.stackroute.model.UserVaccinationInfo;

import java.util.Comparator;

public class VaccinationInfoComparator implements Comparator<UserVaccinationInfo> {


    @Override
    public int compare(UserVaccinationInfo o1, UserVaccinationInfo o2) {

    return o1.getDose()- o2.getDose();
    }
}
