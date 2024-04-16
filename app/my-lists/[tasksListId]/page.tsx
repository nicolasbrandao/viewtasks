"use client";

import NewToDoDialog from "@/components/NewTaskDialog";
import TaskCard from "@/components/TaskCard";
import { useTasks, useTasksActions } from "@/context/tasks";
import { useTasksList, useTasksListActions } from "@/context/tasksLists";
import { decodeUserInfo } from "@/lib/utils";
import { getCookie, CookieValueTypes } from "cookies-next";
import React, { useEffect } from "react";

export default function TasksListPage({
  params,
}: {
  params: { tasksListId: string };
}) {
  const { tasksLists } = useTasksList();
  const { tasks } = useTasks();
  const { fetchTasks } = useTasksActions();
  const { fetchTasksLists } = useTasksListActions();

  const token: CookieValueTypes = getCookie("access_token");

  let credentials = { sub: "", email: "" };
  if (token) credentials = decodeUserInfo(token);

  useEffect(() => {
    fetchTasks(params.tasksListId);
    fetchTasksLists(credentials.sub);
  }, [
    fetchTasks,
    fetchTasksLists,
    params.tasksListId,
    credentials.sub
  ]);

  const tasksList = tasksLists.find(
    (tasksList) => tasksList.id === params.tasksListId,
  );

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 px-4 pt-[100px]">
      <h1 className="w-full place-self-start truncate text-[3rem] font-bold">
        {tasksList?.title}
      </h1>
      <NewToDoDialog tasksListId={tasksList?.id as string} />
      <h2 className="place-self-start text-[2rem] font-bold">To-Dos</h2>
      {tasks.length === 0 && (
        <p className="text-muted-foreground">No To-Dos yet</p>
      )}
      {tasks.length > 0 &&
        tasks
          .filter((task) => !task.completed)
          .map((task) => <TaskCard key={task.id} task={task} />)}
      {tasks.filter((task) => task.completed).length > 0 && (
        <h2 className="place-self-start text-[2rem]">Done!</h2>
      )}
      {tasks.length > 0 &&
        tasks
          .filter((task) => task.completed)
          .map((task) => <TaskCard key={task.id} task={task} />)}
    </main>
  );
}
