import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Movie from './SingleMovie'
import Error from './Erorr'

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home></Home>
        </Route>
        <Route path='/home'>
          <Home></Home>
        </Route>
        <Route path='/movies/:id' children={<Movie></Movie>}></Route>
        <Route path='*'>
          <Error></Error>
        </Route>
      </Switch>
    </>
  )
}

export default App
