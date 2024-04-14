"use client";

import React from "react";
import { Button } from "./ui/button";
import { Square, SquareCheckBig } from "lucide-react";
import EditTaskDialog from "./EditTaskDialog";
import { apiUrl, cn } from "@/lib/utils";
import { Task } from "@/types/entities";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const containerClass = cn(
    "flex w-full items-center justify-between space-x-4 rounded-lg border p-4",
    task.completed ? "border-muted" : "bg-background",
  );

  const titleClass = cn(task.completed && "text-muted-foreground");

  const handleToggleCompleted = async () => {
    await fetch(`${apiUrl}/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // TODO: properly do this with szynced value from the db
      body: JSON.stringify({ completed: true }),
    });
  };

  return (
    <div className={containerClass}>
      <EditTaskDialog task={task} />
      <div className={titleClass}>{task.title}</div>
      <Button onClick={handleToggleCompleted} size={"icon"}>
        {task.completed ? <SquareCheckBig /> : <Square />}
      </Button>
    </div>
  );
}
