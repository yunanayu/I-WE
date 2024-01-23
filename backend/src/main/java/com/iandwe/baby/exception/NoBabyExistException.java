package com.iandwe.baby.exception;

public class NoBabyExistException extends RuntimeException{

    private static final String MESSAGE = "[ERROR] 아기가 존재하지 않습니다.";

    public NoBabyExistException(){
        super(MESSAGE);
    }

}
