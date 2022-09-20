package com.stackroute.Exception;



import lombok.Data;




@Data
public class InvaliduserException extends RuntimeException {

    private String message;
    private String error;


    public  InvaliduserException(String message,String error) {
        this.message = message;
        this.error = error;

    }


}








