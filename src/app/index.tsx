import { View, Text } from "react-native";
import { Button, Steps, Welcome } from "@/components";

export default function App() {
	return (
		<View style={{ flex: 1, padding: 40, gap: 40 }}>
			<Welcome />
			<Steps />
			<Button>
				<Button.Title>Começar</Button.Title>
			</Button>
		</View>
	);
}
