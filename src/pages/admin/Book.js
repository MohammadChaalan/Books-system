import { useState } from "react";
import { AddBooks } from "../../Components/Books/AddBooks";
import { ViewBooks } from "../../Components/Books/ViewBooks";
import Navbar from "../../Components/Navbar/NavAdmin";
function Book  () {

  const [bookToEdit, setBookToEdit] = useState(null);

  const handleEditIcon=(book)=>{
    setBookToEdit(book);
  }

  const cancelUpdate=()=>{
    setBookToEdit(null);
  }

  return (
    <div className="wrapper">
      <Navbar />
      <h1>Books</h1>
      <div className="add-and-view-books">
        <AddBooks
          bookToEdit={bookToEdit}
        />
        <ViewBooks
          handleEditIcon={handleEditIcon}
          bookToEdit={bookToEdit}
          cancelUpdate={cancelUpdate}
        />
      </div>
    </div>
  );
}

export default Book;

