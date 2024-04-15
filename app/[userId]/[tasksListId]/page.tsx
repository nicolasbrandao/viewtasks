"use client";

import NewToDoDialog from "@/components/NewTaskDialog";
import TaskCard from "@/components/TaskCard";
import { useTasks, useTasksActions } from "@/context/tasks";
import { useTasksList, useTasksListActions } from "@/context/tasksLists";
import React, { useEffect } from "react";

export default function TasksListPage({
  params,
}: {
  params: { userId: string; tasksListId: string };
}) {
  const { tasksLists } = useTasksList();
  const { tasks } = useTasks();
  const { fetchTasks } = useTasksActions();
  const { fetchTasksLists } = useTasksListActions();

  useEffect(() => {
    fetchTasks(params.tasksListId);
    fetchTasksLists(params.userId);
  }, [
    fetchTasks,
    fetchTasksLists,
    params.tasksListId,
    params.userId
  ]);

  const tasksList = tasksLists.find(
    (tasksList) => tasksList.id === params.tasksListId,
  );

  console.log(tasksList);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 px-4 pt-[100px]">
      <h1 className="place-self-start text-[3rem] font-bold">
        {tasksList?.title}
      </h1>
      <NewToDoDialog />
      <h2 className="place-self-start text-[2rem] font-bold">To-Dos</h2>
      {tasks &&
        tasks
          .filter((task) => !task.completed)
          .map((task) => <TaskCard key={task.id} task={task} />)}
      {tasks.filter((task) => task.completed).length > 0 && (
        <h2 className="place-self-start text-[2rem]">Done!</h2>
      )}
      {tasks &&
        tasks
          .filter((task) => task.completed)
          .map((task) => <TaskCard key={task.id} task={task} />)}
    </main>
  );
}
