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
import editTaskForm from "@/lib/zod/EditTaskForm.schema";
import { apiUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Props = {
  task: Task;
};

export default function EditTaskDialog({ task }: Props) {
  const form = useForm<z.infer<typeof editTaskForm>>({
    resolver: zodResolver(editTaskForm),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editTaskForm>) => {
    await fetch(`${apiUrl}/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // TODO: properly do this with scyncd value from the db
      body: JSON.stringify(values),
    });
  };

  const handleOnDelete = async () => {
    await fetch(`${apiUrl}/tasks/${task.id}`, {
      method: "DELETE",
    });
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
            <Button type="submit">Save To-Dos List</Button>
          </form>
        </Form>
        <DialogFooter className="flex-row justify-between gap-2 px-4">
          <Button
            onClick={handleOnDelete}
            type="submit"
            variant={"destructive"}
          >
            Delete Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
