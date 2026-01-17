import {configureStore} from '@reduxjs/toolkit';
import applicationReducer from './slices/sliceApplication';

const store=configureStore({
    reducer:{
        application:applicationReducer
    },
    devTools:true,
});
export default store;
