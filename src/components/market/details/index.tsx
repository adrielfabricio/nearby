import { Text, View } from "react-native";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";

import Info from "../info";
import Coupon from "../coupon";

import { Props } from "./types";
import { styles } from "./styles";

export default function Details({ data, coupon }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.name}>{data.name}</Text>
			<Text style={styles.description}>{data.description}</Text>

			<View style={styles.group}>
				<Text style={styles.title}>Informações</Text>

				<Info
					description={`${data.coupons} cupons disponíveis`}
					icon={IconTicket}
				/>
				<Info description={data.address} icon={IconMapPin} />
				<Info description={data.phone} icon={IconPhone} />
			</View>

			<View style={styles.group}>
				<Text style={styles.title}>Regulamentos</Text>
				{data.rules.map((r) => (
					<Text key={r.id} style={styles.rule}>
						{`\u2022 ${r.description}`}
					</Text>
				))}
			</View>

			{coupon && (
				<View style={[styles.group, { borderBottomWidth: 0 }]}>
					<Text style={styles.title}>Utilize esse cupom</Text>
					<Coupon code={coupon} />
				</View>
			)}
		</View>
	);
}
