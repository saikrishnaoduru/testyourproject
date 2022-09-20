package com.stackroute.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

/**
 * Custom response entity for sending response with the message and status
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
@AllArgsConstructor
public class CustomResponseEntity<T> {

    private HttpStatus message_type;
    private String message;
    private T result;

}