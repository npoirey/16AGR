import React from "react";
import {connect} from "react-redux";
import "./home.scss";
import Event from "../components/event/Event";
import {fetchEvents} from "../actions/eventsActions";

@connect((store) => {
  return {
    events: store.events.events,
  };
})
export default class Home extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchEvents())
  }

  render() {
    const {events} = this.props;
    return (
      <div>
        {events.map((event) => <Event key={event.id} event={event}/>)}
      </div>
    );
  }
}
