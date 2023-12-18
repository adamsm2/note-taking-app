package pl.adamsm2.backend.models;

import jakarta.persistence.*;
import lombok.*;
import pl.adamsm2.backend.ConstantData;

@Entity
@Builder
@EqualsAndHashCode(of = "id")
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(nullable = false, length = ConstantData.NOTE_MAX_TITLE_LENGTH)
    private String title;

    @Column(nullable = false, length = ConstantData.NOTE_MAX_CONTENT_LENGTH)
    private String content;
}
