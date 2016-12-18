import React from "react";
import {FormattedDate} from "react-intl";
import {connect} from "react-redux";

@connect((store) => {
  return {
    user: store.user.user,
  };
})
export default class UserFormattedDate extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {user, date} = this.props;
    const useLocalTime = user && user.preferences && user.preferences.useLocalTime;
    if (useLocalTime) {
      return (
        <FormattedDate
          value={date} hour12={false}
          day="numeric" month="long" year="numeric"
          hour="numeric" minute="numeric" timeZoneName="short"/>
      );
    } else {
      return (
        <div>
          <FormattedDate
            value={date}
            timeZone="Etc/Zulu" hour12={false}
            day="numeric" month="long" year="numeric"
            hour="numeric" minute="numeric"/>
          {" ZULU"}
        </div>
      );
    }
  }
}
