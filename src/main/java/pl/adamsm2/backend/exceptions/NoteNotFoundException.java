package pl.adamsm2.backend.exceptions;

public class NoteNotFoundException extends RuntimeException {

    public NoteNotFoundException(Long id) {
        super("Note with id " + id + " not found");
    }
}
