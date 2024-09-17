import { api } from "../api";

const tournamentApi = api.injectEndpoints({
  reducerPath: "api",
  endpoints: (builder) => ({

    // Add or update a tournament
    addOrUpdateTournament: builder.mutation({
      query: ({ tournamentId, ...tournamentValues }) => ({
        url: tournamentId ? `/tour/tournament/${tournamentId}` : '/tour/tournament',
        method: tournamentId ? "PUT" : "POST",
        body: tournamentValues,
      }),
      invalidatesTags: ['tournament'],
    }),

    // Delete a tournament
    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `/tour/tournament/${id}`,
        method: "DELETE",
      }), 
      invalidatesTags: ['tournament'],
    }),

    // Get all tournaments
    getAllTournaments: builder.query({
      query: () => ({
        url: '/tour/tournament',
        method: "GET",
      }),
      providesTags: ['tournament'],
    }),

  }),
});

export const {
  useAddOrUpdateTournamentMutation,
  useDeleteTournamentMutation,
  useGetAllTournamentsQuery,
} = tournamentApi;
