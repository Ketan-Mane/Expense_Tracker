import { redirect, type MetaArgs } from "react-router";

export function meta({}: MetaArgs) {
	return [
		{ title: "New React Router App, Hello React" },
		{ name: "description", content: "Welcome to React Router! Hello React" },
	];
}

export default function Home() {
	return <div>Home Page</div>;
}
