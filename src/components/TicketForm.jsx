import { useState, useEffect } from "react";
import { Plus, Edit3 } from "lucide-react";

const TicketForm = ({
  onSubmit,
  initialData,
  setSelectedTicket,
  agentIds,
  customerIds,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: 1,
    customerId: 1,
    agentId: 1,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "agentId" || name === "customerId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: 1,
      customerId: 1,
      agentId: 1,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3 h-full"
    >
      <h2 className="text-2xl font-bold mb-2 flex justify-between items-center">
        {initialData ? (
          <>
            Edit Ticket
            <Edit3 className="w-6 h-6 text-blue-500" />
          </>
        ) : (
          <>
            Add New Ticket
            <Plus className="w-6 h-6 text-blue-500" />
          </>
        )}
        {initialData && (
          <div
            className="bg-blue-200 p-2 rounded-md cursor-pointer flex items-center"
            onClick={() => {
              setSelectedTicket(null);
              setFormData({
                title: "",
                description: "",
                status: "open",
                priority: 1,
                customerId: 1,
                agentId: 1,
              });
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Ticket
          </div>
        )}
      </h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="priority"
        >
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="agentId"
        >
          Agent
        </label>
        <select
          id="agentId"
          name="agentId"
          value={formData.agentId}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
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
          Customer
        </label>
        <select
          id="customerId"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {customerIds.map((customer) => (
            <option key={customer.customerId} value={customer.customerId}>
              {customer.name} (ID: {customer.customerId})
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {initialData ? "Update Ticket" : "Add Ticket"}
      </button>
    </form>
  );
};

export default TicketForm;
