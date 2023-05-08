import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllBooks, deleteBook, fetchBooks } from '../../Store/BooksSlice';
import Icon from 'react-icons-kit';
import { basic_trashcan_remove } from 'react-icons-kit/linea/basic_trashcan_remove';
import { software_pencil } from 'react-icons-kit/linea/software_pencil';

export const ViewBooks = ({ handleEditIcon, bookToEdit, cancelUpdate }) => {
  const data = useSelector((state) => state.books.booksArray);
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const dispatch = useDispatch();

  // fetch books
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // delete book
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  // delete all books
  const deleteAll = () => {
    dispatch(deleteAllBooks());
  };

  // filter books based on search inputs
  const filteredData = data.filter((book) => {
    const titleMatch = book.book.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const authorMatch = book.book.authors
      .toLowerCase()
      .includes(searchAuthor.toLowerCase());

    return titleMatch && authorMatch;
  });





  return (
    <div className="views">
      <p>All Books</p>
      <div className="search">
        <input
          className='form-control'
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <input
          className='form-control'
          type="text"
          placeholder="Search by author"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
      </div>
      {filteredData.length > 0 ? (
        <>
          {filteredData.slice(startIndex, endIndex).map((newBook) => (
            <div className="book" key={newBook.id}>
              <div className="content">
                <h6>
                  {newBook.book.title} by {newBook.book.authors}
                </h6>
                <span>{newBook.book.pdate}</span>
                <img
                  src={newBook.book.imageUrls}
                  width="50px"
                  height="50px"
                  alt="Book Cover"
                />
              </div>

              <div className="actions">
                {bookToEdit === null && (
                  <span
                    className="icon red"
                    onClick={() => handleDelete(newBook.id)}
                  >
                    <Icon icon={basic_trashcan_remove} size={22} />
                  </span>
                )}
                <span
                  className="icon blue"
                  onClick={() => handleEditIcon(newBook)}
                >
                  <Icon icon={software_pencil} size={22} />
                </span>
               
              </div>
            </div>
          ))}
          <div className='pagination'>
            {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, index) => (
              <button
                key={index}
                className={index + 1 === currentPage ? 'active' : ''}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          {bookToEdit === null ? (
            <>
              {data.length > 1 && (
                <button className='btn btn-danger' onClick={deleteAll}>Delete All</button>
              )}
            </>
          ) : (
            <button className='btn btn-danger' onClick={cancelUpdate}>Cancel Update</button>
          )}
        </>
      ) : (
        <div>There are no books added yet!</div>
      )}
    </div>
  )
}
