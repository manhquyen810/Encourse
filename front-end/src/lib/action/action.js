"use server";

import { SERVER_API } from "../api/config";

const handleCreateSubject = async (formData, query) => {
  try {
    const response = await fetch(`${SERVER_API}/${query}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // Đọc phản hồi JSON một lần duy nhất
      let errorData;
      try {
        errorData = await response.json();
      } catch (err) {
        console.error("Response is not JSON:", await response.text());
        throw new Error("Invalid JSON response from server");
      }

      return { success: false, errors: errorData.errors || errorData.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error in handleCreateSubject:", error);
    return { success: false, errors: "An unexpected error occurred" };
  }
};

const remove = async (id, query) => {
  const response = await fetch(`${SERVER_API}/${query}/${id}`, {
    method: "DELETE",
  });
  return response.ok;
};

export { handleCreateSubject, remove };
