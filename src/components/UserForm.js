import React, { useState, useEffect } from 'react'

function UserForm({ user, groups, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    groupId: ''
  })

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      ...formData,
      groupId: formData.groupId ? Number(formData.groupId) : null
    }
    
    onSave(userData)
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>{user ? 'Редактировать' : 'Добавить'} пользователя</h2>
        <form onSubmit={handleSubmit}>
          <input
            name='name'
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder='Имя и Фамилия'
            required
          />
          <input
            name='email'
            type='email'
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder='Email'
            required
          />
          <input
            name='role'
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            placeholder='Должность'
            required
          />
          <select
            value={formData.groupId}
            onChange={(e) => setFormData({...formData, groupId: e.target.value})}
          >
            <option value=''>Без группы</option>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          <div className='form-btns'>
            <button className='save' type='submit'>Сохранить</button>
            <button className='close' type='button' onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(UserForm)