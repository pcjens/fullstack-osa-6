import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const renderNotification = () => (
      <div style={style}>
        {this.props.notification}
      </div>
    )

    return (
      <div>
        {this.props.notification.length > 0 && renderNotification()}
      </div>
    )
  }
}

const ConnectedNotification = connect((state) => {
  return {
    notification: state.notification
  }
})(Notification)

export default ConnectedNotification
