import AntdProvider from "../../lib/encourse-provider"
import AdminPage from "../../components/admin/page";
export const metadata = {
	title: "Encourse",
}

export default function AdminLayout({ children }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body>
		<AntdProvider>
			<AdminPage>{children}</AdminPage>
		</AntdProvider>
		</body>
		</html>
	);
}

