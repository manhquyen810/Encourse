// 'use client'

import Link from "next/link";

import { SERVER_API } from "../../../lib/api/config";
import { SearchForm } from "../task/SearchForm";
import { ClientList } from "./ClientList";
// console.log("SERVER_API:", SERVER_API);

const getClients = async () => {
  try {
    const response = await fetch(`${SERVER_API}/admin`, {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.error("Lỗi khi fetch:", error);
    return [];
  }
};
export default async function ClientPage() {
  const { success, data: clients } = await getClients();
  if (!success) {
    return <h2>Không thể tải dữ liệu</h2>;
  }
  // console.log(clients);
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Client Management</h1>
        <Link
          href="/admin/clients/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
        >
          Add Client
        </Link>
      </div>
      <ClientList clients={clients} />
    </div>
  );
}
