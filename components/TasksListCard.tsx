import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EditTasksListDialog from "./EditTasksListDialog";
import { TasksList } from "@/types/entities";
import Link from "next/link";

type Props = {
  tasksList: TasksList;
};

export default function TasksListCard({ tasksList }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="truncate w-full">{tasksList.title}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <EditTasksListDialog tasksList={tasksList} />
        <Link href={`/my-lists/${tasksList.id}`}>
          <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
