import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { TasksListProvider } from "@/context/tasksLists";
import { TasksProvider } from "@/context/tasks";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ViewTasks",
  description: "Manage your tasks like a beast!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <TasksListProvider>
            <TasksProvider>
              <Navbar />
              {children}
            </TasksProvider>
          </TasksListProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
