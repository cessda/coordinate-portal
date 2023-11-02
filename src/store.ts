import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./reducers/search";
import detailReducer from "./reducers/detail";
import languageReducer from "./reducers/language";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    detail: detailReducer,
    language: languageReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
