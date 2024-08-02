import { useState } from "react";
import { Filter, X } from "lucide-react";

const FilterOptions = ({ onFilterChange, customerIds, agentIds }) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const handleFilterChange = (e) => {
    const { value, name } = e.target;

    setSelectedFilter(value);

    if (name === "agentId") {
      setSelectedAgentId(value);
      onFilterChange("agent_" + value);
    } else if (name === "customerId") {
      setSelectedCustomerId(value);
      onFilterChange("customer_" + value);
    } else {
      onFilterChange(value);
    }
  };

  const handleClearFilter = () => {
    setSelectedFilter("");
    setSelectedAgentId("");
    setSelectedCustomerId("");
    onFilterChange("");
  };

  return (
    <div className="mb-4 p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <div className="space-x-4 flex">
          <h3 className="text-xl font-semibold  flex items-center">
            <Filter className="w-5 h-5 mr-2" /> Filter Options:
          </h3>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="status_open"
              checked={selectedFilter === "status_open"}
              onChange={handleFilterChange}
              className="form-radio"
              name="filterOption"
            />
            <span className="ml-2">Open Tickets</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="status_closed"
              checked={selectedFilter === "status_closed"}
              onChange={handleFilterChange}
              className="form-radio"
              name="filterOption"
            />
            <span className="ml-2">Closed Tickets</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="priority"
              checked={selectedFilter === "priority"}
              onChange={handleFilterChange}
              className="form-radio"
              name="filterOption"
            />
            <span className="ml-2">Sort by Priority</span>
          </label>
        </div>
      </div>
      <div className=" flex justify-between">
        <div className="flex gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="agentId"
            >
              Show tickets having Agent Id
            </label>
            <select
              id="agentId"
              name="agentId"
              value={selectedAgentId}
              onChange={handleFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Agent ID</option>
              {agentIds.map((agent) => (
                <option key={agent.agentId} value={agent.agentId}>
                  {agent.name} (ID: {agent.agentId})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="customerId"
            >
              Show tickets having Customer Id
            </label>
            <select
              id="customerId"
              name="customerId"
              value={selectedCustomerId}
              onChange={handleFilterChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Customer ID</option>
              {customerIds.map((customer) => (
                <option key={customer.customerId} value={customer.customerId}>
                  {customer.name} (ID: {customer.customerId})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center p-6">
          <button
            onClick={handleClearFilter}
            className=" bg-red-500 p-2 text-white  rounded hover:bg-red-600 flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
