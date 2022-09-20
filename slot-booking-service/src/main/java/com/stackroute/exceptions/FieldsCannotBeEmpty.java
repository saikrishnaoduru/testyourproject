package com.stackroute.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.EXPECTATION_FAILED,reason = "Fields cannot be empty")
public class FieldsCannotBeEmpty extends Exception{
}
