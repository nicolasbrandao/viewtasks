import NewToDoDialog from "@/components/NewToDoDialog";
import TaskCard from "@/components/TaskCard";
import { apiUrl } from "@/lib/utils";
import { Task, TasksList } from "@/types/entities";
import { notFound } from "next/navigation";
import React from "react";

export default async function TasksListPage({
  params,
}: {
  params: { tasksListId: string };
}) {
  const tasksList: TasksList = await fetch(
    `${apiUrl}/tasks-lists/${params.tasksListId}`,
    {
      method: "GET",
    },
  )
    .then((res) => res.json())
    .catch(() => notFound());

  if (!tasksList) return notFound();

  const tasks: Task[] = await fetch(
    `${apiUrl}/tasks?tasksListId=${params.tasksListId}`,
    {
      method: "GET",
    },
  )
    .then((res) => res.json())
    .catch(() => notFound());

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 px-4 pt-[100px]">
      <h1 className="place-self-start text-[3rem] font-bold">
        {tasksList.title}
      </h1>
      <NewToDoDialog />
      <h2 className="place-self-start text-[2rem] font-bold">To-Dos</h2>
      {tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      {tasks.filter((task) => task.completed).length > 0 && (
        <h2 className="place-self-start text-[2rem]">Done!</h2>
      )}
      {tasks
        .filter((task) => task.completed)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </main>
  );
}
