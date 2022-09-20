package com.stackroute.exceptions;


import lombok.Data;

/**
 * Exception class to manage slot not found Exception
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
public class SlotNotExistException extends RuntimeException{

    private String message;
    private String error;

  public  SlotNotExistException(String message,String error) {
      this.message = message;
      this.error = error;
    }

}
