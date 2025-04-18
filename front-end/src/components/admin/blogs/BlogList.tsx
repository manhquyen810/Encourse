"use client";

import { SearchForm } from "../task/SearchForm";
import { debounce } from "../../../utils/debounce";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../lib/api/config";
import { toast } from "react-toastify";
import { remove } from "../../../lib/action/action";

export const BlogList = ({ blogs }) => {
  const [blogData, setBlogData] = useState({
    data: [],
  });

  const getBlogs = async (q = "") => {
    const response = await fetch(`${SERVER_API}/blogs?find=${q}`);
    const { data: blogs } = await response.json();
    setBlogData(blogs);
  };

  const handleSearch = debounce((e) => {
    getBlogs(e.target.value);
  });

  const handleRemove = async (id) => {
    if (window.confirm("Bạn có chắc chắn xóa?")) {
      const status = await remove(id, "blogs");
      if (status) {
        toast.success("Blog deleted successfully");
        getBlogs();
      } else {
        toast.error("Failed to delete blog");
      }
    }
  };
  useEffect(() => {
    setBlogData(blogs);
  }, [blogs]);
  return (
    <>
      <SearchForm onChange={handleSearch} />
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-center text-gray-600  text-sm leading-normal">
              <th className="py-3 px-6">Id</th>
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Client</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm ">
            {blogData.data.map((blog) => (
              <tr
                className="border-b border-gray-200 text-center hover:bg-gray-50"
                key={blog.id}
              >
                <td className="py-3 px-6">{blog.id}</td>
                <td className="py-3 px-6">{blog.title}</td>
                <td className="py-3 px-6">{blog.author.name}</td>
                <td className="py-3 px-6">
                  <div className="flex justify-center space-x-2">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md">
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      onClick={() => handleRemove(blog.id)}
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
