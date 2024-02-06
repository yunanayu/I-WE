package com.iandwe.common.advice;

import com.iandwe.baby.exception.NoBabyExistException;
import com.iandwe.checker.exception.NoCheckerExistException;
import com.iandwe.common.advice.response.ExceptionResponse;
import com.iandwe.essential.exception.NoEssentialExistException;
import com.iandwe.essential.exception.NotSupportSuchTypeException;
import com.iandwe.family.exception.NoFamilyExistException;
import com.iandwe.info.exception.NoInfoExistException;
import com.iandwe.member.exception.NoMemberExistException;
import com.iandwe.record.exception.NoHospitalExistException;
import com.iandwe.record.exception.NoRecordExistException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class ExceptionController extends ResponseEntityExceptionHandler {

    /** BABY EXCEPTION */
    @ExceptionHandler(NoBabyExistException.class)
    public ResponseEntity<ExceptionResponse> handleNoSuchPostExist(NoBabyExistException e){
        return new ResponseEntity<>(ExceptionResponse.from(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    /** CHECKER EXCEPTION */
    @ExceptionHandler(NoCheckerExistException.class)
    public ResponseEntity<ExceptionResponse> handleNoCheckerExist(NoCheckerExistException e){
        return new ResponseEntity<>(ExceptionResponse.from(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    /** ESSENTIAL EXCEPTION */
    @ExceptionHandler(NoEssentialExistException.class)
    public ResponseEntity<ExceptionResponse> handleNoEssentialExist(NoEssentialExistException e){
        return new ResponseEntity<>(ExceptionResponse.from(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotSupportSuchTypeException.class)
    public ResponseEntity<ExceptionResponse> handleNotSupportSuchType(NotSupportSuchTypeException e){
        return new ResponseEntity<>(ExceptionResponse.from(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    /** FAMILY EXCEPTION */
    @ExceptionHandler(NoFamilyExistException.class)
    public ResponseEntity<ExceptionResponse> handleNoFamilyExist(NoFamilyExistException e){
        return new ResponseEntity<>(ExceptionResponse.from(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    /** INFO EXCEPTION */
    @ExceptionHandler(NoInfoExistException.class)
    public ResponseEntity<ExceptionResponse> handleNoInfoExist(NoInfoExistException e){
        return new ResponseEntity<>(ExceptionResponse.from(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    /** INFO EXCEPTION */
    @ExceptionHandler(NoMemberExistException.class)
    public ResponseEntity<ExceptionResponse> handleNoMemberExist(NoMemberExistException e){
        return new ResponseEntity<>(ExceptionResponse.from(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    /** RECORD EXCEPTION */
    @ExceptionHandler(NoHospitalExistException.class)
    public ResponseEntity<ExceptionResponse> handleNoHospitalExist(NoHospitalExistException e){
        return new ResponseEntity<>(ExceptionResponse.from(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoRecordExistException.class)
    public ResponseEntity<ExceptionResponse> handleNoRecordExist(NoRecordExistException e){
        return new ResponseEntity<>(ExceptionResponse.from(e.getMessage()), HttpStatus.NOT_FOUND);
    }

}
