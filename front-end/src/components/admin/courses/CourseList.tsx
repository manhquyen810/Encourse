"use client";

import { SearchForm } from "../task/SearchForm";
import { debounce } from "../../../utils/debounce";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../lib/api/config";
import { remove } from "../../../lib/action/action";
import { toast } from "react-toastify";

export const CourseList = ({ courses }) => {
  const [courseData, setCourseData] = useState({
    data: [],
  });

  const getCourses = async (q = "") => {
    const response = await fetch(`${SERVER_API}/courses?find=${q}`);
    const { data: courses } = await response.json();
    setCourseData(courses);
  };

  const handleSearch = debounce((e) => {
    getCourses(e.target.value);
  });
  const handleRemove = async (id) => {
    if (window.confirm("Bạn có chắc chắn xóa?")) {
      const status = await remove(id, "courses");
      if (status) {
        toast.success("Client deleted successfully");
        getCourses();
      } else {
        toast.error("Failed to delete client");
      }
    }
  };

  useEffect(() => {
    setCourseData(courses);
  }, [courses]);
  return (
    <>
      <SearchForm onChange={handleSearch} />
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-center text-gray-600  text-sm leading-normal">
              <th className="py-3 px-6">Id</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Client</th>
              <th className="py-3 px-6">Subject</th>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {courseData.data.map((course, index) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-50 text-center"
                key={course.id}
              >
                <td className="py-3 px-6">{course.id}</td>
                <td className="py-3 px-6">{course.name}</td>
                <td className="py-3 px-6">{course.price}</td>
                <td className="py-3 px-6">{course.author.name}</td>
                <td className="py-3 px-6">{course.subject.name}</td>
                <td className="py-3 px-6">
                  <div className="">
                    <img
                      src={course.image}
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
                      onClick={() => handleRemove(course.id)}
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
