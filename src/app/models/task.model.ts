export interface Task {
  id: string;
  title: string;
  description?: string;
  loading: boolean;
  completed: boolean;
  createdAt: Date;
}
