import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status"); // default to group by status
  const [sortOrder, setSortOrder] = useState("priority"); // default to sort by priority

  useEffect(() => {
    // Fetch data from API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => setTickets(data.tickets))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Group tickets function
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

  // Sort tickets
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

      {/* Grouping Options */}
      <div className="options">
        <button onClick={() => setGrouping("status")}>Group by Status</button>
        <button onClick={() => setGrouping("user")}>Group by User</button>
        <button onClick={() => setGrouping("priority")}>
          Group by Priority
        </button>
      </div>

      {/* Sorting Options */}
      <div className="options">
        <button onClick={() => setSortOrder("priority")}>
          Sort by Priority
        </button>
        <button onClick={() => setSortOrder("title")}>Sort by Title</button>
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
