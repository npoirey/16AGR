import Paper from "material-ui/Paper";
import React from "react";
import {connect} from "react-redux";
import {fetchUsers} from "../../../actions/usersActions";
import EnhancedTable from "../../../components/widgets/enhancedTable/EnhancedTable";
import "./users.scss";

@connect((store) => {
  return {
    users: store.users.users,
    loading: store.users.fetching
  };
})
export default class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      initialRequest: {
        sort: {
          name: 'callsign',
          order: 'ASC'
        },
        filters: []
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
            width: '10%'
          }
        },
      ]
    }
  }

  componentWillMount() {
    this.props.dispatch(fetchUsers(this.state.initialRequest))
  }

  onRequestChange = (newRequest) => {
    this.props.dispatch(fetchUsers(newRequest))
  };

  render() {
    const {users, loading} = this.props;
    return (
      <Paper zDepth={1}>
        <EnhancedTable
          data={users.items}
          loading={loading}
          initialRequest={this.state.initialRequest}
          columns={this.state.columns}
          onRequestChange={this.onRequestChange}
        />
      </Paper>
    );
  }
}

