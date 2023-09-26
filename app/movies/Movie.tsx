import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { Movie } from '../../lib/themoviedb/types' 
import map from 'lodash-es/map'
import get from 'lodash-es/get'
import Image from 'next/image'
import { updateFavorites } from '../../lib/themoviedb'
import FavoriteButton from '../FavoriteButton'
import useAuth from '../hooks/useAuth'

type MovielProps = {
  data?: Movie
  selectGenre: Function
  onUpdate: Function
}
const MovieComponent: FunctionComponent<MovielProps> = ({ data: movie, selectGenre, onUpdate }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isLoggedIn, getAccountId } = useAuth()

  if (!movie) {
    return <></>
  }
  const metadataKeys = {
    rating: 'Rating',
    released: 'Release',
    overview: 'Overview',
  }

  return (
    <MovieContainer className='movie'>
      <h1 className='movie__title hidden-lg'>
        {movie.title}
        <small>{movie.year}</small>
      </h1>
      <div className='movie__contents'>
        {Boolean(movie.poster) && (
          <figure className='movie__poster'>
            <Image src={movie.poster} alt={`${movie?.title} Poster`} layout='fill' />
          </figure>
        )}
        <div className='movie__details'>
          <h1 className='movie__detail movie__title visible-lg'>
            {movie.title}
            <small>{movie.year}</small>
          </h1>
          { isLoggedIn() &&
              isLoading ? <div>Updating...</div> : isLoggedIn() &&
              <FavoriteButton  isFavorite={movie.isFavorite} onClick={() => {
                // add to favorite list
                setIsLoading(true)
                updateFavorites(getAccountId(), movie.id, !movie.isFavorite).then(
                  () => {
                    onUpdate()
                    setIsLoading(false)
                  }
                )
              }}/>
          }
          {map(Object.keys(metadataKeys), key => {
            const value = get(movie, key)
            return (
              <div className='movie__detail' key={`details__${key}`}>
                <label className='detail__label'>{get(metadataKeys, key)}:</label>
                <span className='detail__value'>{value}</span>
              </div>
            )
          })}
          <div className='movie__detail' key='details__gernes'>
            <label className='detail__label'>Gernes:</label>
            <small>Click on any genres below to see related movies</small>
            <ul className='detail__value detail__genres'>
              {movie.genres.map(genreName => (
                <li className='detail_genre' key={`genre__${genreName}`} onClick={() => selectGenre(genreName)}>{genreName}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MovieContainer>
  )
}
const MovieContainer = styled.div`
  margin: 1rem 1.25rem;

  .movie__title {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1rem;
    small {
      display: block;
      font-weight: normal;
    }
  }

  .movie__contents {
    display: flex;
  }

  .movie__poster {
    display: flex;
    margin: 0;
    overflow: hidden;
    flex-direction: column;

    flex: 0 1 230px;
    position: relative;
    min-height: 300px;
  }

  .movie__details {
    flex: 1 1 60%;
    padding-left: 1rem;
  }

  .movie__detail {
    margin-bottom: 0.5rem;
  }

  .detail__label {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  .detail__genres {
    margin: 0.5rem 0;
  }

  .detail_genre {
    margin-bottom: 0.3rem;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #831010;
    }
  }

  .visible-lg {
    display: none;
  }
  @media screen and (min-width: 992px) {
    margin: 1rem 3.25rem;

    .movie__poster {
      flex-basis: 300px;
      min-height: 400px;
    }

    .movie__details {
      padding-left: 2rem;
    }

    .hidden-lg {
      display: none;
    }
    .visible-lg {
      display: inherit;
    }
  }
`

export default MovieComponent
