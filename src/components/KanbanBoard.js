import React, { useEffect, useState } from "react";
import { fetchTickets } from "../utils/api";
import TicketCard from "./TicketCard";
import GroupSelector from "./GroupSelector";
import SortSelector from "./SortSelector";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState("status"); // Default grouping by status
  const [sortBy, setSortBy] = useState("priority"); // Default sorting by priority

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTickets();
      setTickets(data);
    };
    getData();
  }, []);

  // Group tickets based on the selected option
  const groupTickets = () => {
    let grouped = {};

    if (groupBy === "status") {
      grouped = tickets.reduce((groups, ticket) => {
        const status = ticket.status || "No Status";
        groups[status] = [...(groups[status] || []), ticket];
        return groups;
      }, {});
    } else if (groupBy === "user") {
      grouped = tickets.reduce((groups, ticket) => {
        const user = ticket.user || "No User";
        groups[user] = [...(groups[user] || []), ticket];
        return groups;
      }, {});
    } else if (groupBy === "priority") {
      grouped = tickets.reduce((groups, ticket) => {
        const priority = ticket.priority || "No Priority";
        groups[priority] = [...(groups[priority] || []), ticket];
        return groups;
      }, {});
    }

    return grouped;
  };

  // Sort tickets based on the selected option
  const sortTickets = (group) => {
    return group.sort((a, b) => {
      if (sortBy === "priority") {
        return b.priority - a.priority;
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      <GroupSelector setGroupBy={setGroupBy} />
      <SortSelector setSortBy={setSortBy} />
      <div className="columns-container">
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} className="column">
            <h2>{group}</h2>
            {sortTickets(groupedTickets[group]).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
