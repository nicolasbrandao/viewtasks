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
import Link from "next/link";

type Props = {
  tasksList: TasksList;
  userId: string;
};

export default function TasksListCard({ tasksList, userId }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{tasksList.title}</CardTitle>
        <CardDescription>Created at XX-XX-XX</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <EditTasksListDialog tasksList={tasksList} />
        <Link href={`${userId}/${tasksList.id}`}>
          <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
