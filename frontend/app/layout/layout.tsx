import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AppSidebar from "./sidebar";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarTrigger />
			<main>{children}</main>
		</SidebarProvider>
	);
};
export default Layout;
