"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import tasksListForm from "@/lib/zod/TasksListForm.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTasksActions } from "@/context/tasks";

export default function NewTasksListDialog() {
  const { createTasksList } = useTasksActions();
  const form = useForm<z.infer<typeof tasksListForm>>({
    resolver: zodResolver(tasksListForm),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof tasksListForm>) => {
    createTasksList(values.title);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full max-w-[400px] gap-2">
          <CirclePlus />
          Add New To-Dos List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New To-Dos List</DialogTitle>
          <DialogDescription>
            Create a new To-Dos List here. Click save when you&apos;re done.
          </DialogDescription>
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
                    <Input placeholder="To-Dos List title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save To-Dos List</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
