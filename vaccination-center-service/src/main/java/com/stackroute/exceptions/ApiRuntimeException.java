package com.stackroute.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.time.format.DateTimeParseException;

/**
 * Exception handler class for catching exceptions and send the error response to the api
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@RestControllerAdvice
public class ApiRuntimeException {

    @ExceptionHandler(InvalidSlotException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> processInvalidSlotException(InvalidSlotException e) {
        ApiException apiException = new ApiException(HttpStatus.BAD_REQUEST,e.getMessage(),e.getError());
        return new ResponseEntity<Object>(apiException, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(SlotAlreadyBookedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> processSlotBookedException(SlotAlreadyBookedException e) {
        ApiException apiException = new ApiException(HttpStatus.BAD_REQUEST,e.getMessage(),e.getError());
        return new ResponseEntity<Object>(apiException, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(SlotNotExistException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> processSlotNotExistException(SlotNotExistException e) {
        ApiException apiException = new ApiException(HttpStatus.BAD_REQUEST,e.getMessage(),e.getError());
        return new ResponseEntity<Object>(apiException, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(SlotsNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> processSlotsNotFoundException(SlotsNotFoundException e) {
        ApiException apiException = new ApiException(HttpStatus.BAD_REQUEST,e.getMessage(),e.getError());
        return new ResponseEntity<Object>(apiException, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> processMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        ApiException apiException = new ApiException(HttpStatus.BAD_REQUEST,e.getLocalizedMessage(),e.getMessage());
        return new ResponseEntity<Object>(apiException, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> processHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        ApiException apiException = new ApiException(HttpStatus.BAD_REQUEST,"Value not accepted",e.getMessage());
        return new ResponseEntity<Object>(apiException, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DateTimeParseException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Object> processDateTimeParseException(DateTimeParseException e) {
        ApiException apiException = new ApiException(HttpStatus.BAD_REQUEST,"Invalid date provided",e.getMessage());
        return new ResponseEntity<Object>(apiException, HttpStatus.BAD_REQUEST);
    }

}
