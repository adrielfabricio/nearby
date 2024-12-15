import { PressableProps } from "react-native";

export type Props = PressableProps & {
	iconId: string;
	isSelected?: boolean;
	name: string;
};
