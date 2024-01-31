package com.iandwe.security.exception;

public class JwtException extends RuntimeException{
    public JwtException(String msg) {
        super(msg);
    }
}
