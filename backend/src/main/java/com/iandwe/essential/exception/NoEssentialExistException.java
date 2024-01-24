package com.iandwe.essential.exception;

public class NoEssentialExistException extends RuntimeException {
    private static final String MESSAGE = "[ERROR] 해당 필수 검진은 존재하지 않습니다.";

    public NoEssentialExistException() {
        super(MESSAGE);
    }
}
