import React from 'react';
import Proptypes from 'prop-types';

function TicketDetail(props){
  const { ticket } = props;
  return(
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <hr />
    </React.Fragment>

  );
}

TicketDetail.propTypes = {
  ticket: Proptypes.object
};

export default TicketDetail;