import { configureStore } from "@reduxjs/toolkit";
import booksReducer from './BooksSlice';
import authorReducer from './AuthorSlice'

const store = configureStore({
    reducer:{
        books: booksReducer,
        author: authorReducer,
    }
});

export default store;