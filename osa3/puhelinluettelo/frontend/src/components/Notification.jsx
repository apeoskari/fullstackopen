const Notification = ({ message, state }) => {
  if (message === null) {
    return null
  }
  let msg_state = 'add'

  if (state === 'change') {
    msg_state = 'change'
  }
  if (state === 'delete') {
    msg_state = 'delete'
  }

  return (
    <div className={msg_state}>
      {message}
    </div>
  )
}

export default Notification