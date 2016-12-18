import AppBar from "material-ui/AppBar";
import Checkbox from "material-ui/Checkbox";
import CircularProgress from "material-ui/CircularProgress";
import Drawer from "material-ui/Drawer";
import FlatButton from "material-ui/FlatButton";
import MenuItem from "material-ui/MenuItem";
import React from "react";
import {connect} from "react-redux";
import {IndexLink, Link} from "react-router";
import {logout, changePreferences} from "../../../actions/userActions";
import "./nav.scss";

@connect((store) => {
  return {
    user: store.user.user,
    loading: store.user.fetching,
    error: store.user.error
  };
})
export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }

  componentWillMount() {
    if (this.props.user.id) {
      //checking session
    }
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  submitLogout() {
    this.props.dispatch(logout());
  }

  toggleLocaleTime = () => {
    this.props.dispatch(changePreferences(
      {
        ...this.props.user.preferences,
        useLocalTime: !this.props.user.preferences.useLocalTime
      }
    ));
    console.log(this.props.user.preferences.useLocalTime)
  };

  render() {
    const {location, user, loading} = this.props;
    const menus = [
      {
        title: 'Featured',
        location: '/',
      },
      {
        title: 'Archives',
        location: 'archives'
      },
      {
        title: 'Settings',
        location: 'settings'
      },
    ];
    let activeMenu = menus.find((menu) =>
      location.pathname === menu.location || location.pathname.match(new RegExp(`\/${menu.location}`))
    );

    let rightElement;
    let userPreferences;
    if (loading) {
      rightElement = <CircularProgress color="white"/>;
      userPreferences = '';
    } else if (user && user.id) {
      rightElement =
        <span class="navbar-logged">
          Welcome {user.email} <FlatButton label="Logout" onClick={() => this.submitLogout()}/>
        </span>;
      userPreferences = <div>
        <Checkbox
          label="Use local time"
          checked={user.preferences.useLocalTime}
          onCheck={this.toggleLocaleTime}
        />
      </div>
    }
    rightElement =
      <span class="navbar-logged">
          Welcome {user.email} <FlatButton label="Logout" onClick={() => this.submitLogout()}/>
        </span>;

    return (
      <div class="navbar">
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
          onRequestChange={(open) => this.setState({open})}
        >
          {menus.map((menu) =>
            <IndexLink key={menu.location} to={menu.location}>
              <MenuItem class={activeMenu === menu ? 'active' : ''}
                        onTouchTap={this.handleClose}>{menu.title}</MenuItem>
            </IndexLink>)}
          {userPreferences}
        </Drawer>

      </div>
    );
  }
}
