import { useState } from "react";
import { AddAuthor } from "../../Components/Author/AddAuthor";
import { ViewAuthor } from "../../Components/Author/ViewAuthor";
import Navbar from "../../Components/Navbar/NavAdmin";

function Author  () {

  const [authorToEdit, setAuthorToEdit] = useState(null);

  const handleEditIcon=(author)=>{
    setAuthorToEdit(author);
  }

  const cancelUpdate=()=>{
    setAuthorToEdit(null);
  }

  return (
    <div className="wrapper">
      <Navbar />
      <h1>Author</h1>
      <div className="add-and-view-books">
        <AddAuthor
          authorToEdit={authorToEdit}
        />
        <ViewAuthor
          handleEditIcon={handleEditIcon}
          authorToEdit={authorToEdit}
          cancelUpdate={cancelUpdate}
        />

      </div>
    </div>
  );
}

export default Author;
