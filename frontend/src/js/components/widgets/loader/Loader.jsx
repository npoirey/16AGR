import React from 'react'
import './loader.scss'

const Loader = ({ noMargin }) => {
  const style = {
    margin: 0,
  }

  return (
    <div className="row preloader-dots" style={noMargin && style}>
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
