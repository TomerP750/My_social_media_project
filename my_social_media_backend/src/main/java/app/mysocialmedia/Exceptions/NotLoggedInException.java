package app.mysocialmedia.Exceptions;

public class NotLoggedInException extends RuntimeException {
    public NotLoggedInException(String message) {
        super(message);
    }
}
