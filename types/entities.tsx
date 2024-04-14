export type TasksList = {
  id: string;
  userId: string;
  title: string;
};

export type Task = {
  id: string;
  tasksListId: string;
  title: string;
  completed: boolean;
};
