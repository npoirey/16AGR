import React from 'react'

const sortProptypes = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  order: React.PropTypes.oneOf(['ASC', 'DESC']).isRequired,
})

export default sortProptypes
