import './globals.css'
import AntdProvider from "../lib/encourse-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata = {
    title: "Encourse",
}

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body>
		<AntdProvider>
			{children}
            <ToastContainer position="top-right" autoClose={3000}/>
		</AntdProvider>
		</body>
		</html>
	);
}

