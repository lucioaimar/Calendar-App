import { AppState } from '../app.reducer';

export const getState  = (state: AppState) => state;

//GET ALL
export const getSelectedReminder  = (state: AppState) => state.selectedReminder;
