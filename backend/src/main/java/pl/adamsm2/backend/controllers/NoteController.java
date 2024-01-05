package pl.adamsm2.backend.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.adamsm2.backend.dtos.CreateNoteRequest;
import pl.adamsm2.backend.dtos.NoteResource;
import pl.adamsm2.backend.dtos.UpdateNoteRequest;
import pl.adamsm2.backend.services.NoteService;

import java.util.Collection;

@RestController
@RequestMapping("/notes")
@SecurityRequirement(name = "bearer-key")
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
    public ResponseEntity<Void> createNote(@RequestBody @Valid CreateNoteRequest createNoteRequest) {
        noteService.createNote(createNoteRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNote(@PathVariable Long id, @Valid @RequestBody UpdateNoteRequest updateNoteRequest) {
        noteService.updateNote(id, updateNoteRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
