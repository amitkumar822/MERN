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
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/get-course-by-id/${courseId}`,
                method: "GET",
                
            })
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
                url: `/edit-course/${courseId}`,
                method: "PUT",
                body: formData,
            })
        }),

        // Lectures routes defined
        createLecture: builder.mutation({
            query: ({lectureTitle, courseId}) => ({
                url: `/create/${courseId}/lecture`,
                method: "POST",
                body: {lectureTitle},
            })
        }),
        getCourseLectures: builder.query({
            query: (courseId) => ({
                url: `/get-lecture/${courseId}/lecture`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
        })
    })
});

export const { 
    useCreateCourseMutation,
    useGetCreatedCoursesQuery,
    useGetCourseByIdQuery,
    useEditCourseMutation,

    // Define lecture
    useCreateLectureMutation,
    useGetCourseLecturesQuery
} = courseApi;