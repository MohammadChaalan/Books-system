import { Link } from "react-router-dom";


const NavAuthor = () => {
    return (
        <div className="navbar">

            <div className="container">
                <p className="logo"> Author </p>
                <ul>
                    <Link to="/author/books">Books</Link>
                </ul>
            </div>
        </div>
    );
}

export default NavAuthor;