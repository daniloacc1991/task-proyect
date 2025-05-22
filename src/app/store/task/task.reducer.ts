import { createReducer, on } from '@ngrx/store';
import { initialTaskState, taskAdapter } from './task.state';
import * as TaskActions from './task.actions';

export const taskReducer = createReducer(
  initialTaskState,

  // Load Tasks
  on(TaskActions.loadTasks, state => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TaskActions.loadTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, {
      ...state,
      loading: false,
    }),
  ),

  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Task
  on(TaskActions.addTask, state => ({
    ...state,
    loading: true,
  })),

  on(TaskActions.addTaskSuccess, (state, { task }) =>
    taskAdapter.addOne(task, {
      ...state,
      loading: false,
    }),
  ),

  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Task
  on(TaskActions.updateTask, (state, { task }) =>
    taskAdapter.updateOne(
      { id: task.id, changes: { loading: true } },
      { ...state },
    ),
  ),

  on(TaskActions.updateTaskSuccess, (state, { task }) =>
    taskAdapter.updateOne(
      { id: task.id, changes: { ...task, loading: false } },
      { ...state },
    ),
  ),

  on(TaskActions.updateTaskFailure, (state, { task, error }) =>
    taskAdapter.updateOne(
      { id: task.id, changes: { loading: false } },
      { ...state, error },
    ),
  ),

  // Delete Task
  on(TaskActions.deleteTask, (state, { id }) =>
    taskAdapter.updateOne({ id, changes: { loading: true } }, { ...state }),
  ),

  on(TaskActions.deleteTaskSuccess, (state, { id }) =>
    taskAdapter.removeOne(id, { ...state }),
  ),

  on(TaskActions.deleteTaskFailure, (state, { id, error }) =>
    taskAdapter.updateOne(
      { id, changes: { loading: false } },
      { ...state, error },
    ),
  ),

  // Toggle Task Completion
  on(TaskActions.toggleTaskCompletion, (state, { id }) => {
    const task = state.entities[id];
    if (!task) return state;

    return taskAdapter.updateOne(
      {
        id,
        changes: { completed: !task.completed },
      },
      state,
    );
  }),
);
