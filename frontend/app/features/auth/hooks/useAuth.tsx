import { useQuery } from "@tanstack/react-query";
import { verifyAuth } from "../services/authService";

const useAuth = () => {
	const { data: user } = useQuery({
		queryKey: ["auth"],
		queryFn: verifyAuth,
	});

	return { isLoggedIn: !!user, user };
};

export default useAuth;
