"use client";

import NewTasksListDialog from "@/components/NewTasksListDialog";
import TasksListCard from "@/components/TasksListCard";
import { useTasksList, useTasksListActions } from "@/context/tasksLists";
import React, { useEffect } from "react";

export default function UserPage({ params }: { params: { userId: string } }) {
  const { tasksLists } = useTasksList();
  const { fetchTasksLists } = useTasksListActions();

  useEffect(() => {
    fetchTasksLists(params.userId);
  }, [fetchTasksLists, params.userId]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 px-4 pt-[100px]">
      <h1 className="text-[2rem] font-bold">My To-Dos Lists</h1>
      <NewTasksListDialog />
      <div className="flex w-full flex-col items-center gap-4">
        {tasksLists &&
          tasksLists.map((tasksList) => (
            <TasksListCard
              key={tasksList.id}
              tasksList={tasksList}
              userId={params.userId}
            />
          ))}
      </div>
    </main>
  );
}
