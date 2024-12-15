import { FlatList, View } from "react-native";

import Category from "../category";
import { ICategory } from "@/types/category";

import { Props } from "./types";
import { styles } from "./styles";

export default function Categories({
	data,
	selectedCategoryId,
	onSelect,
}: Props) {
	function _keyExtractor(item: ICategory) {
		return item.id;
	}

	function _renderItem({ item }: { item: ICategory }) {
		const isSelected = item.id === selectedCategoryId;
		return (
			<Category
				iconId={item.id}
				name={item.name}
				isSelected={isSelected}
				onPress={() => onSelect(item.id)}
			/>
		);
	}

	return (
		<FlatList
			horizontal
			data={data}
			keyExtractor={_keyExtractor}
			renderItem={_renderItem}
			style={styles.container}
			contentContainerStyle={styles.content}
			showsHorizontalScrollIndicator={false}
		/>
	);
}
