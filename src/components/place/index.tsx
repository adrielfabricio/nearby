import { Image, Text, TouchableOpacity, View } from "react-native";
import { IconTicket } from "@tabler/icons-react-native";

import { colors } from "@/styles/theme";

import { Props } from "./types";
import { styles } from "./styles";

export default function Place({ data, ...props }: Props) {
	return (
		<TouchableOpacity style={styles.container} {...props}>
			<Image style={styles.image} source={{ uri: data.cover }} />

			<View style={styles.content}>
				<Text style={styles.name}>{data.name}</Text>
				<Text style={styles.description} numberOfLines={2}>
					{data.description}
				</Text>

				<View style={styles.footer}>
					<IconTicket size={16} color={colors.red.base} />
					<Text style={styles.tickets}>
						{`${data.coupons} cupons disponíveis`}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
