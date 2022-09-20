package com.stackroute.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Statics {
    private int total;
    private Set<MonthlyStats> monthlyStats;
}
