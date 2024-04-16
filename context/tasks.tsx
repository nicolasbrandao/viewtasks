"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  PropsWithChildren,
  useMemo,
} from "react";
import { ActionType } from "@/types/context";
import { Task } from "@/types/entities";
import { API_URL } from "@/lib/utils";

export const actionTypes = {
  deleteTaskStart: "DELETE_TASK_START",
  deleteTaskSuccess: "DELETE_TASK_SUCCESS",
  deleteTaskFailed: "DELETE_TASK_FAILED",
  fetchTasksStart: "FETCH_TASKS_START",
  fetchTasksSuccess: "FETCH_TASKS_SUCCESS",
  fetchTasksFailed: "FETCH_TASKS_FAILED",
  createTaskStart: "CREATE_TASK_START",
  createTaskSuccess: "CREATE_TASK_SUCCESS",
  createTaskFailed: "CREATE_TASK_FAILED",
  editTaskStart: "EDIT_TASK_START",
  editTaskSuccess: "EDIT_TASK_SUCCESS",
  editTaskFailed: "EDIT_TASK_FAILED",
};

type StateType = {
  tasks: Task[];
  status: "idle" | "loading" | "failed";
  error?: string;
};

const initialState: StateType = {
  tasks: [],
  status: "idle",
};

type Actions = {
  deleteTask(id: string): void;
  fetchTasks(tasksListId: string): void;
  createTask(tasksListId: string, title: string): void;
  editTask(id: string, title?: string, completed?: boolean): void;
};

const reducer = (
  state: StateType,
  action: ActionType<Task | string | boolean | Task[]>,
): StateType => {
  // TODO: improve actions types
  switch (action.type) {
    case actionTypes.deleteTaskStart:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.deleteTaskSuccess: {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload,
      );
      return {
        ...state,
        status: "idle",
        tasks: updatedTasks,
      };
    }
    case actionTypes.deleteTaskFailed:
      return {
        ...state,
        status: "failed",
        error: action.payload as string,
      };
    case actionTypes.fetchTasksStart:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.fetchTasksSuccess: {
      return {
        ...state,
        status: "idle",
        tasks: action.payload as Task[],
      };
    }
    case actionTypes.fetchTasksFailed:
      return {
        ...state,
        status: "failed",
        error: action.payload as string,
      };
    case actionTypes.createTaskStart:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.createTaskSuccess: {
      return {
        ...state,
        status: "idle",
        tasks: [...state.tasks, action.payload as Task],
      };
    }
    case actionTypes.createTaskFailed:
      return {
        ...state,
        status: "failed",
        error: action.payload as string,
      };
    case actionTypes.editTaskStart:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.editTaskSuccess: {
      const updatedTask = action.payload as Task;
      const updatedTasks = state.tasks.map((task) =>
        task.id !== updatedTask.id ? task : { ...task, ...updatedTask },
      );
      return {
        ...state,
        status: "idle",
        tasks: updatedTasks,
      };
    }
    case actionTypes.editTaskFailed:
      return {
        ...state,
        status: "failed",
        error: action.payload as string,
      };
    default:
      return state;
  }
};

export const TasksContext = createContext(initialState);

export const TasksActionContext = createContext<Actions>({
  deleteTask: () => {},
  fetchTasks: () => {},
  createTask: () => {},
  editTask: () => {},
});

export function TasksProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: Actions = useMemo(
    () => ({
      async deleteTask(id: string) {
        try {
          dispatch({ type: actionTypes.deleteTaskStart });

          await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });

          dispatch({ type: actionTypes.deleteTaskSuccess, payload: id });
        } catch (error) {
          dispatch({
            type: actionTypes.deleteTaskFailed,
            payload: String(error),
          });

          console.error("Error deleting task:", error);
        }
      },

      async fetchTasks(tasksListId) {
        dispatch({ type: actionTypes.fetchTasksStart });
        try {
          const tasksResponse = await fetch(
            `${API_URL}/tasks?tasksListId=${tasksListId}`,
            {
              method: "GET",
            },
          );
          const tasksData: Task[] = await tasksResponse.json();

          dispatch({
            type: actionTypes.fetchTasksSuccess,
            payload: tasksData as Task[],
          });
        } catch (error) {
          dispatch({
            type: actionTypes.fetchTasksFailed,
            payload: String(error),
          });

          console.error("Error fetching tasks:", error);
        }
      },

      async createTask(tasksListId: string, title: string) {
        dispatch({ type: actionTypes.createTaskStart });
        try {
          const taskResponse = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              tasksListId,
            }),
          });

          const task = (await taskResponse.json()) as Task;

          dispatch({
            type: actionTypes.createTaskSuccess,
            payload: task,
          });
        } catch (error) {
          dispatch({
            type: actionTypes.createTaskFailed,
            payload: String(error),
          });

          console.error("Error creating task:", error);
        }
      },

      async editTask(id: string, title?: string, completed?: boolean) {
        dispatch({ type: actionTypes.editTaskStart });
        try {
          const taskResponse = await fetch(`${API_URL}/tasks/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, completed }),
          });

          const task = (await taskResponse.json()) as Task;

          dispatch({
            type: actionTypes.editTaskSuccess,
            payload: task,
          });
        } catch (error) {
          dispatch({
            type: actionTypes.editTaskFailed,
            payload: String(error),
          });

          console.error("Error editing task:", error);
        }
      },
    }),
    [dispatch],
  );

  return (
    <TasksContext.Provider value={state}>
      <TasksActionContext.Provider value={actions}>
        {children}
      </TasksActionContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksActions() {
  return useContext(TasksActionContext);
}
