import { createApi } from "@reduxjs/toolkit/query/react";
import { TASK_API_URL } from "../constants";
import { BaseTask, Task } from "../types";
import axiosBaseQuery from "./axiosBaseQuery";

export const taskApi = createApi({
	reducerPath: "taskApi",
	tagTypes: ["Task"],
	baseQuery: axiosBaseQuery({ baseUrl: TASK_API_URL }),
	endpoints: (builder) => ({
		addTask: builder.mutation<Task, BaseTask>({
			query: (task) => ({
				url: "",
				method: "POST",
				data: task,
			}),
			invalidatesTags: ["Task"],
		}),
	}),
});

export const { useAddTaskMutation } = taskApi;
