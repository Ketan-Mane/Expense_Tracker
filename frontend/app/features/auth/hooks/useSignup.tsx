import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/authService";

const useSignup = () => {
	return useMutation({ mutationFn: signup });
};

export default useSignup;
