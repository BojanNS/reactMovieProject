import React from 'react'
import { useGlobalContext } from './context'
const SearchForm = () => {
  const { query, setQuery, error } = useGlobalContext()
  return (
    <form
      className='search-form'
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <h2>search movies</h2>
      <input
        type='text'
        className='form-input'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />
      {error.show ? (
        <p style={{ color: 'red', marginTop: '5px', fontSize: '18px' }}>
          {error.msg}
        </p>
      ) : null}
    </form>
  )
}

export default SearchForm
