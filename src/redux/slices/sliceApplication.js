import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  loading: false,
  error: null,
  lastAction: null  // NEW: Track last action for undo
};

// NEW: Helper function to validate status transitions
const isValidStatusTransition = (currentStatus, newStatus) => {
  // Define valid transitions
  const validTransitions = {
    'applied': ['hr-round', 'technical-round', 'rejected'],
    'hr-round': ['technical-round', 'offer','rejected'],
    'technical-round': ['offer','hr-round', 'rejected'],
    'offer': [],  // Terminal state - can't change from offer
    'rejected': []  // Terminal state - can't change from rejected
  };
  
  return validTransitions[currentStatus]?.includes(newStatus) || false;
};

const applicationSlice = createSlice({
  name: 'applications',
  initialState,
  
  reducers: {
    
    addApplication: (state, action) => {
      state.applications.push(action.payload);
      // Track action for undo
      state.lastAction = {
        type: 'ADD',
        payload: action.payload,
        timestamp: new Date().toISOString()
      };
    },
    
    deleteApplication: (state, action) => {
      const deletedApp = state.applications.find(app => app.id === action.payload);
      state.applications = state.applications.filter(
        app => app.id !== action.payload
      );
      // Track action for undo
      state.lastAction = {
        type: 'DELETE',
        payload: deletedApp,
        timestamp: new Date().toISOString()
      };
    },
    
    bulkDeleteApplications: (state, action) => {
      const idsToDelete = action.payload;
      const deletedApps = state.applications.filter(app => idsToDelete.includes(app.id));
      state.applications = state.applications.filter(
        app => !idsToDelete.includes(app.id)
      );
      // Track action for undo
      state.lastAction = {
        type: 'BULK_DELETE',
        payload: deletedApps,
        timestamp: new Date().toISOString()
      };
    },
    
    updateApplication: (state, action) => {
      const index = state.applications.findIndex(
        app => app.id === action.payload.id
      );
      if (index !== -1) {
        const oldApp = { ...state.applications[index] };
        state.applications[index] = {
          ...state.applications[index],
          ...action.payload.updatedData
        };
        // Track action for undo
        state.lastAction = {
          type: 'UPDATE',
          payload: { id: action.payload.id, oldData: oldApp },
          timestamp: new Date().toISOString()
        };
      }
    },
    
    // UPDATED: Add validation to status change
    updateApplicationStatus: (state, action) => {
      const { id, newStatus, reason } = action.payload;
      const app = state.applications.find(app => app.id === id);
      
      if (!app) return;
      
      const currentStatus = app.status;
      
      // Validate transition
      if (!isValidStatusTransition(currentStatus, newStatus)) {
        console.error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
        return;
      }
      
      // If changing to rejected, reason is required
      if (newStatus === 'rejected' && !reason) {
        console.error('Reason required when rejecting application');
        return;
      }
      
      // Update status
      const oldStatus = app.status;
      app.status = newStatus;
      app.updatedAt = new Date().toISOString();
      
      // Add to status history
      if (!app.statusHistory) {
        app.statusHistory = [];
      }
      
      app.statusHistory.push({
        from: oldStatus,
        to: newStatus,
        reason: reason || null,
        changedAt: new Date().toISOString()
      });
      
      // Track action for undo
      state.lastAction = {
        type: 'STATUS_CHANGE',
        payload: { id, oldStatus, newStatus },
        timestamp: new Date().toISOString()
      };
    },
    
    bulkUpdateStatus: (state, action) => {
      const { ids, newStatus, reason } = action.payload;
      const timestamp = new Date().toISOString();
      const changes = [];
      
      ids.forEach(id => {
        const app = state.applications.find(app => app.id === id);
        if (app) {
          const oldStatus = app.status;
          
          // Validate transition
          if (!isValidStatusTransition(oldStatus, newStatus)) {
            return;
          }
          
          app.status = newStatus;
          app.updatedAt = timestamp;
          
          if (!app.statusHistory) {
            app.statusHistory = [];
          }
          
          app.statusHistory.push({
            from: oldStatus,
            to: newStatus,
            reason: reason || null,
            changedAt: timestamp
          });
          
          changes.push({ id, oldStatus, newStatus });
        }
      });
      
      // Track action for undo
      state.lastAction = {
        type: 'BULK_STATUS_CHANGE',
        payload: changes,
        timestamp: new Date().toISOString()
      };
    },
    
    // NEW: Undo last action
    undoLastAction: (state) => {
      if (!state.lastAction) return;
      
      const { type, payload } = state.lastAction;
      
      switch (type) {
        case 'ADD':
          // Remove the added application
          state.applications = state.applications.filter(
            app => app.id !== payload.id
          );
          break;
          
        case 'DELETE':
          // Restore deleted application
          state.applications.push(payload);
          break;
          
        case 'BULK_DELETE':
          // Restore all deleted applications
          state.applications.push(...payload);
          break;
          
        case 'UPDATE':
          // Restore old data
          const index = state.applications.findIndex(
            app => app.id === payload.id
          );
          if (index !== -1) {
            state.applications[index] = payload.oldData;
          }
          break;
          
        case 'STATUS_CHANGE':
          // Restore old status
          const app = state.applications.find(app => app.id === payload.id);
          if (app) {
            app.status = payload.oldStatus;
            // Remove last status history entry
            if (app.statusHistory) {
              app.statusHistory.pop();
            }
          }
          break;
          
        case 'BULK_STATUS_CHANGE':
          // Restore all old statuses
          payload.forEach(change => {
            const app = state.applications.find(app => app.id === change.id);
            if (app) {
              app.status = change.oldStatus;
              if (app.statusHistory) {
                app.statusHistory.pop();
              }
            }
          });
          break;
      }
      
      state.lastAction = null;
    },
    
    // NEW: Archive application (soft delete)
    archiveApplication: (state, action) => {
      const app = state.applications.find(app => app.id === action.payload);
      if (app) {
        app.archived = true;
        app.archivedAt = new Date().toISOString();
      }
    },
    
    // NEW: Unarchive application
    unarchiveApplication: (state, action) => {
      const app = state.applications.find(app => app.id === action.payload);
      if (app) {
        app.archived = false;
        app.archivedAt = null;
      }
    },
    
    clearAllApplications: (state) => {
      state.applications = [];
      state.lastAction = null;
    }
    
  }
});

export const { 
  addApplication, 
  deleteApplication,
  bulkDeleteApplications,
  updateApplication,
  updateApplicationStatus,
  bulkUpdateStatus,
  undoLastAction,  // Export new action
  archiveApplication,  // Export new action
  unarchiveApplication,  // Export new action
  clearAllApplications 
} = applicationSlice.actions;

export default applicationSlice.reducer;