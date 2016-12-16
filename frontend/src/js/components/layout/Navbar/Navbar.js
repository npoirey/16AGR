import React from "react";
import AppBar from "material-ui/AppBar";
import {IndexLink, Link} from "react-router";
import {connect} from "react-redux";
import Logged from "./Logged";
import "./nav.scss";
import CircularProgress from "material-ui/CircularProgress";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

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

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    const {location, user, loading, error} = this.props;
    console.log(user);

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
    if (loading) {
      rightElement = <CircularProgress color="white"/>;
    } else if (user && user.id) {
      rightElement = <Logged email={user && user.email}/>;
    } else {
      rightElement = <IndexLink to="/login">
        Login
      </IndexLink>
    }

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
        </Drawer>

      </div>
    );
  }
}
