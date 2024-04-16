"use client";

import NewTasksListDialog from "@/components/NewTasksListDialog";
import TasksListCard from "@/components/TasksListCard";
import { useTasksList, useTasksListActions } from "@/context/tasksLists";
import { decodeUserInfo } from "@/lib/utils";
import { getCookie, CookieValueTypes } from "cookies-next";
import { LoaderCircle } from "lucide-react";
import React, { useEffect } from "react";

export default function UserPage() {
  const { tasksLists, status, error } = useTasksList();
  const { fetchTasksLists } = useTasksListActions();
  const token: CookieValueTypes = getCookie("access_token");

  let credentials = { sub: "", email: "" };
  if (token) credentials = decodeUserInfo(token);

  useEffect(() => {
    fetchTasksLists(credentials.sub);
  }, [fetchTasksLists, credentials.sub]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 px-4 pt-[100px]">
      <h1 className="text-[2rem] font-bold">My To-Dos Lists</h1>
      <NewTasksListDialog />
      <div className="flex w-full flex-col items-center gap-4">
        {status === "loading" && <LoaderCircle className="animate-spin" />}
        {error && <p className="text-destructive">{error}</p>}
        {tasksLists.length > 0 ? (
          tasksLists.map((tasksList) => (
            <TasksListCard key={tasksList.id} tasksList={tasksList} />
          ))
        ) : (
          <p className="text-muted-foreground">No To-Dos list yet</p>
        )}
      </div>
    </main>
  );
}
