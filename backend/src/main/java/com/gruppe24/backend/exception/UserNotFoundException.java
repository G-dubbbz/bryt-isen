package com.gruppe24.backend.exception;

import com.gruppe24.backend.relation.MadeGame;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(String txt) {
        super(txt);
    }
    public UserNotFoundException() {
        throw new UserNotFoundException("User not found.");
    }

}

