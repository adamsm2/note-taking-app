package pl.adamsm2.backend;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ConstantData {
    public static final int NOTE_MAX_TITLE_LENGTH = 100;
    public static final int NOTE_MAX_CONTENT_LENGTH = 1000;
}
