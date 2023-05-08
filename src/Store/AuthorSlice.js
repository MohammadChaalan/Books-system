import { createSlice } from "@reduxjs/toolkit";
import {db} from '../Firebase/Config';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";

// add book to firestore
export const addAuthorToFirestore = createAsyncThunk(
    'author/addAuthorToFirestore',
    async (author)=>{
        const addAuthorRef = await addDoc(collection(db,'Author'),author);
        const newAuthor = { id: addAuthorRef.id, author };
        return newAuthor;
    }
);

// fetch author
export const fetchAuthor = createAsyncThunk(
    'author/fetchAuthor',
    async () => {
      const querySnapshot = await getDocs(collection(db, 'Author'));
      const authors = querySnapshot.docs.map((doc)=>({
        id: doc.id,
        author: doc.data(),
      }));
      return authors;
    }
  );

  // delete book
  export const deleteAuthor = createAsyncThunk(
    'author/deleteAuthor',
    async(id)=>{
      const authors = await getDocs(collection(db,'Author'));
      for(var snap of authors.docs){
        if(snap.id === id){
          await deleteDoc(doc(db,'Author',snap.id));
        }
      }
      return id;
    }
  );

// delete all books
export const deleteAllAuthors=createAsyncThunk(
  'author/deleteAllAuthors',
  async()=>{
    const authors = await getDocs(collection(db,'Author'));
    for(var snap of authors.docs){
      await deleteDoc(doc(db,'Author',snap.id));
    }
    return [];
  }
);

// update book
export const updateAuthor=createAsyncThunk(
  'author/updateAuthor',
  async(editedAuthor)=>{
    const authors = await getDocs(collection(db,'Author'));
    for(var snap of authors.docs){
      if(snap.id === editedAuthor.id){
        const authorRef = doc(db,'Author', snap.id);
        await updateDoc(authorRef, editedAuthor.author);
      }
    }
    return editedAuthor;
  }
);


const AuthorSlice = createSlice({
    name: 'Author',
    initialState: {
      authorsArray: [],
    },
    // reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAuthor.fulfilled, (state, action) => {
          state.authorsArray = action.payload;
        })
        .addCase(addAuthorToFirestore.fulfilled, (state, action) => {
          state.authorsArray.push(action.payload);
        })
        .addCase(deleteAuthor.fulfilled, (state, action) => {
          state.authorsArray = state.authorsArray.filter(
            (author) => author.id !== action.payload
          );
        })
        .addCase(deleteAllAuthors.fulfilled, (state, action) => {
          state.authorsArray = action.payload;
        })
        .addCase(updateAuthor.fulfilled, (state, action) => {
          const { id, author } = action.payload;
          const authorIndex = state.authorsArray.findIndex(
            (author) => author.id === id
          );
          if (authorIndex !== -1) {
            state.authorsArray[authorIndex] = {
              ...state.authorsArray[authorIndex],
              author,
            };
          }
        });
    },
  });

export default AuthorSlice.reducer;