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
import { useTasksListActions } from "@/context/tasksLists";
import { decodeUserInfo } from "@/lib/utils";
import { CookieValueTypes, getCookie } from "cookies-next";

export default function NewTasksListDialog() {
  const token: CookieValueTypes = getCookie("access_token");

  let credentials = { sub: "", email: "" };
  if (token) credentials = decodeUserInfo(token);

  const { createTasksList } = useTasksListActions();
  const form = useForm<z.infer<typeof tasksListForm>>({
    resolver: zodResolver(tasksListForm),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof tasksListForm>) => {
    createTasksList(credentials.sub, values.title);
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
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              Error submitting tasks list
            </p>
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
              Save To-Dos List
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
