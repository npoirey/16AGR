import Snackbar from 'material-ui/Snackbar'
import React from 'react'
import { connect } from 'react-redux'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar/Navbar'
import { reset } from '../actions/alertsActions'
import '../../style/core.scss'
import './layout.scss'

@connect(store => ({
  error: store.alerts.error,
  success: store.alerts.success,
}))
export default class Layout extends React.Component {

  static get propTypes() {
    return {
      dispatch: React.PropTypes.func,
      error: React.PropTypes.string,
      success: React.PropTypes.string,
      children: React.PropTypes.node,
      location: React.PropTypes.any,
    }
  }

  handleRequestClose = () => {
    this.props.dispatch(reset())
  };

  render() {
    const { location, error, success } = this.props

    return (
      <div>
        <Navbar location={location} />
        <div className="row layout-container">
          <div
            className="col-xs-12
             col-sm-10 col-sm-offset-1
             col-md-8 col-md-offset-2
             center-xs"
          >
            {this.props.children}
          </div>
        </div>
        <div className="row">
          <Footer />
        </div>
        <Snackbar
          open={Boolean(success)}
          message={success}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <Snackbar
          open={Boolean(error)}
          message={error}
          autoHideDuration={4000}
          bodyStyle={{ backgroundColor: '#850000' }}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}
