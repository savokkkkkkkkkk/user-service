import React from 'react'
import Navigation from './Navigation'

function Layout({ children }) {
  return (
    <div className='app'>
      <Navigation />
      <main className='container'>
        {children}
      </main>
    </div>
  )
}

export default Layout