package com.stackroute.exceptions;

import lombok.Data;

/**
 * Exception class to manage slot booking related exceptions
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
public class SlotAlreadyBookedException extends RuntimeException{

    private String message;
    private String error;


    public  SlotAlreadyBookedException(String message,String error) {
        this.message = message;
        this.error = error;
    }
}
