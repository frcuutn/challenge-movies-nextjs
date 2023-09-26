import { SERVER_GRAPHQL_API_ENDPOINT, THEMOVIEDB_ACCOUNT } from "../constants";
import { updateFavoritesMutation } from "./mutation/favorite";
import { getMoviesQuery } from "./queries/movie";
import { AccountInfo, Movie, Response, TMDbFavoritesOperation, TMDbMoviesOperation } from "./types";

const domain = `https://${process.env.SERVER_URL || 'challenge-movies-nextjs.vercel.app'}`;
const endpoint = `${domain}${SERVER_GRAPHQL_API_ENDPOINT}`;
//const key = process.env.THEMOVIEDB_API_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function TMDbFetch<T>({
    query,
    variables,
    headers,
    cache = 'force-cache'
  }: {
    query: string;
    variables?: ExtractVariables<T>;
    headers?: HeadersInit;
    cache?: RequestCache;
  }): Promise<{ status: number; body: T } | never> {
    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${key}`,
                ...headers
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables })
            }),
            cache,
      });
  
      const body = await result.json();
      if (body.errors) {
        throw body.errors[0];
      }
  
      return {
        status: result.status,
        body
      };
    } catch (e) {
      throw {
        error: e,
        query
      };
    }
}

export async function getMovies({
    accountId,
    query,
    sortKey
  }: {
    accountId?: string;
    query?: string;
    sortKey?: string;
  }): Promise<Movie[]> {
    const { body: { data } } = await TMDbFetch<TMDbMoviesOperation>({
      query: getMoviesQuery,
      variables: {
        accountId,
        query,
        sortKey
      }
    });

    //mapped to the schema
    return data.movies.map((movie: any) => {
        return {
            id: movie.id,
            title: movie.title,
            released: movie.release_date,
            poster: movie.poster_path,
            genres: movie.genres,
            genre: movie.genres[0],
            rating: movie.vote_average,
            overview: movie.overview,
            isFavorite: movie.is_favorite
        } as Movie
    })
}

export async function updateFavorites(
  accountId: string,
  movieId: number,
  favorite: boolean,
): Promise<Response> {
  const res = await TMDbFetch<TMDbFavoritesOperation>({
    query: updateFavoritesMutation,
    variables: {
      accountId,
      movieId,
      favorite
    },
  });
  return res.body.data.updateFavorites;
}

export async function logIn(
  user: string,
  password: string,
): Promise<AccountInfo> {
  return {
    ...THEMOVIEDB_ACCOUNT
  }
}


