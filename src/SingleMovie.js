import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const SingleMovie = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })

  const fetchMovie = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (data.Response === 'False') {
      setError({ show: true, msg: data.error })
      setLoading(false)
    } else {
      setError({ show: false, msg: '' })
      setMovie(data)
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchUrl = `${API_ENDPOINT}&i=${id}`
    fetchMovie(fetchUrl)
  }, [id])

  if (isLoading) {
    return <div className='loading'></div>
  }
  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.name}</h1>
        <Link to={'/home'} className='btn'>
          back to movies
        </Link>
      </div>
    )
  }

  return (
    <section className='single-movie'>
      <img
        src={movie.Poster === 'N/A' ? url : movie.Poster}
        alt={movie.Title}
      />
      <div className='single-movie-info'>
        <h2>{movie.Title}</h2>
        <p>{movie.Plot}</p>
        <h4>{movie.Year}</h4>
      </div>
      <Link to={'/home'} className='btn'>
        back to movies
      </Link>
    </section>
  )
}

export default SingleMovie
