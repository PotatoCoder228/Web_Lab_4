package ru.itmo.potatocoder228.lab4.web_lab_4.exceptions;

public class RegistrationException extends RuntimeException{
    String message;
    public RegistrationException(String err){
        super(err);
        message = err;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
