import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';
import { THEMOVIEDB_GRAPHQL_API_ENDPOINT } from '../lib/constants';

const domain = `https://${process.env.THEMOVIEDB_DOMAIN!}`;
const endpoint = `${domain}${THEMOVIEDB_GRAPHQL_API_ENDPOINT}`;
const key = process.env.THEMOVIEDB_API_KEY!;
const token = process.env.THEMOVIEDB_API_TOKEN!;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields:{
      id: {type: GraphQLInt},
      poster_path: {type: GraphQLString},
      title: {type: GraphQLString},
      overview: {type: GraphQLString},
      release_date: {type: GraphQLString},
      vote_average: {type: GraphQLFloat},
      genre_ids: {type: new GraphQLList(GraphQLInt)},
      genres: {type: new GraphQLList(GraphQLString)},
      is_favorite: {type: GraphQLBoolean},
  }
})

const FavoriteReponse = new GraphQLObjectType({
  name: 'FavoriteReponse',
  fields: {
    success: { type: GraphQLBoolean },
    status_code: { type: GraphQLString },
    status_message: { type: GraphQLString },
  }      
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      args: {
        sortKey: { type: GraphQLString },
        query: { type: GraphQLString },
        first: { type: GraphQLInt },
        accountId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { accountId } = args
        
        let favMovies: any[] = [];
        if (accountId) {
          const urlFav = `${endpoint}/account/${accountId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
          const favMoviesResult = await fetch(urlFav, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
          });
          const favMoviesData = await favMoviesResult.json()
          favMovies = favMoviesData.results || [];
        }
        const genreResult = await fetch(`${endpoint}/genre/movie/list?api_key=${key}&language=en-US`)
        const { genres } = await genreResult.json()
        const result = await fetch(`${endpoint}/movie/now_playing?api_key=${key}&language=en-US&page=1`)
        const { results: movies } = await result.json()
        return movies.map((movie: { id: number; poster_path: string; genre_ids: number[]; }) => {
          return {
            ...movie,
            poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            genres: movie.genre_ids.map((genreId: number) => genres.find((genre: any) => genre.id === genreId).name),
            is_favorite: favMovies.some((favMovie) => favMovie.id === movie.id)
          }
        })
      }
    },
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateFavorites: {
      type: FavoriteReponse,
      args: {
        accountId: { type: new GraphQLNonNull(GraphQLString) },
        movieId: { type: new GraphQLNonNull(GraphQLInt) },
        favorite: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      async resolve(parent, args) {
        const { accountId, movieId, favorite } = args;
        const response = await fetch(`${endpoint}/account/${accountId}/favorite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            favorite,
          }),
        })
        const data = await response.json()
        return data
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});