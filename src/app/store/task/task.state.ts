import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Task } from '../../models/task.model';

export interface TaskState extends EntityState<Task> {
  loading: boolean;
  error: string | null;
}

export const taskAdapter = createEntityAdapter<Task>();

export const initialTaskState: TaskState = taskAdapter.getInitialState({
  loading: false,
  error: null,
});
