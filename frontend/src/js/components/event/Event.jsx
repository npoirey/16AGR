import Paper from 'material-ui/Paper'
import React from 'react'
import Collapse from 'react-collapse'
import ReactMarkdown from 'react-markdown'
import RaisedButton from 'material-ui/RaisedButton'
import UserFormattedDate from '../widgets/userFormattedDate/UserFormattedDate'
import './event.scss'
import proptypes from '../../core/proptypes/index'

export default class Event extends React.Component {

  constructor() {
    super()
    this.state = {
      deployed: false,
    }
  }

  toggleDeploy = () => {
    const deployed = !this.state.deployed
    this.setState({ deployed })
  }

  render() {
    const event = this.props.event
    const { deployed } = this.state


    return (
      <Paper zDepth={1} rounded={false} class="event-card row">
        <div className="event-card-ribbon">
          {event.participants ? <span className={event.participants.user}>{event.participants.user}</span> :
          <span className="event-card-participants-wia">missing</span>}
        </div>
        <div className="col-xs-12">
          <div className="row middle-xs">
            <h2
              className="event-card-title
                     col-xs-12 col-sm-12 col-md-8 col-md-offset-2"
            >
              {event.title}
            </h2>
            <div
              className="event-card-date
                      col-xs-12 col-sm-12 col-md-2"
            >
              <UserFormattedDate date={event.date} />
            </div>
          </div>

          <div className="row middle-xs">
            <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3 event-card-image-container">
              <img className="event-card-image" src={event.imageUrl} alt={event.title} role="presentation" />
            </div>
            <div className="col-xs-12 col-sm-7 col-md-8 col-lg-9">
              <ReactMarkdown source={event.shortDescription} class="event-card-description" />
            </div>
          </div>
          <Collapse isOpened={deployed}>
            <div className="event-card-description">
              <ReactMarkdown source={event.description} />
            </div>
          </Collapse>

          <div className="row event-card-participants">
            <div className="col-xs-6 col-sm-3 event-card-participants-blue">BLUE : 12</div>
            <div className="col-xs-6 col-sm-3 event-card-participants-red">RED : 23</div>
            <div className="col-xs-6 col-sm-3 event-card-participants-wia">ABSENTS : 24</div>
            <div className="col-xs-6 col-sm-3 event-card-participants-mia">MIA : 45</div>
          </div>
        </div>
        <RaisedButton
          primary class="btn btn-primary event-card-action-button"
          onClick={this.toggleDeploy}
        >
          {
            this.state.deployed ?
              <i className="fa fa-chevron-up" /> :
              <i className="fa fa-chevron-down" />
          }
        </RaisedButton>
      </Paper>
    )
  }
}

Event.propTypes = {
  event: proptypes.event.isRequired,
}
