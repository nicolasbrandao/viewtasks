import NewTasksListDialog from "@/components/NewTasksListDialog";
import TasksListCard from "@/components/TasksListCard";
import { apiUrl } from "@/lib/utils";
import { TasksList } from "@/types/entities";
import React from "react";

export default async function UserPage() {
  // TODO: use var as userId
  const tasksListsData = await fetch(
    `${apiUrl}/tasks-lists?userId=cluzkodz20000vg1886jcykru`,
    {
      method: "GET",
    },
  );

  const tasksLists: TasksList[] = await tasksListsData.json();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 pt-[100px]">
      <h1 className="text-[2rem] font-bold">My To-Dos Lists</h1>
      <NewTasksListDialog />
      <div className="flex w-full flex-col items-center gap-4">
        {tasksLists.map((tasksList) => (
          <TasksListCard key={tasksList.id} tasksList={tasksList} />
        ))}
      </div>
    </div>
  );
}
