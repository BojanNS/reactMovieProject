import React, { useState, useContext, useEffect } from 'react'

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=1ec26869`

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setIsError] = useState({ show: false, msg: '' })
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('batman')

  const fetchMovies = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data.Response === 'True') {
        console.log(data.Search)
        setMovies(data.Search)
        setIsError({ show: false, msg: '' })
      } else {
        setIsError({ show: true, msg: data.Error })
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}&s=${query}`)
  }, [query])
  return (
    <AppContext.Provider value={{ isLoading, error, movies, query, setQuery }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
