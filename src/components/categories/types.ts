import { ICategory } from "@/types/category";

export type Props = {
	data: ICategory[];
	selectedCategoryId?: string;
	onSelect: (categoryId: string) => void;
};
