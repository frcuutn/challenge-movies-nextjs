import { FunctionComponent } from 'react'
import styled from 'styled-components'

type MovielProps = {
  setSearchMovie: Function
  selectGenre: Function
  selectedGenre?: string
  genreList: string[]
}
const MovieFilter: FunctionComponent<MovielProps> = ({ setSearchMovie, selectGenre, selectedGenre, genreList }) => {
  return (
    <MovieFilterContainer className='movie-filter'>
      <input type='text' placeholder='Search favorites' onChange={
        ev => setSearchMovie(ev.target.value)
      } />
      <select className='filter__dropdown' value={selectedGenre} onChange={ev => selectGenre(ev.target.value)}>
        <option>-- Filter Genre favorites --</option>
        {genreList.map(genreName => (
          <option className='filter__option'
            key={`option--${genreName}`}
            value={genreName}>
            {genreName}
          </option>
        ))}
      </select>
    </MovieFilterContainer>
  )
}

const MovieFilterContainer = styled.div`
  padding: 1rem 3.25rem;
  display: flex;

  .filter__dropdown {
    flex: 1 1 250px;
    margin-left: auto;
  }

  @media screen and (min-width: 992px) {
    .filter__dropdown {
      flex-grow: 0;
    }
  }
`

export default MovieFilter
