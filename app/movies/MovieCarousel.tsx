import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import styled from 'styled-components'
import { Movie } from '../../lib/themoviedb/types'
import { IoIosArrowDropleft as LeftArrowIcon } from '@react-icons/all-files/io/IoIosArrowDropleft'
import { IoIosArrowDropright as RightArrowIcon } from '@react-icons/all-files/io/IoIosArrowDropright'
import Image from 'next/image'

type MovieCarouselProps = {
  data: Movie[]
  onSelect: Function
  selectedId?: number
}
const MovieCarousel: FunctionComponent<MovieCarouselProps> = ({ data: movies, onSelect, selectedId }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [swipable, setSwipable] = useState<{left: boolean, right: boolean}>({
    left: false,
    right: false
  })
  const [swipePosition, setSwipePosition] = useState<number>(0)

  useEffect(() => {
    if (!contentRef.current) {
      return
    }

    const { right, left } = calculateSwipes(contentRef.current, swipePosition)
    setSwipable({
      left: left >= 0 && swipePosition !== 0,
      right: right >= 0
    })
  }, [swipePosition])

  // swipe left/right
  const swipe = useCallback((direction: number) => {
    if (!contentRef.current) {
      return
    }

    const contentElement: HTMLElement = contentRef.current
    const trackElement: HTMLElement | null = contentElement.querySelector('.carousel__track')
    const { right, left } = calculateSwipes(contentRef.current, swipePosition)
    const nextPosition = direction > 0 ? right : left

    if (nextPosition >= 0 && trackElement) {
      trackElement.style.transform = `translate3d(${-nextPosition}px, 0, 0)`
      setSwipePosition(nextPosition)
    }
  }, [swipePosition])

  return (
    <MovieCarouselContainer className='movie-carousel'>
      <div className='carousel__nav carousel__nav--left'>
        <LeftArrowIcon size='3rem'
          title='Swipe left'
          onClick={() => swipe(-1)}
          className={classnames(!swipable.left && 'hidden')} />
      </div>
      <div className='carousel__contents' ref={contentRef}>
        <div className='carousel__track'>
          {movies.length ? movies.map(m => {
            const movieTitle = m.title ?? 'Unknown Title'
            return (
              <figure className={classnames(
                  'carousel__figure',
                  `carousel__figure--${m.id}`,
                  selectedId === m.id && 'carousel__figure--selected'
                )}
                key={`carousel__figure--${m.id}`}
                onClick={() => onSelect(m.id)}>
                {Boolean(m.poster) && <Image src={m.poster} alt={`${movieTitle} Thumbnail`} layout='fill' />}
                <figcaption>
                  { selectedId === m.id
                    ? 'Viewing details'
                    : 'Click for more details' }
                </figcaption>
              </figure>
            )
          }) : (
            <div className='carousel__figure'>
              <span>No movies found</span>
            </div>
          ) }
        </div>
      </div>
      <div className='carousel__nav carousel__nav--right'>
        <RightArrowIcon size='3rem'
          title='Swipe right'
          onClick={() => swipe(1)}
          className={classnames(!swipable.right && 'hidden')} />
      </div>
    </MovieCarouselContainer>
  )
}

const calculateSwipes = (contentElement: HTMLElement, swipePosition: number) => {
  const trackElement: HTMLElement | null = contentElement.querySelector('.carousel__track')
  const contentClientRect = contentElement.getBoundingClientRect()
  const contentLeft = contentClientRect.left
  const contentWidth = contentClientRect.width
  let swipeRight = -1
  let swipeLeft = -1

  if (!trackElement || !contentWidth) {
    return {
      right: swipeRight,
      left: swipeLeft
    }
  }

  const figures = contentElement.querySelectorAll('.carousel__figure')
  const leftRequiredSpace = contentWidth + contentLeft + 20

  let direction = 1
  let nextPosition = swipePosition + direction * contentWidth - direction * contentLeft
  for (let i = 0; i < figures.length; i++) {
    const figureClientRect = figures[i].getBoundingClientRect()
    if (figureClientRect.left < leftRequiredSpace && leftRequiredSpace < figureClientRect.left + figureClientRect.width) {
      nextPosition = swipePosition + figureClientRect.left - contentLeft
      break
    } else if (figureClientRect.left > contentWidth) {
      nextPosition = swipePosition + figureClientRect.left - contentLeft
      break
    } else {
      nextPosition = -1
    }
  }
  if (nextPosition >= 0) {
    swipeRight = nextPosition
  }

  direction = -1
  nextPosition = swipePosition + direction * contentWidth - direction * contentLeft
  for (let i = 0; i < figures.length; i++) {
    const figureClientRect = figures[i].getBoundingClientRect()
    if (figureClientRect.left + contentWidth > 0) {
      swipeLeft = swipePosition + figureClientRect.left - contentLeft
      break
    }
  }

  return {
    right: swipeRight,
    left: swipeLeft
  }
}

const MovieCarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;

  .carousel__nav {
    display: flex;
    justify-content: center;
    align-items: center;

    &--left {
      padding-left: 0;
      padding-right: 0.25rem;
    }

    &--right {
      padding-right: 0;
      padding-left: 0.25rem;
    }

    svg {
      color: #699;
      cursor: pointer;
    }

    svg:hover {
      color: #069;
    }
  }

  .carousel__contents {
    flex: 1 1 auto;
    position: relative;
    overflow: hidden;
  }

  .carousel__track {
    display: flex;
    flex-wrap: no-wrap;
    transition: all ease-out 0.4s;
  }

  .carousel__figure {
    max-width: 150px;
    flex: 1 0 150px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    cursor: pointer;
    margin: 0 0.5rem;

    position: relative;
    height: 230px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    img {
      flex: 1 1 100%;
      height: auto;
      width: 100%;
    }

    figcaption {
      background: rgba(14, 165, 212, 0.5);
      position: absolute;
      bottom: 0;
      color: white;
      width: 100%;
      text-align: center;
      padding: 0.5rem 0.25rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      transform: translateY(100%);
      transition: all ease-in-out 0.2s;
    }

    &:hover, &--selected {
      figcaption {
        transform: translateY(0);
      }
    }

    &--selected {
      figcaption {
        background: rgba(14, 165, 212, 0.7);
      }
    }
  }

  .hidden {
    visibility: hidden;
  }
`

export default MovieCarousel
