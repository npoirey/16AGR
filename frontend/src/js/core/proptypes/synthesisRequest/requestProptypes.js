import React from 'react'
import filterProptypes from './filterProptypes'
import sortProptypes from './sortProptypes'

const eventProptype = React.PropTypes.shape({
  sort: sortProptypes,
  filters: React.PropTypes.arrayOf(filterProptypes),
})

export default eventProptype

