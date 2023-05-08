import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-icons-kit';
import { basic_trashcan_remove } from 'react-icons-kit/linea/basic_trashcan_remove';
import { software_pencil } from 'react-icons-kit/linea/software_pencil';
import { deleteAllAuthors, deleteAuthor, fetchAuthor } from '../../Store/AuthorSlice';
import { useState } from 'react';



export const ViewAuthor = ({ handleEditIcon, authorToEdit, cancelUpdate }) => {

  const data = useSelector((state) => state.author.authorsArray);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState('');
  const [searchName, setSearchName] = useState('');

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const dispatch = useDispatch();

  // fetch author
  useEffect(() => {
    dispatch(fetchAuthor());
  }, [dispatch])

  // delete author
  const handleDelete = (id) => {
    dispatch(deleteAuthor(id));
  }

  // delete all author
  const deleteAll = () => {
    dispatch(deleteAllAuthors());
  }

  // filter books based on search inputs
  const filteredData = data.filter((author) => {
    const search = author.author.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    
    return search ;
  });


  return (
    <div className='views'>
      <p>All Author</p>
      <div className="search">
        <input
          className='form-control'
          type="text"
          placeholder="Search Author"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        </div>

      
        {filteredData.length > 0 ? (
        <>
          {filteredData.slice(startIndex, endIndex).map((newAuthor) => (
            <div className='book' key={newAuthor.id}>

              <div className='content'>
                <h6>{newAuthor.author.name}</h6>
                <span>{newAuthor.author.bdate}</span>
              </div>

              <div className='actions'>
                {authorToEdit === null && (
                  <span className='icon red'
                    onClick={() => handleDelete(newAuthor.id)}>
                    <Icon icon={basic_trashcan_remove} size={22} />
                  </span>
                )}
                <span className='icon blue'
                  onClick={() => handleEditIcon(newAuthor)}>
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

          {authorToEdit === null ? (
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
