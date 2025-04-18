"use client";
import { SearchForm } from "../task/SearchForm";
import { debounce } from "../../../utils/debounce";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../lib/api/config";
import { remove } from "../../../lib/action/action";
import { toast } from "react-toastify";

export const SubjectList = ({ subjects }) => {
  const [subjectData, setSubjectData] = useState({
    data: [],
  });

  const getSubjects = async (q = "") => {
    try {
      const response = await fetch(`${SERVER_API}/subjects?find=${q}`);
      const { data: subjects } = await response.json();
      setSubjectData(subjects);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      toast.error("Failed to fetch subjects");
    }
  };

  const handleSearch = debounce((e) => {
    getSubjects(e.target.value);
  });

  const handleRemove = async (id) => {
    if (window.confirm("Bạn có chắc chắn xóa?")) {
      const status = await remove(id, "subjects");
      if (status) {
        toast.success("Subject deleted successfully");
        getSubjects();
      } else {
        toast.error("Failed to delete subject");
      }
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <>
      <SearchForm onChange={handleSearch} />
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-center text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Id</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm ">
            {subjectData.data.map((subject) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-50 text-center"
                key={subject.id}
              >
                <td className="py-3 px-6">{subject.id}</td>
                <td className="py-3 px-6">{subject.name}</td>
                <td className="py-3 px-6">
                  <div className="flex justify-center space-x-2">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      onClick={() => handleRemove(subject.id)}
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
