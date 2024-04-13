import React from "react";
import { Button } from "./ui/button";
import { Square, SquareCheckBig } from "lucide-react";
import EditTaskDialog from "./EditTaskDialog";
import { cn } from "@/lib/utils";

type Props = {
  completed?: boolean;
};

export default function TaskCard({ completed }: Props) {
  const containerClass = cn(
    "flex w-full items-center justify-between space-x-4 rounded-lg border p-4",
    completed ? "border-muted" : "bg-background",
  );

  const titleClass = cn(completed && "text-muted-foreground");

  return (
    <div className={containerClass}>
      <EditTaskDialog />
      <div className={titleClass}>Task Title</div>
      <Button size={"icon"}>
        {completed ? <SquareCheckBig /> : <Square />}
      </Button>
    </div>
  );
}
