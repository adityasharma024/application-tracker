import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    applications:[],
    loading:false,
    error:null
};
const applicationSlice=createSlice({
    name:'application',
    initialState,
    reducers:{
        addApplication:(state,action)=>{
            state.applications.push(action.payload);
        },
        deleteApplication:(state,action)=>{
            state.applicatons=state.applications.filter(
                app=>app.id!==action.payload
            );
        },
        updateApplication:(state,action)=>{
            const index=state.applications.findIndex(
                app=>app.id===action.payload.id
            );
            if(index!==-1){
                state.applications[index]={
                    ...state.applications[index],
                    ...action.payload.updateData
                };
            }
        },
        clearAllApplications:(state)=>{
            state.applications=[];

        }
    }
});

export const{
    addApplication,
    deleteApplication,
    updateApplication,
    clearAllApplications
}=applicationSlice.actions;

export default applicationSlice.reducer;