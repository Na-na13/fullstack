import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state)
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
      {message.payload.content}
    </div>
  )
}

export default Notification
