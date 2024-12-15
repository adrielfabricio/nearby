import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { api } from "@/services/api";
import { IPlace } from "@/types/place";
import { Categories, Places } from "@/components";
import { ICategory } from "@/types/category";

export default function Home() {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [markets, setMarkets] = useState<IPlace[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState("");

	function handleOnSelect(id: string) {
		setSelectedCategoryId(id);
	}

	async function fetchCategories() {
		try {
			const { data } = await api.get("/categories");
			setCategories(data);
			setSelectedCategoryId(data[0].id);
		} catch (error) {
			console.error(error);
			Alert.alert("Error fetching categories");
		}
	}

	async function fetchMarkets() {
		if (!selectedCategoryId) return;
		try {
			const { data } = await api.get(`/markets/category/${selectedCategoryId}`);
			setMarkets(data);
		} catch (error) {
			console.error(error);
			Alert.alert("Error fetching markets");
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		fetchMarkets();
	}, [selectedCategoryId]);

	return (
		<View style={{ flex: 1 }}>
			<Categories
				data={categories}
				selectedCategoryId={selectedCategoryId}
				onSelect={handleOnSelect}
			/>

			<Places data={markets} />
		</View>
	);
}
