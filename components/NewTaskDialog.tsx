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
import { useTasksActions } from "@/context/tasks";
import taskForm from "@/lib/zod/TaskForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

type Props = {
  tasksListId: string;
};

export default function NewToDoDialog({ tasksListId }: Props) {
  const { createTask } = useTasksActions();
  const form = useForm<z.infer<typeof taskForm>>({
    resolver: zodResolver(taskForm),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof taskForm>) => {
    createTask(tasksListId, values.title);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full max-w-[400px] gap-2">
          <CirclePlus />
          Add New To-Do
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New To-Do</DialogTitle>
          <DialogDescription>
            Create a new To-Do here. Click save when you&apos;re done.
          </DialogDescription>
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">Error submitting task</p>
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
                    <Input placeholder="To-Dos List title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} type="submit">
              Save To-Do
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
