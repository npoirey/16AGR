import React from 'react'
import './loader.scss'

const Loader = ({ noMargin }) => {
  const attributes = {}

  if (noMargin) {
    attributes.style = {
      margin: 0,
    }
  }


  return (
    <div className="row preloader-dots" {...attributes}>
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  )
}

Loader.propTypes = {
  noMargin: React.PropTypes.bool,
}

export default Loader
