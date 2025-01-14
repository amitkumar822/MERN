import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "/api/user"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include", // Send cookies with request
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "/register",
                method: "POST",
                body: inputData,
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "/login",
                method: "POST",
                body: inputData
            }),
            
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user: result.data.data.user}));
                } catch (error) {
                    console.error("LoginError: ", error);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.error("logoutUser Error: ", error);
                }
            }
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: "/profile",
                method: "GET"
            }),

            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user: result.data.data}));
                } catch (error) {
                    console.error("LoginError: ", error);
                }
            }
        }),
        updateUserProfile: builder.mutation({
            query: (formData) => ({
                url: "/update-profile",
                method: "PUT",
                body: formData,
            })
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation
} = authApi;