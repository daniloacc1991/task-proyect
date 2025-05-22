import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { Task } from '../../models/task.model';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() => {
        // Simulate loading from storage (localStorage or similar)
        try {
          const storedTasks = localStorage.getItem('tasks');
          const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];
          return of(TaskActions.loadTasksSuccess({ tasks }));
        } catch (_error) {
          return of(
            TaskActions.loadTasksFailure({ error: 'Failed to load tasks' }),
          );
        }
      }),
    ),
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      mergeMap(({ task }) => {
        try {
          // Create a new task with ID and timestamp
          const newTask: Task = {
            ...task,
            id: uuidV4(),
            loading: false,
            createdAt: new Date(),
          };

          // Simulate storing task
          return of(TaskActions.addTaskSuccess({ task: newTask }));
        } catch (_error) {
          return of(
            TaskActions.addTaskFailure({ error: 'Failed to add task' }),
          );
        }
      }),
    ),
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      delay(6000),
      mergeMap(({ task }) => {
        try {
          // Simulate updating task
          return of(TaskActions.updateTaskSuccess({ task }));
        } catch (_error) {
          return of(
            TaskActions.updateTaskFailure({
              task,
              error: 'Failed to update task',
            }),
          );
        }
      }),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      delay(6000),
      mergeMap(({ id }) => {
        try {
          // Simulate deleting task
          return of(TaskActions.deleteTaskSuccess({ id }));
        } catch (_error) {
          return of(
            TaskActions.deleteTaskFailure({
              id,
              error: 'Failed to delete task',
            }),
          );
        }
      }),
    ),
  );

  // Effect to persist tasks in localStorage after successful operations
  persistTasks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TaskActions.addTaskSuccess,
          TaskActions.updateTaskSuccess,
          TaskActions.deleteTaskSuccess,
          TaskActions.toggleTaskCompletion,
        ),
        // We need to get all tasks from the store to persist them
        // In a real app, you would inject the Store and use a selector
        // For this demo, we'll assume the persistence happens elsewhere
        map(() => {
          // This effect doesn't dispatch any actions, just for side effects
          return { type: '[Tasks] Persistence Complete' };
        }),
      ),
    { dispatch: false },
  );
}
