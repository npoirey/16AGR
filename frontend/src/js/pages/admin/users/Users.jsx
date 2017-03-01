import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'
import { fetchUsers } from '../../../actions/users/usersActions'
import EnhancedTable from '../../../components/widgets/enhancedTable/EnhancedTable'
import './users.scss'
import proptypes from '../../../core/proptypes/index'
import ActionsRow from '../../../components/layout/ActionsRow/ActionsRow'

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
          type: 'custom',
          sortable: true,
          filterable: true,
          render: (row) => <IndexLink key={`/admin/users/${row.id}`} to={`/admin/users/${row.id}`}>{row.callsign}</IndexLink>,
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
            width: '10%',
          },
        },
      ],
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchUsers(this.state.initialRequest))
  }

  onRequestChange = (newRequest) => {
    this.props.dispatch(fetchUsers(newRequest))
  };

  render() {
    const { users, loading } = this.props
    return (
      <Paper zDepth={1}>
        <ActionsRow title="Users list">
          <IndexLink to="/admin/users/create">
            <FlatButton
              label="Create user"
              icon={<i className="fa fa-plus" />}
            />
          </IndexLink>
        </ActionsRow>
        <EnhancedTable
          data={users}
          loading={loading}
          initialRequest={this.state.initialRequest}
          columns={this.state.columns}
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
