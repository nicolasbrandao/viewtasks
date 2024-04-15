"use client";

import NewToDoDialog from "@/components/NewTaskDialog";
import TaskCard from "@/components/TaskCard";
import { useTasks, useTasksActions } from "@/context/tasks";
import React, { useEffect } from "react";

export default function TasksListPage({
  params,
}: {
  params: { tasksListId: string };
}) {
  const { tasks } = useTasks();
  const { fetchTasks } = useTasksActions();

  useEffect(() => {
    fetchTasks(params.tasksListId);
  }, [fetchTasks, params.tasksListId]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 px-4 pt-[100px]">
      <h1 className="place-self-start text-[3rem] font-bold">
        {/* TODO: use actual tasksList title */}
        {/* {tasksList.title} */}
        TITLE
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
