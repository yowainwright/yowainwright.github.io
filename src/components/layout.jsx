import React, { createContext, useEffect, useReducer } from 'react'
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
  isLoaded: false,
}

export function reducer(state, { payload, type }) {
  switch (type) {
    case 'SET_IS_DARKMODE':
      return { ...state, isDarkMode: payload }
    case 'SET_IS_LOADED':
      return { ...state, isLoaded: payload }
    default:
      return state
  }
}

export const Template = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (state.isLoaded) return
    dispatch({ type: 'SET_IS_LOADED', payload: true })
    dispatch({ type: 'SET_IS_DARKMODE', payload: isLoadingDarkmode() })
  }, [state.isLoaded])

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
