import "./NotesPage.css";
import Button from "../../components/Button.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {notesApi} from "../../api/NotesApi.tsx";
import Loading from "../../components/Loading.tsx";

const NoteForm = () => {
    const navigate = useNavigate();
    const {noteId} = useParams();
    const [note, setNote] = useState<Note>({
        id: noteId,
        title: "",
        content: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isCancelled = false;
        if (noteId !== "create") {
            notesApi.getById(noteId)
                .then((response) => {
                    if (!isCancelled) {
                        setNote(response.data);
                    }
                })
                .catch(error => console.error('[Fetch Error]: ', error))
        }

        return () => {
            isCancelled = true;
        }
    }, [noteId])

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault()
        if (noteId === "create") {
            await notesApi.create(note).catch(error => console.error('[Create error]: ', error))
        } else {
            await notesApi.update(noteId, note).catch(error => console.error('[Update error]: ', error))
        }
        setLoading(false);
        navigate("/notes")
    }

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setNote({...note, [name]: value})
    }

    return (
        <div className="notes-page-container">
            <span className="form-title">{noteId === "create" ? "Utwórz notatkę" : "Edytuj notatkę"}</span>
            <form style={{marginBottom: "30px"}} onSubmit={handleSubmit}>
                <span className="form-input-title">Tytuł</span>
                <input
                    maxLength={10}
                    type="text"
                    className="note-title-input"
                    value={note.title}
                    onChange={handleChange}
                    name="title"
                />
                <span className="form-input-title">Zawartość</span>
                <textarea
                    maxLength={10}
                    className="note-content-input"
                    value={note.content}
                    onChange={handleChange}
                    name="content"
                />
                <div className="form-buttons">
                    <button className={'btn btn-success'} type="submit">
                        ZAPISZ
                    </button>
                    <Button color="secondary" onClick={() => navigate("/notes")}>
                        ANULUJ
                    </Button>
                </div>
            </form>
            {loading ? <Loading text="Trwa zapisywanie..."/> : null}


        </div>
    )
}

export default NoteForm;