"use client";

import { handleCreateSubject } from "../../../../lib/action/action";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SERVER_API } from "../../../../lib/api/config";

export default function CreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${SERVER_API}/admin`, {
          cache: "no-store",
        });
        const res = await response.json();
        setClients(res.data.data);
      } catch (error) {
        console.error("Lỗi khi fetch clients:", error);
        setClients([]);
      }
    };

    fetchClients();
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const response = await handleCreateSubject(formData, "blogs");

        if (!response.success) {
          if (response.errors) {
            if (typeof response.errors === "string") {
              toast.error(response.errors);
            } else {
              Object.values(response.errors).forEach((error) => {
                toast.error(error as string);
              });
            }
          } else {
            toast.error("An error occurred");
          }
          return;
        }

        toast.success("Add blog success");
        formRef.current?.reset();
        setTimeout(() => {
          router.push("/admin/blogs");
        }, 1000);
      }}
      className="max-w-full mx-auto space-y-5"
    >
      {/* Blog title input */}
      <div className="relative mb-6">
        <label
          htmlFor="blog-title"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Title
        </label>
        <input
          type="text"
          id="blog-title"
          name="title"
          className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
          placeholder="Title..."
          required
        />
      </div>

      {/* Blog content input */}
      <div className="relative mb-6">
        <label
          htmlFor="blog-content"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Content
        </label>
        <textarea
          id="blog-content"
          name="content"
          className="block w-full h-28 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none"
          placeholder="Content..."
          required
        ></textarea>
      </div>

      {/* Client dropdown */}
      <div className="relative mb-6">
        <label
          htmlFor="client-id"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Client
        </label>
        <select
          id="client-id"
          name="client_id"
          className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
          required
          defaultValue=""
        >
          <option value="" disabled>
            -- Choose client --
          </option>
          {clients.length > 0 &&
            clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} ({client.role})
              </option>
            ))}
        </select>
      </div>

      {/* Submit button */}
      <div className="w-fit mx-auto my-2">
        <button
          type="submit"
          className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7"
        >
          Create blog
        </button>
      </div>
    </form>
  );
}
