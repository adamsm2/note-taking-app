import {Slide} from "@mui/material";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const Home = () => {
    return (
        <div style={{
            marginTop: "100px",
            fontSize: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Slide direction="up" in={true} timeout={500}>
                <div>Aplikacja do tworzenia notatek</div>
            </Slide>
            <Slide direction="up" in={true} timeout={800}>
                <TextSnippetIcon sx={{marginTop: "20px"}}/>
            </Slide>
        </div>
    )
}

export default Home;