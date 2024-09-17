
import { api } from "../api";

const bookingApi = api.injectEndpoints({
  reducerPath: "api",
  endpoints: (builder) => ({

    addEvent: builder.mutation({
      query: (eventvalue) => ({
        url: '/event/addevent',
        method: "POST",
        body: eventvalue,
      }),
      invalidatesTags: ['Event'],
    }),   
 
    deleteEvent: builder.mutation({
      query: ({id}) => ({
        url: `/event/deleteevent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Event'],
    }),  

    getAllEvent: builder.query({
      query: () => ({
          url: '/event/getevent',
          method: "GET",
      }),
      providesTags: ['Event'],
  
  }),

  updateEvent: builder.mutation({
    query: ({id,values}) => ({
      url: `/event/updateevent/${id}`,
      method: "PUT",
      body:values
    }),
    invalidatesTags: ['Event'],
  }),

}),

});

export const {useAddEventMutation, useGetAllEventQuery, useDeleteEventMutation, useUpdateEventMutation} = bookingApi;