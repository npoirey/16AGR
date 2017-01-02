import React from 'react'

const userProptype = React.PropTypes.shape({
  id: React.PropTypes.number,
  callsign: React.PropTypes.string,
  email: React.PropTypes.string,
  admin: React.PropTypes.bool,
})

export default userProptype
