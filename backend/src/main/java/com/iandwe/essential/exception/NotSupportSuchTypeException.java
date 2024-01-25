package com.iandwe.essential.exception;

public class NotSupportSuchTypeException extends RuntimeException {

    private static final String MESSAGE = "[ERROR] 해당 Type의 검진, 검사, 접종 정보 조회는 지원하지 않습니다.";

    public NotSupportSuchTypeException() {
        super(MESSAGE);
    }

}
