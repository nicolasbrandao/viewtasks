import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditTasksListDialog from "./EditTasksListDialog";
import { TasksList } from "@/types/entities";

type Props = {
  tasksList: TasksList;
};

export default function TasksListCard({ tasksList }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{tasksList.title}</CardTitle>
        <CardDescription>Created at XX-XX-XX</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <EditTasksListDialog tasksList={tasksList} />
        <Button>View</Button>
      </CardFooter>
    </Card>
  );
}
