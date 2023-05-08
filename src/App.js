import Author from "./pages/admin/Author";
import Book from "./pages/admin/Book";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Books from "./pages/author/Books";
import SignIn from "./Auth/Signin";
import SignUp from "./Auth/Signup";


function App() {

  return (
    <BrowserRouter>
      <div className="wrapper">

        <Routes>

          <Route path="/admin/books" element={<Book />} />
          <Route path="/admin/author" element={<Author />} />
          <Route path="/author/books" element={<Books />} />
          <Route path="/singin" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />



           




        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
