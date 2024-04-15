"use client";

import React from "react";
import { Button } from "./ui/button";
import { Square, SquareCheckBig } from "lucide-react";
import EditTaskDialog from "./EditTaskDialog";
import { cn } from "@/lib/utils";
import { Task } from "@/types/entities";
import { useTasksActions } from "@/context/tasks";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  const { editTask } = useTasksActions();
  const containerClass = cn(
    "flex w-full items-center justify-between space-x-4 rounded-lg border p-4",
    task.completed ? "border-muted" : "bg-background",
  );

  const titleClass = cn(task.completed && "text-muted-foreground");

  // TODO: verify why this is not updating state/render
  const handleToggleCompleted = async () => {
    editTask(task.id, task.title, !task.completed);
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
