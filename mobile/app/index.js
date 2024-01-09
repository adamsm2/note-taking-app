import {notesApi} from "./api/NotesApi";
import {Button, ScrollView, Text, TextInput, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {router, useFocusEffect} from "expo-router";
import Loading from "./Loading";

const App = () => {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState("");
    console.log(process.env.EXPO_PUBLIC_API_URL);

    const fetchData = () => {
        notesApi.getAll()
            .then((res) => {
                setNotes(res.data);
                setLoading(false);
            })
            .catch(err => console.error('[Fetch Error]:', err))
    }

    useEffect(() => {
        fetchData();
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    const deleteNote = (id) => {
        notesApi.delete(id)
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            })
    }

    const handleSearch = (event) => {
        setSearchText(event);
    }

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <ScrollView>
            {loading ? <Loading text="Trwa ładowanie notatek..."/> :
                <>
                    <View style={{display: "flex", marginLeft: "auto", marginRight: "auto", marginTop: 20}}>
                        <Button
                            title="UTWÓRZ"
                            onPress={() => router.push({
                                pathname: "/NoteFormScreen",
                                params: {noteId: "create"},
                            })}
                            color="green"
                        />
                    </View>
                    <TextInput
                        name="title"
                        onChangeText={handleSearch}
                        placeholder="Wyszukaj..."
                        style={{
                            marginTop: 10,
                            marginBottom: 20,
                            borderWidth: 1,
                            padding: 5,
                            marginLeft: 5,
                            marginRight: 5,
                            borderRadius: 5,
                        }}
                    />

                    {filteredNotes.map((note) => {
                        return (
                            <View key={note.id} style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 20,
                                marginLeft: 5,
                                marginRight: 5,
                                padding: 5,
                                borderWidth: 1,
                                borderRadius: 5,
                            }}>
                                <View>
                                    <Text
                                        style={{fontWeight: "bold"}}>{note.title.length > 30 ? note.title.slice(0, 30) + "..." : note.title}
                                    </Text>
                                    <Text>
                                        {note.content.length > 30 ? note.content.slice(0, 30) + "..." : note.content}
                                    </Text>
                                </View>
                                <View style={{gap: 20, display: "flex", flexDirection: "row"}}>
                                    <Button
                                        title="EDYTUJ"
                                        onPress={() => router.push({
                                            pathname: "/NoteFormScreen",
                                            params: {noteId: note.id},
                                        })
                                        }
                                    />
                                    <Button
                                        title="USUŃ"
                                        onPress={() => deleteNote(note.id)}
                                        color="#ff5c5c"
                                    />
                                </View>
                            </View>
                        )
                    })}
                </>
            }
        </ScrollView>
    )
}

export default App;