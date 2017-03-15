import React from 'react'
import { FormattedDate } from 'react-intl'
import { connect } from 'react-redux'
import proptypes from '../../../core/proptypes/index'

class UserFormattedDate extends React.Component {
  static defaultProps = {
    user: {},
  }

  static propTypes = {
    user: proptypes.user,
    date: React.PropTypes.string.isRequired,
  }

  render() {
    const { user, date } = this.props
    const useLocalTime = user && user.preferences && user.preferences.useLocalTime
    if (useLocalTime) {
      return (
        <FormattedDate
          value={date} hour12={false}
          day="numeric" month="long" year="numeric"
          hour="numeric" minute="numeric" timeZoneName="short"
        />
      )
    }
    return (
      <div>
        <FormattedDate
          value={date}
          timeZone="Etc/Zulu" hour12={false}
          day="numeric" month="long" year="numeric"
          hour="numeric" minute="numeric"
        />
        {' ZULU'}
      </div>
    )
  }
}

export default connect((store) => ({
  user: store.user.user,
}))(UserFormattedDate)
