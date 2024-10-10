import React from "react";

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>
        <strong>Status:</strong> {ticket.status}
      </p>
      <p>
        <strong>Priority:</strong> {ticket.priority}
      </p>
      <p>
        <strong>User:</strong> {ticket.user}
      </p>
    </div>
  );
};

export default TicketCard;
