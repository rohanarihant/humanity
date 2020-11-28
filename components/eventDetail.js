import React, { useContext } from 'react';
import AccountContext from '../contexts/accountContext';
import Navbar from './NavBarBack';
const getEventCreatedBy = (userRoles, event) => {
  const match = userRoles.map((role) => role.categoryid === event.CreateBy);
  return match && match.categoryid;
}
const EventDetail = () => {
    const { account: { selectedEventDetail: event , userRoles} } = useContext(AccountContext);

    return(
        <>
        <Navbar prevRoute="events" />
        <div className="event-container" style={{marginTop: 70}}>
          <div className="event-title">
            <img src={`http://humanity.rubrutech.com/profileimage/${event.CreateBy}.jpg`} className="event-user-image" onError={(e) => addDefaultSrc(e)} />
            <div className="event-user-detail">
              <p className="event-text">{event.Title}</p>
              <p className="event-schedule">From: {event.FromDate} to {event.ToDate}</p>
              <p className="event-schedule">Created By: {event.usrname}{getEventCreatedBy(userRoles, event)}</p>
            </div>
          </div>
          <p className="event-description event-text">{event.Caption}</p>
          <p className="event-user event-text">{event.test}</p>
          <p className="event-date event-text">Created On: {event.CreateON}</p>
          <style jsx>
        {`
      .event-container{
        padding: 20px;
        border: 1px solid;
        padding: 10px;
        box-shadow: 0px 5px #888888;
        margin: 10px;
      }
      .event-title{
        font-size: 20px;
        display:flex;
        font-weight: 600;
      }
      .event-description{
        margin: 5px 0px;
      }
      .event-user-detail{
        margin-left: 10px;
      }
      .event-schedule{
        font-size: 15px;
        margin-bottom: 0px;
      }
      .event-user-image{
        height: 70px;
        border-radius: 50%;
      }
      .event-text{
        margin-bottom: 0rem;
      }
      .event-user{
        text-align: left;
      }
      .event-date{
        text-align: right;
      }
      `}
      </style>
    </div>
    </>
)};
export default EventDetail;