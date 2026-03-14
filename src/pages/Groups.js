import React, { useEffect } from 'react'
import GroupList from '../components/GroupList'
import { fetchData } from '../data/mockData'
import useLocalStorage from '../hooks/useLocalStorage'


function Groups() {
  const [groups, setGroups] = useLocalStorage('app_groups', [])
  const [users, setUsers] = useLocalStorage('app_users', [])

  useEffect(() => {
    const loadInitialData = async () => {
    if (users.length === 0 || groups.length === 0) {
      const data = fetchData
      if (users.length === 0) setUsers(data.users)
      if (groups.length === 0) setGroups(data.groups)
    }
    }
    
    loadInitialData()
  }, [])


  return <GroupList groups={groups} users={users} />
}

export default Groups