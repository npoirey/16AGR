import { FlatButton, FontIcon, IconButton, Paper } from 'material-ui'
import React from 'react'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'
import { fetchUsers } from '../../../actions/users/usersActions'
import ActionsRow from '../../../components/layout/ActionsRow/ActionsRow'
import EnhancedTable from '../../../components/widgets/enhancedTable/EnhancedTable'
import proptypes from '../../../core/proptypes/index'
import './users.scss'

class Users extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    users: React.PropTypes.arrayOf(proptypes.user).isRequired,
    loading: React.PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.state = {
      initialRequest: {
        sort: {
          name: 'callsign',
          order: 'ASC',
        },
        filters: [],
      },
      columns: [
        {
          name: 'callsign',
          label: 'Callsign',
          type: 'text',
          sortable: true,
          filterable: true,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          sortable: true,
          filterable: true,
        },
        {
          name: 'admin',
          label: 'Admin',
          type: 'boolean',
          sortable: false,
          filterable: true,
          style: {
            width: '60px',
          },
        },
        {
          name: 'actions',
          type: 'custom',
          sortable: false,
          filterable: false,
          style: {
            width: '50px',
          },
          render: (row) => <IndexLink key={`/admin/users/${row.id}`} to={`/admin/users/${row.id}`}>
            <IconButton iconClassName="material-icons">edit</IconButton>
          </IndexLink>,
        },
      ],
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchUsers(this.state.initialRequest))
  }

  onRequestChange = (newRequest) => {
    this.props.dispatch(fetchUsers(newRequest))
  }

  render() {
    const { users, loading } = this.props
    return (
      <Paper zDepth={1}>
        <ActionsRow title="Users list">
          <FlatButton
            className="start-xs"
            label="Delete selected"
            disabled
            icon={<FontIcon className="material-icons">delete</FontIcon>}
          />
          <IndexLink to="/admin/users/create">
            <FlatButton
              label="Create user"
              icon={<FontIcon className="material-icons">add</FontIcon>}
            />
          </IndexLink>
        </ActionsRow>
        <EnhancedTable
          data={users}
          loading={loading}
          initialRequest={this.state.initialRequest}
          columns={this.state.columns}
          selectable
          multiSelectable
          onRequestChange={this.onRequestChange}
        />
      </Paper>
    )
  }
}

export default connect((store) => ({
  users: store.users.users,
  loading: store.users.fetching,
}))(Users)
