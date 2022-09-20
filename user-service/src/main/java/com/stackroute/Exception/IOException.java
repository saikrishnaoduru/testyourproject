package com.stackroute.Exception;

public class IOException extends RuntimeException{


    String resourceName;
    String fieldName;
    long fieldValue;


    public IOException(String resourceName, String fieldName, long fieldValue) {
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }


}
