import React from 'react'
import { FormattedDate } from 'react-intl'
import { connect } from 'react-redux'
import proptypes from '../../../core/proptypes/index'

@connect((store) => ({
  user: store.user.user,
}))
class UserFormattedDate extends React.Component {
  static get

  constructor() {
    super()
    this.state = {}
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

UserFormattedDate.defaultProps = {
  user: {},
}

UserFormattedDate.propTypes = {
  user: proptypes.user,
  date: React.PropTypes.string.isRequired,
}

export default UserFormattedDate
