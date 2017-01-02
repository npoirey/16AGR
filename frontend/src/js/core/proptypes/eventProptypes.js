import React from 'react'
import dateProptypes from './dateProptypes'

const eventProptype = React.PropTypes.shape({
  id: React.PropTypes.number,
  date: dateProptypes,
  title: React.PropTypes.string,
  shortDescription: React.PropTypes.string,
  description: React.PropTypes.string,
  imageUrl: React.PropTypes.string,
})

export default eventProptype
