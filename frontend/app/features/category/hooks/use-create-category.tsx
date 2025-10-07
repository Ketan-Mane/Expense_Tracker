import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../services/categoryService";

const useCreateCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};
export default useCreateCategory;
