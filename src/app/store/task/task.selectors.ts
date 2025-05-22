import { createFeatureSelector, createSelector } from '@ngrx/store';
import { taskAdapter, TaskState } from './task.state';

// Feature selector
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Entity selectors
const { selectAll, selectEntities, selectTotal } = taskAdapter.getSelectors();

// Select all tasks
export const selectAllTasks = createSelector(selectTaskState, selectAll);

// Select task by id
export const selectTaskById = (id: string) =>
  createSelector(selectTaskState, state => state.entities[id]);

// Select task entities
export const selectTaskEntities = createSelector(
  selectTaskState,
  selectEntities,
);

// Select loading state
export const selectTasksLoading = createSelector(
  selectTaskState,
  state => state.loading,
);

// Select error state
export const selectTasksError = createSelector(
  selectTaskState,
  state => state.error,
);

// Select completed tasks
export const selectCompletedTasks = createSelector(selectAllTasks, tasks =>
  tasks.filter(task => task.completed),
);

// Select incomplete tasks
export const selectIncompleteTasks = createSelector(selectAllTasks, tasks =>
  tasks.filter(task => !task.completed),
);

// Select total tasks count
export const selectTasksCount = createSelector(selectTaskState, selectTotal);

// Select completed tasks count
export const selectCompletedTasksCount = createSelector(
  selectCompletedTasks,
  tasks => tasks.length,
);

// Select completion percentage
export const selectCompletionPercentage = createSelector(
  selectCompletedTasksCount,
  selectTasksCount,
  (completedCount, totalCount) =>
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100),
);
