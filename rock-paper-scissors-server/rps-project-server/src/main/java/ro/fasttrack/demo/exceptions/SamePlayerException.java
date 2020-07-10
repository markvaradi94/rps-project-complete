package ro.fasttrack.demo.exceptions;

public class SamePlayerException extends RuntimeException {
    public SamePlayerException(String message) {
        super(message);
    }
}
