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
  const [subjects, setSubjects] = useState([]);

  // Fetch clients và subjects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientResponse = await fetch(`${SERVER_API}/admin`, {
          cache: "no-store",
        });
        const subjectResponse = await fetch(`${SERVER_API}/subjects`, {
          cache: "no-store",
        });
        const clientData = await clientResponse.json();
        const subjectData = await subjectResponse.json();
        setClients(clientData.data.data);
        setSubjects(subjectData.data.data);
      } catch (error) {
        toast.error("Failed to fetch clients or subjects");
      }
    };

    fetchData();
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const response = await handleCreateSubject(formData, "courses");

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

        toast.success("Course created successfully");
        formRef.current?.reset();
        setTimeout(() => {
          router.push("/admin/courses");
        }, 1000);
      }}
      className="max-w-full mx-auto space-y-5"
    >
      {/* Course name input */}
      <div className="relative mb-6">
        <label
          htmlFor="course-name"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Name
        </label>
        <input
          type="text"
          id="course-name"
          name="name"
          className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
          placeholder="Course name..."
          required
        />
      </div>

      {/* Course description input */}
      <div className="relative mb-6">
        <label
          htmlFor="course-description"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Description
        </label>
        <textarea
          id="course-description"
          name="description"
          className="block w-full h-28 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none"
          placeholder="Course description..."
          required
        ></textarea>
      </div>

      {/* Course price input */}
      <div className="relative mb-6">
        <label
          htmlFor="course-price"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Price
        </label>
        <input
          type="number"
          id="course-price"
          name="price"
          className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
          placeholder="Course price..."
          required
        />
      </div>

      {/* Client dropdown */}
      <div className="relative mb-6">
        <label
          htmlFor="client-id"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Author
        </label>
        <select
          id="client-id"
          name="client_id"
          className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
          required
          defaultValue=""
        >
          <option value="" disabled>
            -- Choose author --
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subject dropdown */}
      <div className="relative mb-6">
        <label
          htmlFor="subject-id"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Subject
        </label>
        <select
          id="subject-id"
          name="subject_id"
          className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
          required
          defaultValue=""
        >
          <option value="" disabled>
            -- Choose subject --
          </option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Course image input */}
      <div className="relative mb-6">
        <label
          htmlFor="course-image"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Image
        </label>
        <input
          type="file"
          id="course-image"
          name="image"
          className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
          accept="image/*"
          required
        />
      </div>

      {/* Submit button */}
      <div className="w-fit mx-auto my-2">
        <button
          type="submit"
          className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7"
        >
          Create course
        </button>
      </div>
    </form>
  );
}
