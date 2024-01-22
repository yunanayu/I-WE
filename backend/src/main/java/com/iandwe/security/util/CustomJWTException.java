package com.iandwe.security.util;

public class CustomJWTException extends RuntimeException {

    public CustomJWTException(String msg) {
        super(msg);
    }
}