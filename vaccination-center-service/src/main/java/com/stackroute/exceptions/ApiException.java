package com.stackroute.exceptions;

import com.stackroute.enums.ResponseStatus;
import lombok.Data;
import org.springframework.http.HttpStatus;
import java.util.Arrays;
import java.util.List;

/**
 * Model for send response when exception accurs
 *
 * @author Jitender <Jitender.1@globallogic.com>
 */
@Data
public class ApiException {

    private HttpStatus status;
    private String message;

    private final ResponseStatus message_type = ResponseStatus.ERROR ;
    private List<String> errors;

    public ApiException(HttpStatus status,String message, List<String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public ApiException(HttpStatus status,String message, String errors) {
        this.status = status;
        this.message = message;
        this.errors = Arrays.asList(errors);
    }
}
