import React from 'react'

const filterProptypes = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  pattern: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool,
  ]).isRequired,
  type: React.PropTypes.oneOf(['contains', 'boolean']).isRequired,
})

export default filterProptypes
