import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const notification = this.props.store.getState().notification
    const renderNotification = () => (
      <div style={style}>
        {notification}
      </div>
    )

    return (
      <div>
        {notification.length > 0 && renderNotification()}
      </div>
    )
  }
}

export default Notification
