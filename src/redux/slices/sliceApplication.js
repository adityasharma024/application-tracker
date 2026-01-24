import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },

    deleteApplication: (state, action) => {
      state.applications = state.applications.filter(
        (app) => app.id !== action.payload
      );
    },
    


    updateApplication: (state, action) => {
      const index = state.applications.findIndex(
        (app) => app.id === action.payload.id
      );

      if (index !== -1) {
        state.applications[index] = {
          ...state.applications[index],
          ...action.payload.updateData,
        };
      }
    },

    updateApplicationStatus: (state, action) => {
      const { id, newStatus } = action.payload;

      const index = state.applications.findIndex(
        (app) => app.id === id
      );

      if (index !== -1) {
        const app = state.applications[index];
        const oldStatus = app.status;

        app.status = newStatus;
        app.updatedAt = new Date().toISOString();

        if (!app.statusHistory) {
          app.statusHistory = [];
        }

        app.statusHistory.push({
          from: oldStatus,
          to: newStatus,
          changedAt: new Date().toISOString(),
        });
      }
    },

    clearAllApplications: (state) => {
      state.applications = [];
    },
  },
});

export const {
  addApplication,
  deleteApplication,
  updateApplication,
  updateApplicationStatus,
  clearAllApplications,
} = applicationSlice.actions;

export default applicationSlice.reducer;
