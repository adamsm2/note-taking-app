package pl.adamsm2.backend.mappers;

import org.springframework.stereotype.Component;
import pl.adamsm2.backend.dtos.CreateNoteRequest;
import pl.adamsm2.backend.dtos.NoteResource;
import pl.adamsm2.backend.dtos.UpdateNoteRequest;
import pl.adamsm2.backend.models.Note;

@Component
public class NoteMapper {

    public NoteResource mapNoteToNoteResource(Note note) {
        return NoteResource.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .build();
    }

    public Note mapCreateNoteRequestToNote(CreateNoteRequest createNoteRequest) {
        return Note.builder()
                .title(createNoteRequest.title())
                .content(createNoteRequest.content())
                .build();
    }

    public void updateNoteFromUpdateNoteRequest(Note note, UpdateNoteRequest updateNoteRequest) {
        note.setTitle(updateNoteRequest.title());
        note.setContent(updateNoteRequest.content());
    }
}
