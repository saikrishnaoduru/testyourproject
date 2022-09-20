package com.stackroute.utils;

import com.stackroute.dto.MonthlyStats;

import java.util.Comparator;

public class StatsComparator implements Comparator<MonthlyStats> {
    @Override
    public int compare(MonthlyStats statics, MonthlyStats t1) {
        if(statics.getYear()==t1.getYear()){
            return statics.getMonth()-t1.getMonth();
        } else {
            return statics.getYear()-t1.getYear();
        }
    }
}
