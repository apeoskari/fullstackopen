import { Alert } from '@mui/material'

const Notification = ({ notification }) => {
  const { message, isError } = notification

  if (!message) {
    return null
  }

  const style = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <Alert style={style} severity={ isError ? 'error' : 'success' }>
      {message}
    </Alert>
  )
}

export default Notification