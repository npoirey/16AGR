import AppBar from 'material-ui/AppBar'
import Checkbox from 'material-ui/Checkbox'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import React from 'react'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'
import { logout, changePreferences } from '../../../actions/user/userActions'
import Loader from '../../widgets/loader/Loader'
import './nav.scss'
import proptypes from '../../../core/proptypes/index'


class Navbar extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    user: proptypes.user.isRequired,
    loading: React.PropTypes.bool.isRequired,
    fetching: React.PropTypes.bool.isRequired,
    location: React.PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  constructor() {
    super()
    this.state = {
      collapsed: true,
    }
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  submitLogout() {
    this.props.dispatch(logout())
  }

  toggleLocaleTime = () => {
    this.props.dispatch(changePreferences(
      this.props.user.preferences,
      {
        ...this.props.user.preferences,
        useLocalTime: !this.props.user.preferences.useLocalTime,
      }
    ))
  };

  render() {
    const { location, user, fetching, loading } = this.props
    let menus = []

    let rightElement
    let userPreferences
    if (fetching) {
      rightElement = <Loader noMargin />
      userPreferences = ''
    } else if (user && user.id) {
      rightElement =
        (<span className="navbar-logged">
          Welcome {user.callsign} <FlatButton label="Logout" onClick={() => this.submitLogout()} />
        </span>)
      userPreferences = (<div>
        <Checkbox
          label="Use local time"
          defaultChecked={user.preferences.useLocalTime}
          onCheck={this.toggleLocaleTime}
          disabled={loading}
        />
      </div>)
      menus = [{
        title: 'Featured',
        location: '/',
      }]
    } else {
      menus = [{
        title: 'Login',
        location: '/login',
      }]
    }

    if (user && user.admin) {
      menus = menus.concat([{
        title: 'Users',
        location: 'admin/users',
      }])
    }

    const activeMenu = menus.find((menu) =>
      location.pathname === menu.location || location.pathname.match(new RegExp(`/${menu.location}`))
    )

    return (
      <div className="navbar">
        <AppBar
          title={activeMenu && activeMenu.title}
          onTitleTouchTap={this.handleToggle}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={rightElement}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          {menus.map((menu) =>
            <IndexLink key={menu.location} to={menu.location}>
              <MenuItem
                class={activeMenu === menu ? 'active' : ''}
                onTouchTap={this.handleClose}
              >{menu.title}</MenuItem>
            </IndexLink>)}
          {userPreferences}
        </Drawer>

      </div>
    )
  }
}

export default connect((store) => ({
  user: store.user.user,
  fetching: store.user.fetching,
  loading: store.user.loading,
}))(Navbar)
