import { useQuery } from "@tanstack/react-query";
import { fetchtCategories } from "../services/categoryService";

const useCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: fetchtCategories,
	});
};
export default useCategories;
