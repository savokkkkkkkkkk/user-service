import React, { useState, useEffect, useMemo, useCallback } from 'react'
import UserTable from '../components/UserTable'
import { fetchData } from '../data/mockData'
import UserForm from '../components/UserForm'
import useLocalStorage from '../hooks/useLocalStorage'


function Users() {
    const [groups, setGroups] = useLocalStorage('app_groups', [])
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingUser, setEditingUser] = useState(null)
    const [users, setUsers] = useLocalStorage('app_users', [])

    useEffect(() => {
        const loadInitialData = () => {
        if (users.length === 0 || groups.length === 0) {
            const data =  fetchData
            if (users.length === 0) setUsers(data.users)
            if (groups.length === 0) setGroups(data.groups)
        }
        }
        loadInitialData()
    })

    const filteredUsers = useMemo(() => {
        if (!searchTerm) return users
        return users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [users, searchTerm])

    const handleAdd = useCallback((user) => {
        setUsers(prev => [...prev, { ...user, id: Date.now() }])
    }, [])

    const handleUpdate = useCallback((updated) => {
        setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
    }, [])

    const handleDelete = useCallback((id) => {
        if (window.confirm('Удалить?')) {
        setUsers(prev => prev.filter(u => u.id !== id))
        }
    }, [])


    return (
        <div className='users-page'>
            <h1 style={{marginBottom: '20px'}}>Пользователи</h1>
            <div className='users-menu'>
                <input
                className='find-user-input'
                type='text'
                placeholder='Поиск...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='add-user' onClick={() => setShowModal(true)}>Добавить</button>
                <p>Всего пользователей: <span>{users.length}</span></p>
            </div>

            <UserTable
                users={filteredUsers}
                groups={groups}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
            {showModal && (
                <UserForm
                    user={editingUser}
                    groups={groups}
                    onSave={(data) => {
                    if (editingUser) handleUpdate({...data, id: editingUser.id})
                    else handleAdd(data)
                    setShowModal(false)
                    setEditingUser(null)
                    }}
                    onClose={() => {
                    setShowModal(false)
                    setEditingUser(null)
                    }}
                />
            )}
        </div>
    )
}

export default Users