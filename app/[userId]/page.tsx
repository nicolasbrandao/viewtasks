import TasksListCard from "@/components/TasksListCard";
import React from "react";

export default function UserPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-[100px]">
      <h1 className="text-[2rem] font-bold">My To-Dos Lists</h1>
      <div className="flex flex-col gap-4">
        <TasksListCard />
        <TasksListCard />
        <TasksListCard />
        <TasksListCard />
      </div>
    </div>
  );
}
