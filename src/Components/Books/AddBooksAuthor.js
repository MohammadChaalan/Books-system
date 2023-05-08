import React, { useEffect, useState } from 'react'
import { addBookToFirestore, updateBook } from '../../Store/BooksSlice';
import { useDispatch } from 'react-redux';
import {
  ref,
  uploadBytes,
  getDownloadURL,

} from "firebase/storage";
import { db, storage } from "../../Firebase/Config";
import { collection, onSnapshot } from 'firebase/firestore';


export const AddBooksAuthor = ({ bookToEdit }) => {

  const dispatch = useDispatch();

  // add book states
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [brief, setBreif] = useState('');
  const [status, setStatus] = useState('');
  const [pdate, setPdate] = useState(new Date().toISOString().substring(0, 10));
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);



  // update book states
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBreif, setEditedBreif] = useState('');
  const [editedStatus, setEditedStatus] = useState('');
  const [editedPdate, setEditedPdate] = useState('');
  const [editedAuthors, setEditedAuthors] = useState('');






  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Author"), (snapshot) => {
      setAuthors(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  // updating update book states
  useEffect(() => {

    if (bookToEdit !== null) {
      setEditedTitle(bookToEdit.book.title);
      setEditedBreif(bookToEdit.book.brief);
      setEditedStatus(bookToEdit.book.status);
      setEditedPdate(bookToEdit.book.pdate);
      setEditedAuthors(bookToEdit.book.authors);

    }

  }, [bookToEdit])

  // add book event
  const handleAddBook = (e) => {
    e.preventDefault();

    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      })
        .catch((error) => {
          console.log('Error getting download URL:', error);
        });
    })
      .catch((error) => {
        console.log('Error uploading image:', error);
      });


    const selectedAuthorDoc = authors.find(author => author.id === selectedAuthor);
    if (!selectedAuthorDoc) return;

    let book = {
      status,
      authors: selectedAuthorDoc.name,
      title,
      brief,
      pdate,
      imageUrls
    }
    // dispatch action
    dispatch(addBookToFirestore(book));
    // Clear the form fields
    setStatus('');
    setTitle('');
    setBreif('');
    setImageUrls([]);
    setPdate(new Date().toISOString().slice(0, 10));


  }

  // update book event
  const handleUpdateBook = (e) => {
    e.preventDefault();
    let book = {
      status: editedStatus,
      title: editedTitle,
      brief: editedBreif,
      pdate: editedPdate,
      authors: editedAuthors,
    }
    dispatch(updateBook({ id: bookToEdit.id, book }));
  }

  return (
    <>
      {bookToEdit === null ? (
        <form className='form-group custom-form' onSubmit={handleAddBook}>


          <label htmlFor="options">Author</label>
          <select className='form-control' value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
            <option value="">--Please choose an option--</option>
            {authors.map((author, index) => (
              <option key={index} value={author.id}>{author.name}</option>
            ))}
          </select>
          <br />


          <label>Title</label>
          <input className='form-control' required
            onChange={(e) => setTitle(e.target.value)} value={title} />
          <br />

          <label>Breif</label>
          <input className='form-control' required
            onChange={(e) => setBreif(e.target.value)} value={brief} />
          <br />

          <label htmlFor="options">Status</label>
          <select className='form-control' id="options" onChange={(e) => setStatus(e.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="draft">draft</option>
            <option value="publisher">publisher</option>
          </select>
          <br />



          <label>Image</label>
          <input
            type="file"
            className='form-control'
            required
            accept="images/*"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <br />


          <button type='submit' className='btn btn-success'>Add</button>

        </form>
      ) : (
        <form className='form-group custom-form' onSubmit={handleUpdateBook}>



          <label htmlFor="options">Author</label>
          <select className='form-control' value={selectedAuthor} onChange={(e) => setEditedAuthors(e.target.value)}>
            <option value="">--Please choose an option--</option>
            {authors.map(author => (
              <option key={author.id} value={author.name}>{author.name}</option>
            ))}
          </select>
          <br />


          <label>Title</label>
          <input className='form-control' required
            onChange={(e) => setEditedTitle(e.target.value)} value={editedTitle} />
          <br />

          <label>Breif</label>
          <input className='form-control' required
            onChange={(e) => setEditedBreif(e.target.value)} value={editedBreif} />
          <br />

          <label htmlFor="options">Status</label>
          <select className='form-control' id="options" onChange={(e) => setEditedStatus(e.target.value)}>
            <option value="">{editedStatus}</option>
            <option value="draft">draft</option>
            <option value="publisher">publisher</option>
          </select>
          <br />








          <button type='submit' className='btn btn-success'>Update</button>

        </form>
      )}
    </>
  )
}