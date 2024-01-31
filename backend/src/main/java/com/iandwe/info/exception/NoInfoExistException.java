package com.iandwe.info.exception;

public class NoInfoExistException extends RuntimeException {

    private static final String MESSAGE = "[ERROR] 정보가 존재하지 않습니다.";

    public NoInfoExistException() {
        super(MESSAGE);
    }
}

