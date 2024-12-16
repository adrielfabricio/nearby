import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 8,
		paddingVertical: 10,
		borderRadius: 8,
		gap: 10,
		backgroundColor: colors.green.soft,
	},
	code: {
		color: colors.gray[600],
		fontSize: 16,
		fontFamily: fontFamily.semiBold,
		textTransform: "uppercase",
	},
});
