package com.stackroute.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.EXPECTATION_FAILED,reason= "User not found")
public class UserNotFound extends Exception{

    }

