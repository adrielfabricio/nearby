import { View, Text } from "react-native";

import { colors } from "@/styles/theme";

import { Props } from "./types";
import { styles } from "./styles";
import { IconTicket } from "@tabler/icons-react-native";

export default function Coupon({ code }: Props) {
	return (
		<View style={styles.container}>
			<IconTicket size={24} color={colors.green.light} />
			<Text style={styles.code}>{code}</Text>
		</View>
	);
}
