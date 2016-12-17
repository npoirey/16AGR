import React from "react";
import {connect} from "react-redux";
import {fetchEvents} from "../../../actions/eventsActions";
import Event from "../../../components/event/Event";
import "./home.scss";

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

