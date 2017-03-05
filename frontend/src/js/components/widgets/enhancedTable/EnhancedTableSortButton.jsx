import { FlatButton, FontIcon } from 'material-ui'
import React from 'react'
import proptypes from '../../../core/proptypes/index'

const EnhancedTableSortButton = ({ changeSort, name, sort }) => {
  let iconName = 'menu'
  let rotate = false
  if (sort && sort.name === name && sort.order === 'ASC') {
    iconName = 'sort'
    rotate = true
  } else if (sort && sort.name === name && sort.order === 'DESC') {
    iconName = 'sort'
  }

  return (
    <FlatButton
      onClick={() => changeSort(name)} style={{ width: '20%', minWidth: 'none' }}
      icon={<FontIcon
        className="material-icons"
        style={{
          WebkitTransform: `rotate(${rotate ? 180 : 0}deg)`,
          transform: `rotate(${rotate ? 180 : 0}deg)`,
        }}
      >{iconName}</FontIcon>}
    />
  )
}

EnhancedTableSortButton.propTypes = {
  changeSort: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  sort: proptypes.synthesisRequest.sort.isRequired,
}

export default EnhancedTableSortButton
