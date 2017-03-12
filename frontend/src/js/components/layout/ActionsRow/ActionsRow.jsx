import React from 'react'

const titleStyle = {
  marginTop: 5,
  marginBottom: 0,
  marginLeft: 10,
  fontSize: 25,
}

const ActionsRow = (props) => (
  <div className="row action-row">
    <div className="col-xs-12 col-sm-3 start-xs action-row-title">
      <h1 style={titleStyle}>{props.title}</h1>
    </div>
    <div className="col-xs-12 col-sm-9 end-xs action-row-buttons" style={{ display: 'flex' }}>
      {props.children}
    </div>
  </div>
)

ActionsRow.defaultProps = {
  title: '',
}

ActionsRow.propTypes = {
  children: React.PropTypes.node.isRequired,
  title: React.PropTypes.string,
}

export default ActionsRow
