import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LogoutForm = () => {
  const user = useSelector(state => state.users.loggedInUser)
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    dispatch(logoutUser())
  }

  return (
    <p>
      {user.username} is logged in{' '}
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

export default LogoutForm