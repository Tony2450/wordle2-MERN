import { Outlet, Link } from "react-router-dom";
import { AppProvider, useApp } from "./RealmApp";
import { Navigate } from "react-router-dom";

const ProtectedLayout = () => {
    const { currentUser, logOut } = useApp();

    if (!currentUser) {
        return <Navigate to="/" />
    }

    return (
        <div className="App">
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/user/wordle-clone">Wordle!</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/rules">Rules</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/userstats">My Stats</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user/wordle-clone">Play Wordle!</Link>
                            </li>
                            <li className="nav-item">
                                <button className="button nav-link"
                                    onClick={async () => {
                                        await logOut();
                                        return <Navigate to="/"/>
                                    }}
                                >
                                    Log Out
                                </button>
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

export default ProtectedLayout;