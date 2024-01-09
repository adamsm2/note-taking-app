import {Stack} from "expo-router";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle: "Notatki",
            }}/>
            <Stack.Screen name="NoteFormScreen" options={{
                headerTitle: "Edycja notatki",
            }}/>
        </Stack>
    );
};

export default RootLayout;