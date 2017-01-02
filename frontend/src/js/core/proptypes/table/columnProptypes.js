import React from 'react'
import columnTypeProptypes from './columnTypeProptypes'

const columnProptypes = React.PropTypes.shape({
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  type: columnTypeProptypes,
  sortable: React.PropTypes.bool,
  filterable: React.PropTypes.bool,
  style: React.PropTypes.object,
})

export default columnProptypes
