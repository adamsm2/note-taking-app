import CircularProgress from '@mui/material/CircularProgress';

interface Props {
    text: string;

}

const Loading = ({text}: Props) => {
    return (
        <>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div style={{marginRight: "20px"}}>
                    <CircularProgress color="inherit"/>
                </div>
                <h3>{text}</h3>
            </div>
        </>
    );
}

export default Loading;