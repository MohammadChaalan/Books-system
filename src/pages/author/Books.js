import { useState } from "react";
import NavAuthor from "../../Components/Navbar/NavAuthor";
import { AddBooksAuthor } from "../../Components/Books/AddBooksAuthor";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/Config";
import { useEffect } from "react";
import SignIn from "../../Auth/Signin";
function Books() {

  const [bookToEdit, setBookToEdit] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  const handleEditIcon = (book) => {
    setBookToEdit(book);
  }

  const cancelUpdate = () => {
    setBookToEdit(null);
  }

  return (
    <div className="wrapper">
      {authUser ? (
        <>

          <NavAuthor />
          <h1>Books</h1> 
          <button className="singout" onClick={userSignOut}>Sign Out</button>
          <div className="add-and-view-books">
            <AddBooksAuthor
              bookToEdit={bookToEdit}
            />
          </div>
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default Books;

