import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <div className="navbar">

            <div className="container">
                <p href="#" className="logo"> Admin </p>
                <ul>
                    <Link to="/admin/author">Author</Link>
                    <Link to="/admin/books">Books</Link>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;