
import { api } from "../api";

const contactApi = api.injectEndpoints({
    reducerPath: "api",
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: (contactData) => ({
        url: '/contact/addcontact',
        method: 'POST',
        body: contactData,
      }),
      invalidatesTags: ['Contact'],
    }),
    getAllContacts: builder.query({
      query: () => '/contact/getcontact',
      providesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/deletecontact/${id}`, // Assuming you use ID in URL path
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useAddContactMutation,
  useGetAllContactsQuery,
  useDeleteContactMutation,
} = contactApi;
