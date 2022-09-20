package com.stackroute.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.EXPECTATION_FAILED,reason = "ID is Incorrect")
public class SlotNotFound extends Exception{
}
