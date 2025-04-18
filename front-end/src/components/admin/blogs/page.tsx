
import { SERVER_API } from '../../../lib/api/config';
import Link from 'next/link'
import {BlogList} from "./BlogList";
console.log("SERVER_API:", SERVER_API);

const getBlogs = async () => {
		try {
			const response = await fetch(`${SERVER_API}/blogs`, {
				cache: 'no-store',
			});
			return response.json();
		} catch (error) {
			console.error('Lỗi khi fetch:', error);
			return [];
		}
	};
export default async function BlogPage() {
        const {success,data: blogs} = await getBlogs();
        if(!success){
            return <h2>Không thể tải dữ liệu</h2>;
        }
		return (
			<div className="p-6">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
					<Link
						href="/admin/blogs/create"
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
					>
						Add Blog
					</Link>
				</div>

				<BlogList blogs={blogs} />
			</div>
		)

}