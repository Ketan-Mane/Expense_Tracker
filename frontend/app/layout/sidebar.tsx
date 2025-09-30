import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { NavLink } from "react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";

const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Inbox",
		url: "#",
		icon: Inbox,
	},
	{
		title: "Calendar",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

const AppSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader className="mx-auto text-2xl">
				<p>
					<span className="text-purple-700 font-bold">E</span>xpense{" "}
					<span className="text-purple-700 font-bold">T</span>racker
				</p>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavLink to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};
export default AppSidebar;
