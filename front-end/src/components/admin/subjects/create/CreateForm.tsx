"use client";

import { handleCreateSubject } from "../../../../lib/action/action";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <form
      ref={formRef}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const response = await handleCreateSubject(formData, "subjects");

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

        toast.success("Add subject success");
        formRef.current?.reset();
        setTimeout(() => {
          router.push("/admin/subjects");
        }, 1000);
      }}
      className="max-w-full mx-auto space-y-5"
    >
      <div className="relative mb-6">
        <label
          htmlFor="subject-name"
          className="flex items-center mb-2 text-gray-600 text-base font-medium"
        >
          Name subject
        </label>
        <input
          type="text"
          id="subject-name"
          name="name"
          className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
          placeholder="Name..."
          required
        />
      </div>
      <div className="w-fit mx-auto my-2">
        <button
          type="submit"
          className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7"
        >
          Create subject
        </button>
      </div>
    </form>
  );
}
