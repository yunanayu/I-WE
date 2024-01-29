package com.iandwe.checker.exception;

public class NoCheckerExistException extends RuntimeException {

    private static final String MESSAGE = "[ERROR] 해당 target 의 num 또는 essential 의 num 이 존재하지 않거나 올바르지 않습니다.";

    public NoCheckerExistException() {
        super(MESSAGE);
    }
}
