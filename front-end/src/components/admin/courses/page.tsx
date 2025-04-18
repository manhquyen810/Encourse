import Link from "next/link";
import { SERVER_API } from "../../../lib/api/config";
import { CourseList } from "./CourseList";

const getCourses = async () => {
  try {
    const response = await fetch(`${SERVER_API}/courses`, {
      cache: "no-store",
    });
    return response.json();
  } catch (error) {
    console.error("Lỗi khi fetch:", error);
    return [];
  }
};
export default async function CoursePage() {
  const { success, data: courses } = await getCourses();
  if (!success) {
    return <h2>Không thể tải dữ liệu</h2>;
  }
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
        <Link
          href="/admin/courses/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
        >
          Add Course
        </Link>
      </div>

      <CourseList courses={courses} />
    </div>
  );
}
