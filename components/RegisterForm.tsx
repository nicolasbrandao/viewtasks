"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import registerForm from "@/lib/zod/RegisterForm.schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerForm>>({
    resolver: zodResolver(registerForm.strict()),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerForm>) => {
    try {
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      router.push("/login");
    } catch (e) {
      // TODO: properly handle errors
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      {form.formState.errors.root && (
        <p className="destructive">Error trying to register</p>
      )}
      <form
        className="flex w-full max-w-[400px] flex-col space-y-8 p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input placeholder="Ex. john.doe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password*</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
