import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)

    if (!notification){
      return
    }

    setTimeout(() => {
      dispatch(showNotification(''))
    }, 5000)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: 5
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification