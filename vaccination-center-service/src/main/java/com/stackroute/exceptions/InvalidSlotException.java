package com.stackroute.exceptions;


import lombok.Data;

/**
 * Exception class for manage Invalid slots
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
public class InvalidSlotException extends RuntimeException {

    private String message;
    private String error;

    public  InvalidSlotException(String message,String error) {
        this.message = message;
        this.error = error;

    }


}
