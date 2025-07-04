import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApis";
import { photosApi } from "./apis/photosApi";


export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
          .concat(albumsApi.middleware)
          .concat(photosApi.middleware);
    },
});

window.store = store;

setupListeners(store.dispatch)

export  * from './thunks/fetchUsers';
export  * from './thunks/addUser';
export  * from './thunks/removeUser';
export  { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} from './apis/albumsApis';
export { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation, } from './apis/photosApi';