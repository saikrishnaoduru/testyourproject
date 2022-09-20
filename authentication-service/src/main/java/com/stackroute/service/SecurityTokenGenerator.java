package com.stackroute.service;

import com.stackroute.domain.User;


import java.util.Map;

public interface SecurityTokenGenerator {

    Map<String,String> generateToken(User user);
}
