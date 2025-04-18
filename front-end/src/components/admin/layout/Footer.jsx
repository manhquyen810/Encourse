export default function  Footer(){
    return (
        <footer className="bg-white rounded-lg shadow-sm mt-8 dark:bg-gray-800">
            <div
                className="w-full max-w-screen-xl mx-auto p-4 md:flex md:items-center md:justify-between">
            <span
                className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left block">
                © 2025 Your Company, Inc. All Rights Reserved.
            </span>
                <ul className="flex flex-wrap justify-center md:justify-end items-center mt-3 md:mt-0 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <li>
                        <a href="#" className="hover:underline mr-4 md:mr-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline mr-4 md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline mr-4 md:mr-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}