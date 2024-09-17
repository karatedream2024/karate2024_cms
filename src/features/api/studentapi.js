    import { api } from "../api";

    const bookingApi = api.injectEndpoints({
    reducerPath: "api",
    endpoints: (builder) => ({

        addStudent: builder.mutation({
        query: (value) => ({
            url: '/student/addstudent',
            method: "POST",
            body: value,
        }),
        invalidatesTags: ['Student'],
        }),   
    
        deleteStudent: builder.mutation({
        query: ({id}) => ({
            url: `/student/deletestudent/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ['Student'],
        }),  

        getAllStudent: builder.query({
            query: ({ dojodata, search }) => {
              // Construct the query string manually
              const queryString = new URLSearchParams({
                dojodata,
                search
              }).toString();
          
              return {
                url: `/student/getstudent/?${queryString}`,
                method: 'GET'
              };
            },
            providesTags: ['Student'],
          }),
          


    updateStudent: builder.mutation({
        query: ({id,values}) => ({
        url: `/student/updatestudent/${id}`,
        method: "PUT",
        body:values
        }),
        invalidatesTags: ['Student'],
    }),

    toggleStudent: builder.mutation({
        query: ({id}) => ({
        url: `/student/togglestudent/${id}`,
        method: "PUT",
        }),
        invalidatesTags: ['Student'],
    }),

    }),

    });

    export const {useAddStudentMutation, useGetAllStudentQuery, useDeleteStudentMutation, useUpdateStudentMutation, useToggleStudentMutation} = bookingApi;
