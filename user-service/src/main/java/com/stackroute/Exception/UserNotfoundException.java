package com.stackroute.Exception;


import lombok.Data;

@Data
public class UserNotfoundException extends RuntimeException {



        private String message;
        private String error;



        public UserNotfoundException(String message, String error) {
            this.message = message;
            this.error = error;
        }

    public UserNotfoundException() {

    }
}




