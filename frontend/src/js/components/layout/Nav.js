import React from "react";
import AppBar from "material-ui/AppBar";
import {IndexLink, Link} from "react-router";
import {connect} from "react-redux";
import Login from "./Login";
import Logged from "./Logged";
import "./nav.scss";

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

  render() {
    const {location, user} = this.props;
    const {collapsed} = this.state;
    const featuredClass = location.pathname === "/" ? "active" : "";
    const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <AppBar
        title="Title"
        iconElementRight={user && user.id ? <Logged email={user && user.email}/> : <Login/>}
      />
    );
    /*
     <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
     <div class="container">
     <div class="navbar-header">
     <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)}>
     <span class="sr-only">Toggle navigation</span>
     <span class="icon-bar"></span>
     <span class="icon-bar"></span>
     <span class="icon-bar"></span>
     </button>
     </div>
     <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
     <ul class="nav navbar-nav">
     <li class={featuredClass} onlyActiveOnIndex={true}>
     <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Featured</IndexLink>
     </li>
     <li class={archivesClass}>
     <Link to="archives" onClick={this.toggleCollapse.bind(this)}>Archives</Link>
     </li>
     <li class={settingsClass}>
     <Link to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
     </li>
     </ul>
     </div>
     { userBlock}
     </div>
     </nav>
     */
  }
}