import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const USER_API = "/api/course"

export const courseApi = createApi({
    reducerPath: "courseApi",
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
            })
        }),
    })
});

export const { useCreateCourseMutation } = courseApi;