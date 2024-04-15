"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  PropsWithChildren,
  useMemo,
} from "react";
import { ActionType } from "@/types/context";
import { TasksList } from "@/types/entities";
import { API_URL } from "@/lib/utils";

export const actionTypes = {
  deleteTasksListStart: "DELETE_TASKS_LIST_START",
  deleteTasksListSuccess: "DELETE_TASKS_LIST_SUCCESS",
  deleteTasksListFailed: "DELETE_TASKS_LIST_FAILED",
  fetchTasksListStart: "FETCH_TASKS_LIST_START",
  fetchTasksListSuccess: "FETCH_TASKS_LIST_SUCCESS",
  fetchTasksListFailed: "FETCH_TASKS_LIST_FAILED",
  createTasksListStart: "CREATE_TASKS_LIST_START",
  createTasksListSuccess: "CREATE_TASKS_LIST_SUCCESS",
  createTasksListFailed: "CREATE_TASKS_LIST_FAILED",
  editTasksListStart: "EDIT_TASKS_LIST_START",
  editTasksListSuccess: "EDIT_TASKS_LIST_SUCCESS",
  editTasksListFailed: "EDIT_TASKS_LIST_FAILED",
};

type StateType = {
  tasksLists: TasksList[];
  status: "idle" | "loading" | "failed";
  error?: string;
};

const initialState: StateType = {
  tasksLists: [],
  status: "idle",
};

type Actions = {
  deleteTasksList(id: string): void;
  fetchTasksLists(userId: string): void;
  createTasksList(title: string): void;
  editTasksList(id: string, title: string): void;
};

const reducer = (
  state: StateType,
  action: ActionType<TasksList[] | string | TasksList>,
): StateType => {
  // TODO: improve actions types
  switch (action.type) {
    case actionTypes.deleteTasksListStart:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.deleteTasksListSuccess: {
      const updatedTasksLists = state.tasksLists.filter(
        (list) => list.id !== action.payload,
      );
      return {
        ...state,
        status: "idle",
        tasksLists: updatedTasksLists,
      };
    }
    case actionTypes.deleteTasksListFailed:
      return {
        ...state,
        status: "failed",
        error: action.payload as string,
      };
    case actionTypes.fetchTasksListStart:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.fetchTasksListSuccess: {
      return {
        ...state,
        status: "idle",
        tasksLists: action.payload as TasksList[],
      };
    }
    case actionTypes.fetchTasksListFailed:
      return {
        ...state,
        status: "failed",
        error: action.payload as string,
      };
    case actionTypes.createTasksListStart:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.createTasksListSuccess: {
      return {
        ...state,
        status: "idle",
        tasksLists: [...state.tasksLists, action.payload as TasksList],
      };
    }
    case actionTypes.createTasksListFailed:
      return {
        ...state,
        status: "failed",
        error: action.payload as string,
      };
    case actionTypes.editTasksListStart:
      return {
        ...state,
        status: "loading",
      };
    case actionTypes.editTasksListSuccess: {
      const taskList = action.payload as TasksList;
      const updatedTasksLists = state.tasksLists.map((list) =>
        list.id !== taskList.id ? list : { ...list, title: taskList.title },
      );
      return {
        ...state,
        status: "idle",
        tasksLists: updatedTasksLists,
      };
    }
    case actionTypes.editTasksListFailed:
      return {
        ...state,
        status: "failed",
        error: action.payload as string,
      };
    default:
      return state;
  }
};

export const TasksListContext = createContext(initialState);

export const TasksListActionContext = createContext<Actions>({
  deleteTasksList: () => {},
  fetchTasksLists: () => {},
  createTasksList: () => {},
  editTasksList: () => {},
});

export function TasksListProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions: Actions = useMemo(
    () => ({
      async deleteTasksList(id: string) {
        try {
          dispatch({ type: actionTypes.deleteTasksListStart });

          await fetch(`${API_URL}/tasks-lists/${id}`, { method: "DELETE" });

          dispatch({ type: actionTypes.deleteTasksListSuccess, payload: id });
        } catch (error) {
          dispatch({
            type: actionTypes.deleteTasksListFailed,
            payload: String(error),
          });

          console.error("Error deleting tasks list:", error);
        }
      },

      async fetchTasksLists(userId) {
        dispatch({ type: actionTypes.fetchTasksListStart });
        try {
          const tasksListsResponse = await fetch(
            `${API_URL}/tasks-lists?userId=${userId}`,
            {
              method: "GET",
            },
          );
          const tasksListsData: TasksList[] = await tasksListsResponse.json();

          dispatch({
            type: actionTypes.fetchTasksListSuccess,
            payload: tasksListsData,
          });
        } catch (error) {
          dispatch({
            type: actionTypes.fetchTasksListFailed,
            payload: String(error),
          });

          console.error("Error fetching tasks lists:", error);
        }
      },

      async createTasksList(title: string) {
        dispatch({ type: actionTypes.createTasksListStart });
        try {
          const res = await fetch(`${API_URL}/tasks-lists`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // TODO: fix this
            body: JSON.stringify({
              title,
              userId: "cluzkodz20000vg1886jcykru",
            }),
          });

          const tasksList = (await res.json()) as TasksList;

          dispatch({
            type: actionTypes.createTasksListSuccess,
            payload: tasksList,
          });
        } catch (error) {
          dispatch({
            type: actionTypes.createTasksListFailed,
            payload: String(error),
          });

          console.error("Error creating tasks lists:", error);
        }
      },

      async editTasksList(id: string, title: string) {
        dispatch({ type: actionTypes.editTasksListStart });
        try {
          const res = await fetch(`${API_URL}/tasks-lists/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, title }),
          });

          const tasksList = (await res.json()) as TasksList;

          dispatch({
            type: actionTypes.editTasksListSuccess,
            payload: tasksList,
          });
        } catch (error) {
          dispatch({
            type: actionTypes.editTasksListFailed,
            payload: String(error),
          });

          console.error("Error editing tasks lists:", error);
        }
      },
    }),
    [dispatch],
  );

  return (
    <TasksListContext.Provider value={state}>
      <TasksListActionContext.Provider value={actions}>
        {children}
      </TasksListActionContext.Provider>
    </TasksListContext.Provider>
  );
}

export function useTasksList() {
  return useContext(TasksListContext);
}

export function useTasksListActions() {
  return useContext(TasksListActionContext);
}
