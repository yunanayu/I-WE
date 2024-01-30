package com.iandwe.member.exception;

public class NoMemberExistException extends RuntimeException {

    private static final String MESSAGE = "[ERROR] 해당 Member 는 존재하지 않습니다.";

    public NoMemberExistException() {
        super(MESSAGE);
    }
}
