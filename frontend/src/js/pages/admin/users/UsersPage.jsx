import logger from 'loglevel'
import { FlatButton, FontIcon, IconButton, Paper } from 'material-ui'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { deleteUsers, fetchUsers } from '../../../actions/users/usersActions'
import ActionsRow from '../../../components/layout/ActionsRow/ActionsRow'
import EnhancedTable from '../../../components/widgets/enhancedTable/EnhancedTable'
import SimpleDialog from '../../../components/widgets/simpleDialog/SimpleDialog'
import proptypes from '../../../core/proptypes/index'

class UsersPage extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    users: React.PropTypes.arrayOf(proptypes.user).isRequired,
    loading: React.PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.state = {
      selectedIds: [],
      request: {
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
          render: (row) => <Link key={`/admin/users/${row.id}`} to={`/admin/users/${row.id}`}>
            <IconButton iconClassName="material-icons">edit</IconButton>
          </Link>,
        },
      ],
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchUsers(this.state.request))
  }

  onRequestChange = (newRequest) => {
    this.setState({
      request: newRequest,
    })
    this.props.dispatch(fetchUsers(this.state.request))
  }

  onRowSelection = (selectedUsers) => {
    this.setState({
      selectedIds: selectedUsers.map((user) => user.id),
    })
    this.props.dispatch({ type: 'USERS.SELECT.SOME', payload: selectedUsers.map((user) => user.id) })
    logger.info(selectedUsers)
  }

  openDeleteModal = () => {
    this.setState({
      open: true,
    })
  }

  closeDeleteModal = () => {
    this.setState({
      open: false,
    })
  }

  deleteSelected = () => {
    this.props.dispatch(deleteUsers(this.state.selectedIds))
      .then(() => {
        this.props.dispatch(fetchUsers(this.state.request))
      })
      .catch(() => {
        this.props.dispatch(fetchUsers(this.state.request))
      })
    this.closeDeleteModal()
  }

  render() {
    const { users, loading } = this.props

    return (
      <Paper zDepth={1}>
        <SimpleDialog
          title={'Delete selected users ?'}
          text={'This action is irrevocable, all traces of the users will be lost, including events subscription or posts (past or future)'}
          submitLabel={'Delete users'}
          cancelLabel={'Cancel'}
          onCancel={this.closeDeleteModal}
          onValidate={this.deleteSelected}
          open={this.state.open}
        />
        <ActionsRow title="Users list">
          <FlatButton
            label="Delete selected"
            disabled={!this.state.selectedIds.length || this.state.selectedIds.length === 0}
            icon={<FontIcon className="material-icons">delete</FontIcon>}
            onClick={this.openDeleteModal}
          />
          <FlatButton
            label="Create user"
            icon={<FontIcon className="material-icons">add</FontIcon>}
            containerElement={<Link to="/admin/users/create" />}
          />
        </ActionsRow>
        <EnhancedTable
          data={users}
          loading={loading}
          initialRequest={this.state.request}
          columns={this.state.columns}
          selectable
          multiSelectable
          onRequestChange={this.onRequestChange}
          onRowSelection={this.onRowSelection}
        />
      </Paper>
    )
  }
}

export default connect((store) => ({
  users: store.users.users,
  loading: store.users.fetching || store.users.deleting,
}))(UsersPage)
