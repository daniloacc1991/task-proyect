import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { taskReducer } from './task/task.reducer';
import { TaskEffects } from './task/task.effects';

export const reducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
};

export const effects = [TaskEffects];

export * from './app.state';
export * from './task/task.state';
export * from './task/task.actions';
export * from './task/task.selectors';
