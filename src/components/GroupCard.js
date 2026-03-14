import React from 'react'

function GroupCard({ group, members }) {
  return (
    <div className='group-card'>
      <h3>{group.name}</h3>
      <p>{group.description}</p>
      <div className='group-stats'>
        <span>{members.length} участников:</span>
      </div>
      {members.length > 0 && (
        <ul>
          {members.slice(0, 10).map(m => (
            <li key={m.id}>{m.name}</li>
          ))}
          {members.length > 10 && <li>...</li>}
        </ul>
      )}
    </div>
  )
}

export default GroupCard