import movieFragment from "../fragments/movie";

export const getMoviesQuery = /* GraphQL */ `
  query getMovies($sortKey: String, $query: String, $accountId: String) {
    movies(sortKey: $sortKey, query: $query, accountId: $accountId, first: 100) {
        id
        poster_path
        title
        overview
        release_date
        vote_average
        genre_ids
        genres
        is_favorite
    }
  }
`;