import { createApi } from "@reduxjs/toolkit/query/react";
import { TASK_API_URL } from "../constants";
import {
	CreateTaskPayload,
	Page,
	PaginationFilterSortParams,
	Task,
	PatchTaskPayload,
} from "../types";
import axiosBaseQuery from "./axiosBaseQuery";

export const taskApi = createApi({
	reducerPath: "taskApi",
	tagTypes: ["Task"],
	baseQuery: axiosBaseQuery({ baseUrl: TASK_API_URL }),
	endpoints: (builder) => ({
		getTasks: builder.query<Page<Task>, PaginationFilterSortParams<Task>>({
			query: (filterSortParams) => ({
				url: "",
				method: "GET",
				params: filterSortParams,
			}),
			providesTags: ["Task"],
		}),
		addTask: builder.mutation<Task, CreateTaskPayload>({
			query: (task) => ({
				url: "",
				method: "POST",
				data: task,
			}),
			invalidatesTags: ["Task"],
		}),
		patchTask: builder.mutation<
			Task,
			{
				id: number;
				payload: PatchTaskPayload;
			}
		>({
			query: ({ id, payload }) => ({
				url: `/${id}`,
				method: "PATCH",
				data: payload,
			}),
			invalidatesTags: ["Task"],
		}),
	}),
});

export const { useAddTaskMutation, usePatchTaskMutation, useGetTasksQuery } =
	taskApi;
