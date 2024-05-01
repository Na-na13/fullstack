import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const LogoutForm = () => {
  const user = useSelector(state => state.users.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async (event) => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <Box sx={{ marginLeft:'auto' }}>
      {user.username} is logged in{' '}
      <Button endIcon={<LogoutIcon />} onClick={handleLogout} style={{ color:'#ffffff' }} >logout</Button>
    </Box>
  )
}

export default LogoutForm