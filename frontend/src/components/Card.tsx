import "./Card.css";
import Button from "./Button.tsx";

interface Props {
    content: string;
    title: string;
    onEdit: () => void;
    onDelete: () => void;
}

const Card = ({content, title, onEdit, onDelete}: Props) => {
    const handleDeleteClick = (event) => {
        event.stopPropagation();
        onDelete();
    }

    return (
        <>
            <div className="my-card" onClick={onEdit}>
                <div className="my-card-body">
                    <div className="title-content">
                        <div className="card-title">{title}</div>
                        <div className="card-content">
                            {content.length > 50 ? `${content.substring(0, 50)}...` : content}
                        </div>
                    </div>
                    <div className="buttons">
                        <Button color="primary" onClick={onEdit}>
                            EDYTUJ
                        </Button>
                        <button className={'btn btn-danger'} onClick={handleDeleteClick}>
                            USUŃ
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;