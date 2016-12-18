import Paper from "material-ui/Paper";
import React from "react";
import Collapse from "react-collapse";
import ReactMarkdown from "react-markdown";
import {Motion, spring} from "react-motion";
import UserFormattedDate from "../widgets/userFormattedDate/UserFormattedDate";
import "./event.scss";


export default class Event extends React.Component {
  constructor() {
    super();
    this.state = {
      deployed: false
    };
  }

  toggleDeploy() {
    const deployed = !this.state.deployed;
    this.setState({deployed});
  }

  render() {
    const event = this.props.event;
    const {deployed} = this.state;


    return (
      <Paper zDepth={1} rounded={false} class="event-card row">
        <div class="event-card-ribbon">
          {event.participants ? <span class={event.participants.user}>{event.participants.user}</span> :
            <span class="event-card-participants-wia">missing</span>}
          </div>
        <h2 class="event-card-title
                     col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
          {event.title}
        </h2>
        <div class="event-card-date
                      col-xs-12 col-sm-12 col-md-2">
          <UserFormattedDate date={event.date}/>
          </div>
        <div class="row">
          <div class="col-lg-3 event-card-image-container">
            <img class="event-card-image" src={event.imageUrl}/>
          </div>
          <div class="col-lg-9">
            <ReactMarkdown source={event.shortDescription} class="event-card-description"/>
          </div>
          </div>
        <Collapse isOpened={deployed}>
          <div class="event-card-description">
            <ReactMarkdown source={event.description}/>
          </div>
        </Collapse>
        {event.participants ?
          <div class="row event-card-participants">
            <div class="col-xs-3 event-card-participants-blue">BLUE : {event.participants.blue}</div>
            <div class="col-xs-3 event-card-participants-red">RED : {event.participants.red}</div>
            <div class="col-xs-3 event-card-participants-wia">ABSENTS : {event.participants.wia}</div>
            <div class="col-xs-3 event-card-participants-mia">MIA : {event.participants.mia}</div>
          </div>
          : <div></div>}
        <button class="btn btn-primary event-card-action-button" onClick={this.toggleDeploy.bind(this)}>
          {
            this.state.deployed ?
              <i class="fa fa-chevron-up"></i> :
              <i class="fa fa-chevron-down"></i>
          }
        </button>
      </Paper>
    );
  }
}
