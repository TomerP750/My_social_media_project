package app.mysocialmedia.Handler;

import app.mysocialmedia.Exceptions.ExistsException;
import app.mysocialmedia.Exceptions.InvalidInputException;
import app.mysocialmedia.Exceptions.NotLoggedInException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class Handler {

    @ExceptionHandler(ExistsException.class)
    public ResponseEntity<String>handleInvalidInputException(ExistsException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<String>handleInvalidInputException(InvalidInputException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(NotLoggedInException.class)
    public ResponseEntity<String>handleInvalidInputException(NotLoggedInException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
