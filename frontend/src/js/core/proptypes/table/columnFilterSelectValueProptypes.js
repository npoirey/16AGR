import React from 'react'

const columnFilterSelectValueProptypes = React.PropTypes.shape({
  label: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool,
  ]),
})

export default columnFilterSelectValueProptypes
