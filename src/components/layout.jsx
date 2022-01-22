import React, { createContext, useEffect, useReducer, useState } from 'react'
import Head from './Head'
import Header from './Header'
import Footer from './Footer'

import '../styles/main.scss'

export const GlobalState = createContext()
export const DispatchStore = createContext()

export function isLoadingDarkmode() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
}

export const initialState = {
  isDarkMode: false,
}

export function reducer(state, { payload, type }) {
  switch (type) {
    case 'SET_IS_DARKMODE':
      return { ...state, isDarkMode: payload }
    default:
      return state
  }
}

export const Template = ({ children, initialState = {} }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (!isLoaded) {
      console.log('here')
      dispatch({ type: 'SET_IS_DARKMODE', payload: isLoadingDarkmode() })
      setIsLoaded(true)
    }
  }, [isLoaded, setIsLoaded])

  useEffect(() => {
    const body = document.querySelector('body')

    if (state.isDarkMode) {
      body.classList.add('js-is-darkmode')
    } else {
      body.classList.remove('js-is-darkmode')
    }
  }, [state])

  return (
    <DispatchStore.Provider value={dispatch}>
      <GlobalState.Provider value={state}>
        <div className='gatsby-container'>
          <Head />
          <Header />
          {children}
          <Footer />
        </div>
      </GlobalState.Provider>
    </DispatchStore.Provider>
  )
}

export default Template
