import React, { useMemo } from 'react'
import GroupCard from './GroupCard'

function GroupList({ groups, users }) {
  const groupsWithMembers = useMemo(() => {
    return groups.map(group => ({
      ...group,
      members: users.filter(u => u.groupId === group.id)
    }))
  }, [groups, users])

  const unassigned = useMemo(() => {return users.filter(u => !u.groupId)}, [users])

  return (
    <div className='groups-page'>
      <h1>Группы</h1>
      
      <div className='groups-grid'>
        {groupsWithMembers.map(group => (
          <GroupCard key={group.id} group={group} members={group.members} />
        ))}
        
        {unassigned.length >= 0 && (
          <div className='group-card unassigned'>
            <h3>Без группы</h3>
            <p>Сотрудники без группы: {unassigned.length}</p>
            <ul >
              {unassigned.map(u => (
                <li key={u.id}>{u.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(GroupList)