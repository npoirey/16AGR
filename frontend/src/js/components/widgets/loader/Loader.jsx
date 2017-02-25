import React from 'react'
import './loader.scss'

const Loader = ({ noMargin }) => {
  const attributes = {
    style: {},
  }

  if (noMargin) {
    attributes.style.margin = 0
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

Loader.defaultProps = {
  noMargin: false,
}

Loader.propTypes = {
  noMargin: React.PropTypes.bool,
}

export default Loader
