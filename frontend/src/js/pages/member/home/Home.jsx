import React from 'react'
import { connect } from 'react-redux'
import { fetchEvents } from '../../../actions/events/eventsActions'
import Event from '../../../components/event/Event'
import './home.scss'
import proptypes from '../../../core/proptypes/index'

class Home extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    events: React.PropTypes.arrayOf(proptypes.event),
  }

  static defaultProps = {
    events: [],
  }

  componentWillMount() {
    this.props.dispatch(fetchEvents())
  }

  render() {
    const { events } = this.props
    return (
      <div>
        {events.map((event) => <Event key={event.id} event={event} />)}
      </div>
    )
  }
}

export default connect((store) => ({
  events: store.events.events,
}))(Home)
