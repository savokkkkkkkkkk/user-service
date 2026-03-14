import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav className='navbar'>
      <NavLink to='/' end>Главная</NavLink>
      <NavLink to='/users'>Пользователи</NavLink>
      <NavLink to='/groups'>Группы</NavLink>
    </nav>
  )
}

export default Navigation