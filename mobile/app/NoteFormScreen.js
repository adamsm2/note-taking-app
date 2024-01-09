import {Button, ScrollView, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import {notesApi} from "./api/NotesApi";
import Loading from "./Loading";
import {router, useLocalSearchParams, useNavigation} from "expo-router";

const NoteFormScreen = () => {
    const {noteId} = useLocalSearchParams();
    useNavigation().setOptions({headerTitle: noteId === "create" ? "Utwórz notatkę" : "Edytuj notatkę"})

    const [note, setNote] = useState({
        id: noteId,
        title: "",
        content: ""
    });
    const [initialLoading, setInitialLoading] = useState(true)
    const [saveLoading, setSaveLoading] = useState(false);

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
        setInitialLoading(false);

        return () => {
            isCancelled = true;
        }
    }, [noteId])

    const handleSave = async () => {
        setSaveLoading(true);
        if (noteId === "create") {
            await notesApi.create(note).catch(error => console.error('[Create error]: ', error))
        } else {
            await notesApi.update(noteId, note).catch(error => console.error('[Update error]: ', error))
        }
        router.back();
    }

    const handleChangeTitle = (event) => {
        setNote({...note, ["title"]: event})
    }
    const handleChangeContent = (event) => {
        setNote({...note, ["content"]: event})
    }


    return (
        <ScrollView>
            {initialLoading ? <Loading text="Trwa ładowanie formularza..."/> : saveLoading ?
                <Loading text="Trwa zapisywanie..."/> :
                <>
                    <Text style={{marginTop: 10, marginBottom: 5, fontWeight: "bold", marginLeft: 5}}>Tytuł</Text>
                    <TextInput
                        name="title"
                        onChangeText={handleChangeTitle}
                        value={note.title || ""}
                        style={{
                            borderWidth: 1,
                            padding: 5,
                            marginBottom: 20,
                            marginLeft: 5,
                            marginRight: 5,
                            borderRadius: 5,
                        }}
                    />
                    <Text style={{marginTop: 10, marginBottom: 5, fontWeight: "bold", marginLeft: 5}}>Zawartość</Text>
                    <TextInput
                        name="content"
                        onChangeText={handleChangeContent}
                        value={note.content || ""}
                        style={{
                            borderWidth: 1,
                            padding: 5,
                            marginBottom: 20,
                            marginLeft: 5,
                            marginRight: 5,
                            borderRadius: 5,
                        }}
                    />
                    <View style={{
                        gap: 20,
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "auto",
                        marginRight: 5,
                    }}>
                        <Button
                            title="ZAPISZ"
                            onPress={handleSave}
                            color="green"
                        />
                        <Button
                            title="ANULUJ"
                            onPress={() => router.back()}
                            color="gray"
                        />
                    </View>
                </>
            }
        </ScrollView>
    );
}

export default NoteFormScreen;