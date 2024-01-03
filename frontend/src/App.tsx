import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NotesPage from "./pages/notes/NotesPage.tsx";
import Navbar from "./components/Navbar.tsx";
import NoteForm from "./pages/notes/NoteForm.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route index element={<Home/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path='/notes' element={<NotesPage/>}/>
                    <Route path='/notes/:noteId' element={<NoteForm/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}