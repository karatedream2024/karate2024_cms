import { api } from "../api";

const registrationApi = api.injectEndpoints({
  reducerPath: "api",
  endpoints: (builder) => ({
    addRegistration: builder.mutation({
      query: (registrationData) => ({
        url: '/register/addregister',
        method: "POST",
        body: registrationData,
      }),
      invalidatesTags: ['Registration'],
    }),
    
    deleteRegistration: builder.mutation({
      query: (id) => ({
        url: `/register/deleteregister/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Registration'],
    }),

    getAllRegistrations: builder.query({
      query: () => ({
        url: '/register/getregister',
        method: "GET",
      }),
      providesTags: ['Registration'],
    }),

  }),
});

export const {
  useAddRegistrationMutation,
  useDeleteRegistrationMutation,
  useGetAllRegistrationsQuery,
} = registrationApi;
