import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notifications)
  console.log(message)
  if (!message) {
    return
  }

  const style = {
    color: message.type === 'ERROR' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className='notification' style={style}>
      {message.content}
    </div>
  )
}

export default Notification
