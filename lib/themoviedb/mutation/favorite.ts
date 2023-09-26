export const updateFavoritesMutation = /* GraphQL */ `
  mutation updateFavorites($accountId: String!, $movieId: Int!, $favorite: Boolean!) {
    updateFavorites(accountId: $accountId, movieId: $movieId, favorite: $favorite) {
      success
      status_code
      status_message
    }
  }
`;
