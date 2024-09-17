import { api } from "../api";

const feeApi = api.injectEndpoints({
  reducerPath: "api",
  endpoints: (builder) => ({

    addUpdateFee: builder.mutation({
      query: (attenvalue) => ({
        url: '/fee/updatefee',
        method: "POST",
        body: attenvalue,
      }),
      invalidatesTags: ['Fee'], 
    }),   
    getAttenFee: builder.mutation({
      query: (studentIdValue) => ({
        url: '/fee/getfee',
        method: "POST",
        body: { studentId: studentIdValue }, // Ensure the backend expects this format
      }),
      invalidatesTags: ['Fee'],
    }),
    deleteFee: builder.mutation({
      query: ({id, studentId}) => ({
        url: `/fee/deletefee/${id}/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Fee'],
    }), 
      
}),

});

export const {useAddUpdateFeeMutation, useGetAttenFeeMutation, useDeleteFeeMutation} = feeApi;
