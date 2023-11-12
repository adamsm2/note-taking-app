package pl.adamsm2.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import pl.adamsm2.backend.dtos.CreateNoteRequest;
import pl.adamsm2.backend.dtos.NoteResource;
import pl.adamsm2.backend.dtos.UpdateNoteRequest;
import pl.adamsm2.backend.models.Note;
import pl.adamsm2.backend.services.NoteService;

import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping
    public ResponseEntity<Collection<NoteResource>> getNotes() {
        return ResponseEntity.ok(noteService.getNotes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteResource> getNoteById(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.getNoteById(id));
    }

    @PostMapping
    public ResponseEntity<Void> createNote(@Valid @RequestBody CreateNoteRequest createNoteRequest, UriComponentsBuilder ucb) {
        Note createdNote = noteService.createNote(createNoteRequest);
        URI locationOfNewNote = ucb
                .path("notes/{id}")
                .buildAndExpand(createdNote.getId())
                .toUri();
        return ResponseEntity.created(locationOfNewNote).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNote(@PathVariable Long id, @Valid @RequestBody UpdateNoteRequest updateNoteRequest) {
        noteService.updateNote(id, updateNoteRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
