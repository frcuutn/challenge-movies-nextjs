const movieFragment = /* GraphQL */ `
  fragment movie on Movie {
    id
    poster_path
    title
    overview
    release_date
    vote_average
    genre_ids
    genres
    is_favorite
}`

export default movieFragment
