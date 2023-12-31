import { Outlet, Link } from "react-router-dom";
import { useApp } from "./RealmApp";
import { Navigate } from "react-router-dom";

const Layout = () => {
    const { currentUser, logOut } = useApp();

    if (currentUser) {
        return <Navigate to="/wordle2-MERN/user/wordle-clone" />
    }

    return (
        <div className="App">
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/wordle2-MERN">Wordle!</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/wordle2-MERN/rules">Rules</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/wordle2-MERN">Log in!</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="main-content">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;