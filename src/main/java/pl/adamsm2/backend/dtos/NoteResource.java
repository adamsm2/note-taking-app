package pl.adamsm2.backend.dtos;

import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
public record NoteResource(
        Long id,
        String title,
        String content) {
}
