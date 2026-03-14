import React from 'react'

function Home() {
  return (
    <div className='home'>
      <h1>Добро пожаловать!</h1>
      <p className='description'>Перед вами представлена система управления пользователями с функциями добавления и удаления</p>
      
      <div className='features'>
        <div className='feature'>
          <h3>Пользователи</h3>
          <p>Страница со списком пользователей с функционалом сортировки, удаления, добавления и редактирования пользователя</p>
        </div>
        <div className='feature'>
          <h3>Группы</h3>
          <p>Страница со списком групп и ФИ людей</p>
        </div>
      </div>
    </div>
  )
}

export default Home