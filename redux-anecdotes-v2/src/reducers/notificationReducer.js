const initialState = 'Hey, I\'m a notification!'

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET':
    return action.notification
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET',
    notification
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default reducer
