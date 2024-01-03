import {useEffect, useState} from "react";
import {notesApi} from "../../api/NotesApi.tsx";
import Card from "../../components/Card.tsx";
import "./NotesPage.css";
import Button from "../../components/Button.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading.tsx";

const NotesPage = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        notesApi.getAll()
            .then((response) => {
                if (!isCancelled) {
                    setNotes(response.data);
                    setLoading(false);
                }
            })
            .catch(error => console.error('[Fetch Error]: ', error))

        return () => {
            isCancelled = true;
        }
    }, [])

    const deleteNote = (id: string | undefined) => {
        notesApi.delete(id)
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            })
    }

    const editNote = (id: string | undefined) => {
        navigate(`/notes/${id}`);
    }

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase())
    );
    const handleSearch = (searchValue: string) => {
        setSearchText(searchValue);
        console.log(searchValue);
    }

    const noteList = filteredNotes.map(note => {
        return (
            <>
                <Card title={note.title} content={note.content} onEdit={() => editNote(note.id)}
                      onDelete={() => deleteNote(note.id)}/>
            </>
        )
    })

    return (
        <>
            <div className="notes-page-container">
                {loading ? <Loading text="Trwa ładowanie notatek"/> :
                    <>
                        <div className="create-title">
                            <span className="title">Notatki</span>
                            <Button color="success" onClick={() => navigate("/notes/create")}>
                                UTWÓRZ
                            </Button>
                        </div>
                        <div className="search-bar-container">
                            <SearchBar onSearch={handleSearch}/>
                        </div>
                        <div className="cards-container">
                            {noteList}
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default NotesPage;