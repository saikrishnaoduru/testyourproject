package com.stackroute.exceptions;

import lombok.Data;

/**
 * Exception class to accur when No slot found
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */

@Data
public class SlotsNotFoundException extends RuntimeException{
    private String message;
    private String error;

    public  SlotsNotFoundException(String message,String error) {
        this.message = message;
        this.error = error;
    }
}
