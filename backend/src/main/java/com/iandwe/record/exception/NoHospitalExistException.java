package com.iandwe.record.exception;

public class NoHospitalExistException extends RuntimeException {

    private static final String MESSAGE = "[ERROR] 병원기록이 존재하지 않습니다.";

    public NoHospitalExistException() {
        super(MESSAGE);
    }
}
