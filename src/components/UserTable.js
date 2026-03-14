import React, { useState, useMemo, useCallback } from 'react'
import UserForm from './UserForm'

function UserTable({ users, groups, onAdd, onUpdate, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
  const [editingUser, setEditingUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const sortedUsers = useMemo(() => {
    const sorted = [...users]
    sorted.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) 
        return sortConfig.direction === 'asc' ? -1 : 1
      if (a[sortConfig.key] > b[sortConfig.key]) 
        return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [users, sortConfig])

  const requestSort = useCallback((key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    })
  }, [sortConfig])

  const getGroupName = useCallback((groupId) => {
    if (!groupId) return 'Без группы'
    const group = groups.find(g => g.id === Number(groupId))
    return group.name
  }, [groups])

  return (
    <>
      
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('name')}>Имя {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
            <th onClick={() => requestSort('email')}>Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
            <th onClick={() => requestSort('role')}>Должность {sortConfig.key === 'role' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
            <th onClick={() => requestSort('groupId')}>Группа {sortConfig.key === 'groupId' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody style={{textAlign: 'center'}}>
          {sortedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{getGroupName(user.groupId)}</td>
              <td className='btns-user-table'>
                <button className='btn-change-user' onClick={() => {
                  setEditingUser(user)
                  setShowModal(true)
                }}>Редактировать</button>
                <button className='btn-delete-user' onClick={() => onDelete(user.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UserForm
          user={editingUser}
          groups={groups}
          onSave={(data) => {
            if (editingUser) onUpdate({...data, id: editingUser.id})
            else onAdd(data)
            setShowModal(false)
            setEditingUser(null)
          }}
          onClose={() => {
            setShowModal(false)
            setEditingUser(null)
          }}
        />
      )}
    </>
  )
}

export default React.memo(UserTable)