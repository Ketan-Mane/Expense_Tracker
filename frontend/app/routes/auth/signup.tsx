import SignUp from "~/features/auth/components/signup";

export const meta = () => {
	return [
		{ title: "SignUp - Expense Tracker" },
		{ name: "description", content: "Welcome to React Router! Hello React" },
	];
};

const page = () => {
	return <SignUp />;
};

export default page;
