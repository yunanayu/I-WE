package com.iandwe.record.exception;

public class NoRecordExistException extends RuntimeException {

    private static final String MESSAGE = "[ERROR] 기록이 존재하지 않습니다.";

    public NoRecordExistException() {
        super(MESSAGE);
    }
}
