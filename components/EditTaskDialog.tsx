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
import { Task } from "@/types/entities";
import { Pencil } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import taskForm from "@/lib/zod/TaskForm.schema";
import { useTasksActions } from "@/context/tasks";

type Props = {
  task: Task;
};

export default function EditTaskDialog({ task }: Props) {
  const { editTask, deleteTask } = useTasksActions();
  const form = useForm<z.infer<typeof taskForm>>({
    resolver: zodResolver(taskForm),
    defaultValues: {
      title: task.title,
    },
  });

  const onSubmit = async (values: z.infer<typeof taskForm>) => {
    editTask(task.id, values.title);
  };

  const handleOnDelete = async () => {
    deleteTask(task.id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>
            Make changes to your tasks here. Click save when you&apos;re done.
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
            onClick={handleOnDelete}
            variant={"destructive"}
          >
            Delete Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
