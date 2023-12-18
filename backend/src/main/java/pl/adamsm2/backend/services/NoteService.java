package pl.adamsm2.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adamsm2.backend.dtos.CreateNoteRequest;
import pl.adamsm2.backend.dtos.NoteResource;
import pl.adamsm2.backend.dtos.UpdateNoteRequest;
import pl.adamsm2.backend.exceptions.NoteNotFoundException;
import pl.adamsm2.backend.mappers.NoteMapper;
import pl.adamsm2.backend.models.Note;
import pl.adamsm2.backend.repositories.NoteRepository;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final NoteMapper noteMapper;

    @Transactional(readOnly = true)
    public Collection<NoteResource> getNotes() {
        return noteRepository.findAll().stream()
                .map(noteMapper::mapNoteToNoteResource)
                .toList();
    }

    @Transactional(readOnly = true)
    public NoteResource getNoteById(Long id) {
        final var note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
        return noteMapper.mapNoteToNoteResource(note);
    }

    @Transactional
    public void createNote(CreateNoteRequest createNoteRequest) {
        final var note = noteMapper.mapCreateNoteRequestToNote(createNoteRequest);
        noteRepository.save(note);
    }

    @Transactional
    public void updateNote(Long id, UpdateNoteRequest updateNoteRequest) {
        final var note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
        updateNoteFromUpdateNoteRequest(note, updateNoteRequest);
        noteRepository.save(note);
    }

    @Transactional
    public void deleteNote(Long id) {
        final var note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
        noteRepository.delete(note);
    }

    private void updateNoteFromUpdateNoteRequest(Note note, UpdateNoteRequest updateNoteRequest) {
        note.setTitle(updateNoteRequest.title());
        note.setContent(updateNoteRequest.content());
    }
}
