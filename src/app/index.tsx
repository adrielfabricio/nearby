import { View } from "react-native";
import { router } from "expo-router";
import { Button, Steps, Welcome } from "@/components";

export default function App() {
	function handleOnNavigate() {
		router.navigate("/home");
	}

	return (
		<View style={{ flex: 1, padding: 40, gap: 40 }}>
			<Welcome />

			<Steps />

			<Button onPress={handleOnNavigate}>
				<Button.Title>Começar</Button.Title>
			</Button>
		</View>
	);
}
