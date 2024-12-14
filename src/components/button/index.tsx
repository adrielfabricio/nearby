import {
	ActivityIndicator,
	Text,
	TextProps,
	TouchableOpacity,
} from "react-native";
import { colors } from "@/styles/theme";
import { styles } from "./styles";
import { ButtonProps, IconProps } from "./types";

function Button({
	children,
	style,
	isLoading = false,
	disabled,
	...props
}: ButtonProps) {
	return (
		<TouchableOpacity
			{...props}
			activeOpacity={0.8}
			style={[styles.container, style]}
			disabled={isLoading || disabled}
		>
			{isLoading ? (
				<ActivityIndicator size={"small"} color={colors.gray[100]} />
			) : (
				children
			)}
		</TouchableOpacity>
	);
}

function Title({ children, style, ...props }: TextProps) {
	return (
		<Text {...props} style={[styles.title, style]}>
			{children}
		</Text>
	);
}

function Icon({ icon: Icon }: IconProps) {
	return <Icon size={24} color={colors.gray[100]} />;
}

Button.Title = Title;
Button.Icon = Icon;

export default Button;
