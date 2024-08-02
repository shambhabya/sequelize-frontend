import { useState, useEffect } from "react";
import axios from "axios";
import TicketList from "./components/TicketList";
import TicketForm from "./components/TicketForm";
import FilterOptions from "./components/FilterOptions";
import Loader from "./components/Loader";

const API_BASE_URL = import.meta.env.VITE_URL;

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState("");
  const [customerIds, setCustomerIds] = useState([]);
  const [agentIds, setAgentIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  useEffect(() => {
    async function fetchAgentsAndCustomers() {
      try {
        const [agentsResponse, customersResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/agents`),
          axios.get(`${API_BASE_URL}/customers`),
        ]);

        setAgentIds(agentsResponse.data);
        setCustomerIds(customersResponse.data);
      } catch (error) {
        console.log(
          "Couldn't get agent and customer data from database",
          error
        );
      }
    }
    fetchAgentsAndCustomers();
  }, []);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      let url = `${API_BASE_URL}/tickets`;

      if (filter.startsWith("status_")) {
        const status = filter.split("_")[1];
        url += `/status/${status}`;
      } else if (filter === "priority") {
        url += "/sort-by-priority";
      } else if (filter.startsWith("customer_")) {
        const customerId = filter.split("_")[1];
        url += `/customer/${customerId}`;
      } else if (filter.startsWith("agent_")) {
        const agentId = filter.split("_")[1];
        url += `/agent/${agentId}`;
      }

      const response = await axios.get(url);
      setTickets(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching tickets:", error);
    }
  };

  const addTicket = async (ticketData) => {
    try {
      setIsLoading(true);
      await axios.post(`${API_BASE_URL}/tickets/new`, ticketData);
      fetchTickets();
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding ticket:", error);
    }
  };

  const updateTicket = async (ticketData) => {
    try {
      setIsLoading(true);
      await axios.put(
        `${API_BASE_URL}/tickets/update/${selectedTicket.ticketId}`,
        ticketData
      );
      fetchTickets();
      setSelectedTicket(null);
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating ticket:", error);
    }
  };

  const deleteTicket = async (id) => {
    try {
      setIsLoading(true);
      await axios.post(`${API_BASE_URL}/tickets/delete`, { id: id });
      fetchTickets();
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting ticket:", error);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <h1 className="p-5 text-3xl font-bold bg-gray-200 shadow-sm">
        Ticket Management System
      </h1>
      <div className="p-6">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="md:w-2/3">
            <FilterOptions
              onFilterChange={handleFilterChange}
              customerIds={customerIds}
              agentIds={agentIds}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <TicketList
                tickets={tickets}
                onDelete={deleteTicket}
                onSelect={setSelectedTicket}
              />
            )}
          </div>
          <TicketForm
            onSubmit={selectedTicket ? updateTicket : addTicket}
            initialData={selectedTicket}
            agentIds={agentIds}
            customerIds={customerIds}
            setSelectedTicket={setSelectedTicket}
            className="md:w-1/3"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
