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

export default function TasksListCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>To-Do List Title</CardTitle>
        <CardDescription>Created at XX-XX-XX</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <EditTasksListDialog />
        <Button>View</Button>
      </CardFooter>
    </Card>
  );
}
