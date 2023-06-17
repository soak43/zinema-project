import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="nav nav-tabs mb-2">
            <Link className="nav-link" to="/">Hello</Link>
            <Link className="nav-link" to="/register">Register</Link>
            <Link className="nav-link" to="/login">Login</Link>
        </nav>
    )
}

export default Nav