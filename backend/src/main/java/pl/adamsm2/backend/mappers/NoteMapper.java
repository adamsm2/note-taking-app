package pl.adamsm2.backend.mappers;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import pl.adamsm2.backend.dtos.CreateNoteRequest;
import pl.adamsm2.backend.dtos.NoteResource;
import pl.adamsm2.backend.dtos.UpdateNoteRequest;
import pl.adamsm2.backend.models.Note;

@Component
public class NoteMapper {

    public NoteResource mapNoteToNoteResource(@NonNull Note note) {
        return NoteResource.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .build();
    }

    public Note mapCreateNoteRequestToNote(@NonNull CreateNoteRequest createNoteRequest) {
        return Note.builder()
                .title(createNoteRequest.title())
                .content(createNoteRequest.content())
                .build();
    }

}
