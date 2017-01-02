import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import proptypes from '../../../core/proptypes/index'

const EnhancedTableSortButton = ({ changeSort, name, sort }) => {
  let icon = 'fa fa-sort'
  if (sort && sort.name === name && sort.order === 'ASC') {
    icon = 'fa fa-sort-asc'
  } else if (sort && sort.name === name && sort.order === 'DESC') {
    icon = 'fa fa-sort-desc'
  }
  return (
    <FlatButton onClick={() => changeSort(name)} style={{ width: '20%', minWidth: 'none' }}>
      <i className={icon} />
    </FlatButton>
  )
}

EnhancedTableSortButton.propTypes = {
  changeSort: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  sort: proptypes.synthesisRequest.sort,
}

export default EnhancedTableSortButton
