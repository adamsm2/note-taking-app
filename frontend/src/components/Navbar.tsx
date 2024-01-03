import "./Navbar.css";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="navbar-link nav-link active">Strona główna</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/notes" className="navbar-link nav-link">Notatki</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <a className="nav-link active" aria-current="page" href="/login">Zaloguj się</a>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;