import { IPlace } from "@/types/place";
import { TouchableOpacityProps } from "react-native";

export type Props = TouchableOpacityProps & {
	data: IPlace;
};
