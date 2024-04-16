"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TasksList } from "@/types/entities";
import { useTasksListActions } from "@/context/tasksLists";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import tasksListForm from "@/lib/zod/TasksListForm.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  tasksList: TasksList;
};

export default function EditTasksListDialog({ tasksList }: Props) {
  const { editTasksList, deleteTasksList } = useTasksListActions();
  const form = useForm<z.infer<typeof tasksListForm>>({
    resolver: zodResolver(tasksListForm),
    defaultValues: {
      title: tasksList.title,
    },
  });

  const onSubmit = async (values: z.infer<typeof tasksListForm>) => {
    editTasksList(tasksList.id, values.title);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit List</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit tasks list</DialogTitle>
          <DialogDescription>
            Make changes to your tasks list here. Click save when you&apos;re
            done.
          </DialogDescription>
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">Error submitting changes</p>
          )}
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex w-full max-w-[400px] flex-col space-y-8 p-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="To-Do title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit">
              Save To-Dos List
            </Button>
          </form>
        </Form>
        <DialogFooter className="flex-row justify-between gap-2 px-4">
          <Button
            disabled={form.formState.isSubmitting}
            onClick={() => deleteTasksList(tasksList.id)}
            type="button"
            variant={"destructive"}
          >
            Delete List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
