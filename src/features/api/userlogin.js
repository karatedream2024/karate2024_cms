import { api } from "../api";

const bookingApi = api.injectEndpoints({
  reducerPath: "api",
  endpoints: (builder) => ({

    addDojo: builder.mutation({
      query: (dojovalue) => ({
        url: '/dojo/adddojo',
        method: "POST",
        body: dojovalue,
      }),
      invalidatesTags: ['Dojo'],
    }),   
 
    deleteDojo: builder.mutation({
      query: ({id}) => ({
        url: `/dojo/deletedojo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Dojo'],
    }),  

    getAllDojo: builder.query({
      query: () => ({
          url: '/dojo/getdojo',
          method: "GET",
      }),
      providesTags: ['Dojo'],
  
  }),

  updateDojo: builder.mutation({
    query: ({id,values}) => ({
      url: `/dojo/updatedojo/${id}`,
      method: "PUT",
        invalidatesTags: ['Dojo'],
      body:values
    }),
    invalidatesTags: ['Dojo'],
  }),

}),

});

export const {useAddDojoMutation, useGetAllDojoQuery, useDeleteDojoMutation, useAddMarkMutation, useGetOneStudentQuery, useGetMarkQuery, useUpdateDojoMutation} = bookingApi;
