import { Text, Pressable } from "react-native";

import { colors } from "@/styles/theme";
import { categoriesIcons } from "@/utils/categories-icons";

import { Props } from "./types";
import { styles } from "./styles";

export default function Category({
	iconId,
	isSelected = false,
	name,
	...props
}: Props) {
	const Icon = categoriesIcons[iconId];

	return (
		<Pressable
			style={[styles.container, isSelected && styles.containerSelected]}
			{...props}
		>
			<Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
			<Text style={[styles.name, isSelected && styles.nameSelected]}>
				{name}
			</Text>
		</Pressable>
	);
}
