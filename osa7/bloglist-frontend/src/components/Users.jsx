import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users.allUsers)
  const flexStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px'
  }

  const size = {
    marginRight: '10px',
    width: '100px'
  }

  return (
    <div>
      <h2>Users</h2>
      <div style={flexStyle}>
        <div style={size}></div>
        <div><strong>blogs created</strong></div>
      </div>
      {users.map(user => (
        <div key={user.id} style={flexStyle}>
          <div style={size}>
            <Link to={`/users/${user.id}`}>{user.username}</Link>
          </div>
          <div>{user.blogs.length}</div>
        </div>
      ))}
    </div>
  )

}

export default Users