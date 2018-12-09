const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const notify = (notification, seconds) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 1000 * seconds)
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
  }
}

export default reducer
