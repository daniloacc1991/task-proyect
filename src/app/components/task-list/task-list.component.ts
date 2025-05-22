import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Task } from '../../models/task.model';
import * as TaskActions from '../../store/task/task.actions';
import * as TaskSelectors from '../../store/task/task.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: [],
  standalone: false,
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  completedTasksCount$: Observable<number>;
  completionPercentage$: Observable<number>;

  taskForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {
    this.tasks$ = this.store.select(TaskSelectors.selectAllTasks);
    this.loading$ = this.store.select(TaskSelectors.selectTasksLoading);
    this.error$ = this.store.select(TaskSelectors.selectTasksError);
    this.completedTasksCount$ = this.store.select(
      TaskSelectors.selectCompletedTasksCount,
    );
    this.completionPercentage$ = this.store.select(
      TaskSelectors.selectCompletionPercentage,
    );

    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        completed: false,
      };

      this.store.dispatch(TaskActions.addTask({ task }));
      this.taskForm.reset({ title: '', description: '', completed: false });
    }
  }

  toggleCompletion(id: string): void {
    this.store.dispatch(TaskActions.toggleTaskCompletion({ id }));
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.store.dispatch(TaskActions.deleteTask({ id }));
    }
  }

  updateTask(task: Task): void {
    this.store.dispatch(TaskActions.updateTask({ task }));
  }
}
