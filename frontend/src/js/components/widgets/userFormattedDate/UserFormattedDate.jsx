import React from 'react'
import { FormattedDate } from 'react-intl'
import { connect } from 'react-redux'

@connect((store) => ({
  user: store.user.user,
}))
export default class UserFormattedDate extends React.Component {
  static get propTypes() {
    return {
      user: React.PropTypes.any,
      date: React.PropTypes.string,
    }
  }

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
