package pl.adamsm2.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Builder
@Jacksonized
public record UpdateNoteRequest(
        @NotNull String title,
        @NotNull String content) {
}
