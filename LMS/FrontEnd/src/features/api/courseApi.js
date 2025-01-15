import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const USER_API = "/api/course"

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Refetch_Create_Course"],
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({courseTitle, category}) => ({
                url: "/create",
                method: "POST",
                body: {courseTitle, category},
            }),
            invalidatesTags: ["Refetch_Create_Course"]
        }),
        getCreatedCourses: builder.query({
            query: () => ({
                url: "/get-courses",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }),
            providesTags: ["Refetch_Create_Course"]
        })
    })
});

export const { useCreateCourseMutation, useGetCreatedCoursesQuery } = courseApi;