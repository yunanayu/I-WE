package com.iandwe.family.exception;

public class NoFamilyExistException extends RuntimeException{

    private static final String MESSAGE = "[ERROR] 잘못된 공유 코드거나 잘못된 회원 번호 요청입니다.";

    public NoFamilyExistException(){
        super(MESSAGE);
    }
}
