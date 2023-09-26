import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Movie } from '../lib/themoviedb/types'
import { getMovies } from '../lib/themoviedb'
import { uniq } from 'lodash-es'
import LogInLogOut from '../app/LogInLogOut'
import useAuth from '../app/hooks/useAuth'

const MovieCarousel = dynamic(() => import('../app/movies/MovieCarousel'))
const MovieComponent = dynamic(() => import('../app/movies/Movie'))
const MovieFilter = dynamic(() => import('../app/movies/MovieFilter'))

export async function getServerSideProps() {
  const movies = await getMovies({});
  return {
    props: {
      data: movies
    }
  }
}
type MovieListProps = {
  data: Movie[]
}
const Index: NextPage<MovieListProps> = ({ data }) => {
  const [movies, setMovies] = useState<Movie[]>(data || [])
  const [selectedId, selectMovieId] = useState<number>()
  const [selectedGenre, selectGenre] = useState<string>()
  const [accountId, setAccountId] = useState<string>('')
  const [searchMovie, setSearchMovie] = useState<string>('')
  
  const { isLoggedIn } = useAuth()

  const fetchMovies = async () => {
    const fetchedMovies = await getMovies({ accountId });
    setMovies(fetchedMovies)
    // select the first favorite movie
    const someFavMovie = fetchedMovies.find(m => m.isFavorite === true)
    if (someFavMovie) {
      selectMovieId(someFavMovie.id)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [accountId])

  const genreList = uniq(movies.map(m => m.genre.split(/,\s*/)).flat())
  return (
    <main>
      <LogInLogOut setAccountId={setAccountId} />
      {isLoggedIn() && (
        <MovieFilter setSearchMovie={setSearchMovie} selectGenre={selectGenre} selectedGenre={selectedGenre} genreList={genreList} />
      )}
      <MovieComponent onUpdate={fetchMovies} data={movies.find(m => m.id === selectedId)} selectGenre={selectGenre} />
      {isLoggedIn() && (
        <>
          <h3>Your favorite movies</h3>
          <MovieCarousel data={
            selectedGenre ? movies.filter(m => m.isFavorite && m.genre.includes(selectedGenre) && m.title.toLowerCase().includes(searchMovie.toLowerCase())) :
            movies.filter(m => m.isFavorite && m.title.toLowerCase().includes(searchMovie.toLowerCase()))
          }
            onSelect={selectMovieId}
            selectedId={selectedId} />
        </>
      )}
      {genreList.map(genreName => (
        <div key={`${genreName}`}>
          <h3>{genreName}</h3>
          <MovieCarousel data={movies.filter(m => m.genres.includes(genreName))}
          onSelect={selectMovieId}
          selectedId={selectedId} />
        </div>
      ))}
    </main>
  )
}

export default Index
