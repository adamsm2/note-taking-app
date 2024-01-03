interface Props {
    children: string;
    color: "primary" | "success" | "danger" | "secondary";
    onClick: () => void;
}

const Button = ({children, color, onClick}: Props) => {
    return (
        <button className={`btn btn-${color}`} onClick={onClick}>
            <span>{children}</span>
        </button>
    );
};

export default Button;