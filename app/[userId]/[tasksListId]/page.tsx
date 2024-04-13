import NewToDoDialog from "@/components/NewToDoDialog";
import TaskCard from "@/components/TaskCard";
import React from "react";

export default function TasksListPage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 px-4 pt-[100px]">
      <h1 className="place-self-start text-[3rem] font-bold">
        Task List Title
      </h1>
      <NewToDoDialog />
      <h2 className="place-self-start text-[2rem] font-bold">To-Dos</h2>
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <h2 className="place-self-start text-[2rem]">Done!</h2>
      <TaskCard completed />
      <TaskCard completed />
      <TaskCard completed />
    </div>
  );
}
