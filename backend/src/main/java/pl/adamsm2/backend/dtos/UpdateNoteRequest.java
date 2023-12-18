package pl.adamsm2.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;
import pl.adamsm2.backend.ConstantData;

@Builder
@Jacksonized
public record UpdateNoteRequest(
        @Size(max=ConstantData.NOTE_MAX_TITLE_LENGTH) @NotBlank String title,
        @Size(max=ConstantData.NOTE_MAX_CONTENT_LENGTH) @NotNull String content) {
}
