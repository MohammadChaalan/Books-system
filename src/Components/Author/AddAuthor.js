import React, { useEffect, useState } from 'react'
import { addAuthorToFirestore, updateAuthor } from '../../Store/AuthorSlice';
import { useDispatch } from 'react-redux';



export const AddAuthor = ({ authorToEdit }) => {

  const dispatch = useDispatch();

  // add book states
  const [name, setName] = useState('');
  const [bdate, setBdate] = useState('');
  const [bio, setBio] = useState('');


  // update book states
  const [editedName, setEditedName] = useState('');
  const [editedBdate, setEditedBdate] = useState('');
  const [editedBio, setEditedBio] = useState('');




  // updating update book states
  useEffect(() => {

    if (authorToEdit !== null) {
      setEditedName(authorToEdit.author.name);
      setEditedBdate(authorToEdit.author.bdate);
      setEditedBio(authorToEdit.author.bio);
      

    }

  }, [authorToEdit])

  // add book event
  const handleAddAuthor = (e) => {
    e.preventDefault();

  
    let author = {
        name,
        bdate,
        bio
    }


    // dispatch action
    dispatch(addAuthorToFirestore(author));
    // Clear the form fields
    setName('');
    setBdate('');
    setBio('');
    
  }

  // update book event
  const handleUpdateAuthor = (e) => {
    e.preventDefault();
    let author = {
      name: editedName, bdate: editedBdate, bio: editedBio
    }
    dispatch(updateAuthor({ id: authorToEdit.id, author }));
  }

  return (
    <>
      {authorToEdit === null ? (
        <form className='form-group custom-form' onSubmit={handleAddAuthor}>


          <label>Name</label>
          <input className='form-control' required
            onChange={(e) => setName(e.target.value)} value={name} />
          <br />

          <label>Date of Birthday</label>
          <input type='date' className='form-control' required
            onChange={(e) => setBdate(e.target.value)} value={bdate} />
          <br />

          <label>Bio</label>
          <input className='form-control' required
            onChange={(e) => setBio(e.target.value)} value={bio} />
          <br />

        


          <button type='submit' className='btn btn-success'>Add</button>

        </form>
      ) : (
        <form className='form-group custom-form' onSubmit={handleUpdateAuthor}>



          <label>Name</label>
          <input className='form-control' required
            onChange={(e) => setEditedName(e.target.value)} value={editedName} />
          <br />

          <label>Date of Birthday</label>
          <input className='form-control' required
            onChange={(e) => setEditedBdate(e.target.value)} value={editedBdate} />
          <br />

          <label>Bio</label>
          <input className='form-control' required
            onChange={(e) => setEditedBio(e.target.value)} value={editedBio} />
          <br />

        

          <button type='submit' className='btn btn-success'>Update</button>

        </form>
      )}
    </>
  )
}