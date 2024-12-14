import { TouchableOpacityProps } from "react-native";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";

export type ButtonProps = TouchableOpacityProps & {
	isLoading?: boolean;
};

export type IconProps = {
	icon: React.ComponentType<TablerIconProps>;
};
