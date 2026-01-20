import {configureStore} from '@reduxjs/toolkit';
import applicationReducer from './slices/sliceApplication';

const store=configureStore({
    reducer:{
        applications:applicationReducer
    },
    devTools:true,
});
export default store;
