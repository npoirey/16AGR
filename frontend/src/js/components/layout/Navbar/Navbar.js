import React from "react";
import AppBar from "material-ui/AppBar";
import {IndexLink, Link} from "react-router";
import {connect} from "react-redux";
import Login from "./Login";
import Logged from "./Logged";
import "./nav.scss";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

@connect((store) => {
  return {
    user: store.user.user,
  };
})
export default class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    const {location, user} = this.props;
    const {collapsed} = this.state;

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

    return (
      <div class="navbar">
        <AppBar
          title={activeMenu.title}
          onTitleTouchTap={this.handleToggle}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={user && user.id ? <Logged email={user && user.email}/> : <Login/>}
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
