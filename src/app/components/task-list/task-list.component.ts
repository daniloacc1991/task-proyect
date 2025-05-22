import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store';
import { Task } from '../../models/task.model';
import * as TaskActions from '../../store/task/task.actions';
import * as TaskSelectors from '../../store/task/task.selectors';
import Swal from 'sweetalert2';

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

  toggleCompletion(task: Task): void {
    this.store.dispatch(
      TaskActions.updateTask({ task: { ...task, completed: !task.completed } }),
    );
  }

  deleteTask(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        this.store.dispatch(TaskActions.deleteTask({ id }));
        Swal.fire('Deleted!', 'The task has been deleted.', 'success');
      }
    });
  }

  updateTask(task: Task): void {
    this.store.dispatch(TaskActions.updateTask({ task }));
  }
}
