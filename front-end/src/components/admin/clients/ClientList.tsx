"use client";
import { SearchForm } from "../task/SearchForm";
import { useEffect, useState } from "react";
import { debounce } from "../../../utils/debounce";
import { SERVER_API } from "../../../lib/api/config";
import { toast } from "react-toastify";
import { remove } from "../../../lib/action/action";

export const ClientList = ({ clients }) => {
  const [clientData, setClientData] = useState({
    data: [],
  });

  const getClients = async (q = "") => {
    const response = await fetch(`${SERVER_API}/admin?find=${q}`);
    const { data: clients } = await response.json();
    setClientData(clients);
  };

  const handleSearch = debounce((e) => {
    getClients(e.target.value);
  });
  const handleRemove = async (id) => {
    if (window.confirm("Bạn có chắc chắn xóa?")) {
      const status = await remove(id, "admin");
      if (status) {
        toast.success("Client deleted successfully");
        getClients();
      } else {
        toast.error("Failed to delete client");
      }
    }
  };

  useEffect(() => {
    setClientData(clients);
  }, [clients]);

  return (
    <>
      <SearchForm onChange={handleSearch} />
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-center text-gray-600 text-sm leading-normal">
              <th className="py-3 px-6">Id</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {clientData.data.map((client) => (
              <tr
                className="border-b border-gray-200 text-center hover:bg-gray-50"
                key={client.id}
              >
                <td className="py-3 px-6">{client.id}</td>
                <td className="py-3 px-6">{client.name}</td>
                <td className="py-3 px-6">{client.email}</td>
                <td className="py-3 px-6">{client.role}</td>
                <td className="py-3 px-6">
                  <div className="">
                    <img
                      src={client.image}
                      alt="Course"
                      className="w-10 h-10 rounded-full shadow-lg mx-auto"
                    />
                  </div>
                </td>
                <td className="py-3 px-6">
                  <div className="flex justify-center space-x-2">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      onClick={() => handleRemove(client.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
