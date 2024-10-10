import React, { useState, useEffect } from "react";
import "./App.css";
import GroupSelector from "./components/GroupSelector";
import SortSelector from "./components/SortSelector";

function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sortOrder, setSortOrder] = useState("priority");

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => setTickets(data.tickets))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const groupTickets = () => {
    switch (grouping) {
      case "user":
        return tickets.reduce((acc, ticket) => {
          (acc[ticket.assigned_user] = acc[ticket.assigned_user] || []).push(
            ticket
          );
          return acc;
        }, {});
      case "priority":
        return tickets.reduce((acc, ticket) => {
          (acc[ticket.priority] = acc[ticket.priority] || []).push(ticket);
          return acc;
        }, {});
      case "status":
      default:
        return tickets.reduce((acc, ticket) => {
          (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
          return acc;
        }, {});
    }
  };

  const sortTickets = (group) => {
    const sorted = {};
    Object.keys(group).forEach((key) => {
      sorted[key] = group[key].sort((a, b) => {
        if (sortOrder === "priority") {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });
    return sorted;
  };

  const groupedTickets = sortTickets(groupTickets());

  return (
    <div className="App">
      <h1>Kanban Board</h1>

      {/* Grouping and Sorting Options */}
      <div className="selectors">
        <GroupSelector setGroupBy={setGrouping} />
        <SortSelector setSortBy={setSortOrder} />
      </div>

      {/* Render Groups */}
      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="kanban-column">
            <h2>{group}</h2>
            {groupedTickets[group].map((ticket) => (
              <div key={ticket.id} className="kanban-card">
                <h3>{ticket.title}</h3>
                <p>Status: {ticket.status}</p>
                <p>User: {ticket.assigned_user}</p>
                <p>Priority: {ticket.priority}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
