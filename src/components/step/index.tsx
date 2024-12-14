import { Text, View } from "react-native";
import { colors } from "@/styles/theme";
import { styles } from "./styles";
import { Props } from "./types";

export default function Step({ icon: Icon, title, description }: Props) {
	return (
		<View style={styles.container}>
			{Icon && <Icon size={32} color={colors.red.base} />}
			<View style={styles.details}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</View>
	);
}
