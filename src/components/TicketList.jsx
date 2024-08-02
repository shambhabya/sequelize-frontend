import { Edit2, Trash2, AlertCircle } from "lucide-react";

const TicketStatus = ({ status }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      status.toLowerCase() === "open"
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {status}
  </span>
);

const TicketPriority = ({ priority }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      priority === 1
        ? "bg-red-100 text-red-800"
        : priority === 2
        ? "bg-yellow-100 text-yellow-800"
        : "bg-blue-100 text-blue-800"
    }`}
  >
    {priority === 1 ? "High" : priority === 2 ? "Medium" : "Low"}
  </span>
);

const TicketList = ({ tickets, onDelete, onSelect }) => {
  return (
    <div className="bg-white shadow sm:rounded-lg w-full ">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900">Tickets</h2>
      </div>
      <ul className="divide-y divide-gray-200 ">
        {tickets.map((ticket) => (
          <li
            key={ticket.ticketId}
            className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out"
          >
            <div className="flex items-center justify-between">
              <div className="sm:flex sm:justify-between w-full">
                <div>
                  <h3 className="text-lg font-medium text-indigo-600 truncate">
                    {ticket.title}
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <AlertCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>
                      ID:{" "}
                      <span className="font-medium text-gray-900">
                        {ticket.ticketId}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm sm:mt-0">
                  <TicketStatus status={ticket.status} />
                  <TicketPriority priority={ticket.priority} />
                </div>
              </div>
            </div>
            <div className="mt-4 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  Customer ID:{" "}
                  <span className="font-medium ml-1 text-gray-900">
                    {ticket.customerId}
                  </span>
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  Agent ID:{" "}
                  <span className="font-medium ml-1 text-gray-900">
                    {ticket.agentId}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between sm:mt-0">
                <p className="flex items-center text-sm text-gray-500 max-w-md truncate">
                  {ticket.description}
                </p>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => onSelect(ticket)}
                    className="mr-2 bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(ticket.ticketId)}
                    className="bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
