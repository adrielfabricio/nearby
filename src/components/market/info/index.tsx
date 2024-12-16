import { Text, View } from "react-native";

import { colors, fontFamily } from "@/styles/theme";

import { Props } from "./types";
import { styles } from "./styles";

export default function Info({ description, icon: Icon }: Props) {
	return (
		<View style={styles.container}>
			<Icon size={16} color={colors.gray[400]} />
			<Text style={styles.text}>{description}</Text>
		</View>
	);
}
