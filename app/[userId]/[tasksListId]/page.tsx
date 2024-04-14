import NewToDoDialog from "@/components/NewToDoDialog";
import TaskCard from "@/components/TaskCard";
import { apiUrl } from "@/lib/utils";
import { Task, TasksList } from "@/types/entities";
import React from "react";

export default async function TasksListPage({
  params,
}: {
  params: { tasksListId: string };
}) {
  const tasksListData = await fetch(
    `${apiUrl}/tasks-lists/${params.tasksListId}`,
    {
      method: "GET",
    },
  );

  const tasksList: TasksList = await tasksListData.json();

  const tasksData = await fetch(
    `${apiUrl}/tasks?tasksListId=${params.tasksListId}`,
    {
      method: "GET",
    },
  );

  const tasks: Task[] = await tasksData.json();

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
