package pl.adamsm2.backend.services;

import lombok.NonNull;
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
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
        return noteMapper.mapNoteToNoteResource(note);
    }

    @Transactional
    public Note createNote(@NonNull CreateNoteRequest createNoteRequest) {
        Note note = noteMapper.mapCreateNoteRequestToNote(createNoteRequest);
        return noteRepository.save(note);
    }

    @Transactional
    public void updateNote(Long id, @NonNull UpdateNoteRequest updateNoteRequest) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
        noteMapper.updateNoteFromUpdateNoteRequest(note, updateNoteRequest);
        noteRepository.save(note);
    }

    @Transactional
    public void deleteNote(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
        noteRepository.delete(note);
    }
}
