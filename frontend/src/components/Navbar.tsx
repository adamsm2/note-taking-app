import "./Navbar.css";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "react-oidc-context";

const Navbar = () => {
    const auth = useAuth();
    const location = useLocation();

    const handleLogIn = () => {
        auth.signinRedirect({redirect_uri: window.location.href})
    }
    const handleLogOut = () => {
        auth.signoutSilent()
    }

    return (
        <>
            {location.pathname !== "/logout" ?
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/"
                                          className={location.pathname === "/" ? "navbar-link nav-link active" : "navbar-link nav-link"}>Strona
                                        główna</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/notes"
                                          className={location.pathname === "/notes" ? "navbar-link nav-link active" : "navbar-link nav-link"}>Notatki</Link>
                                </li>
                            </ul>
                            <span className="navbar-text">
                        {auth.isAuthenticated ?
                            <button onClick={handleLogOut} style={{border: "none", background: "none"}}>Wyloguj</button>
                            :
                            <Link to="/" className="navbar-link nav-link active"
                                  onClick={handleLogIn}>Zaloguj</Link>
                        }
                    </span>
                        </div>
                    </div>
                </nav>
                : null}
        </>
    );
};

export default Navbar;