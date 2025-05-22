import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

// Load Tasks
export const loadTasks = createAction('[Tasks] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>(),
);

export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>(),
);

// Add Task
export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Omit<Task, 'id' | 'createdAt' | 'loading'> }>(),
);

export const addTaskSuccess = createAction(
  '[Tasks] Add Task Success',
  props<{ task: Task }>(),
);

export const addTaskFailure = createAction(
  '[Tasks] Add Task Failure',
  props<{ error: string }>(),
);

// Update Task
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task }>(),
);

export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ task: Task }>(),
);

export const updateTaskFailure = createAction(
  '[Tasks] Update Task Failure',
  props<{ error: string; task: Task }>(),
);

// Delete Task
export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>(),
);

export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ id: string }>(),
);

export const deleteTaskFailure = createAction(
  '[Tasks] Delete Task Failure',
  props<{ id: string; error: string }>(),
);

// Toggle Task Completion
export const toggleTaskCompletion = createAction(
  '[Tasks] Toggle Task Completion',
  props<{ id: string }>(),
);
