export type Movie = {
    id: number,
    title: string,
    year: string,
    poster: string
    rated: string
    released: string
    runtime: string
    rating: string
    genre: string
    genres: string[]
    overview: string
    isFavorite: boolean
}

export type Response = {
    success: boolean,
    status_code: string,
    status_message: string
}

export type AccountInfo = {
    id: string,
    username: string,
}

export type TMDbMoviesOperation = {
    data: {
        movies: Movie[];
    };
    variables: {
        accountId?: string;
        query?: string;
        sortKey?: string;
    };
}

export type TMDbFavoritesOperation = {
    data: {
        updateFavorites: Response
    };
    variables: {
        accountId: string;
        movieId: number;
        favorite: boolean;
    };
};
