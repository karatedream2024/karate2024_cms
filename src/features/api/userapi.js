import { api } from "../api";

const userApi = api.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({

    // Mutation to register a new user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/user/userregister',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // Query to get a user
    getUser: builder.query({
      query: (email) => ({
        url: '/user/getuser',
        method: 'POST',
        body: { email },
      }),
      providesTags: ['User'],
    }),
    getFullUser: builder.query({
        query: () => ({
          url: '/user/getfulluser',
          method: 'POST',
        }),
        providesTags: ['User'],
      }),

    // Mutation to update user information
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/user/updateuser',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    // Mutation to delete a user
    deleteUser: builder.mutation({
      query: (email) => ({
        url: '/user/deleteuser',
        method: 'DELETE',
        body: { email },
      }),
      invalidatesTags: ['User'],
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useGetUserQuery,
  useGetFullUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = userApi;
